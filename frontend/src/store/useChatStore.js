import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  friendRequests: [],

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  sendFriendRequest: async (email) => {
    try {
      const res = await axiosInstance.post("/message/requests/send", { email });
      toast.success(res.data.message || "Friend request sent successfully!");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send friend request");
      return false;
    }
  },

  getFriendRequests: async () => {
    try {
      const res = await axiosInstance.get("/message/requests");
      set({ friendRequests: res.data });
    } catch (error) {
      console.error("Failed to fetch friend requests:", error);
    }
  },

  acceptFriendRequest: async (requestId) => {
    try {
      const res = await axiosInstance.put(`/message/requests/accept/${requestId}`);
      set({
        users: [...get().users, res.data],
        friendRequests: get().friendRequests.filter(req => req._id !== requestId)
      });
      toast.success("Friend request accepted!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to accept request");
    }
  },

  rejectFriendRequest: async (requestId) => {
    try {
      await axiosInstance.delete(`/message/requests/reject/${requestId}`);
      set({
        friendRequests: get().friendRequests.filter(req => req._id !== requestId)
      });
      toast.success("Friend request rejected");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reject request");
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("newMessage"); // Avoid duplicate listeners
    socket.on("newMessage", (newMessage) => {
      // Check if the message is from the currently active chat partner
      const isMessageFromActiveChat = newMessage.senderId === selectedUser._id;
      if (!isMessageFromActiveChat) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.off("newMessage");
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
