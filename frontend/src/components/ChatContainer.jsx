import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { ChatHeader } from "./ChatHeader.jsx";
import { MessageInput } from "./MessageInput.jsx";
import { MessageSkeleton } from "./MessageSkeleton.jsx";

export const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => {
      unsubscribeFromMessages();
    };
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const getInitials = (name) => {
    if (!name) return "";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const formatMessageTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto bg-base-100/50">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-base-100/50">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-base-content/50">
            No messages yet. Say hi!
          </div>
        ) : (
          messages.map((message) => {
            const isSelf = message.senderId === authUser._id;
            const chatPartner = isSelf ? authUser : selectedUser;

            return (
              <div
                key={message._id}
                className={`chat ${isSelf ? "chat-end" : "chat-start"}`}
                ref={messageEndRef}
              >
                <div className="chat-image avatar">
                  <div className="size-10 rounded-full overflow-hidden">
                    {chatPartner.profilePic ? (
                      <img
                        src={chatPartner.profilePic}
                        alt={chatPartner.fullName}
                        className="size-full object-cover"
                      />
                    ) : (
                      <div className="size-full bg-base-300 flex items-center justify-center font-bold text-base-content/60 text-sm">
                        {getInitials(chatPartner.fullName)}
                      </div>
                    )}
                  </div>
                </div>

                <div className="chat-header mb-1">
                  <time className="text-xs opacity-50 ml-1">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>

                <div className={`chat-bubble flex flex-col max-w-[280px] sm:max-w-[400px] text-left break-words shadow-sm
                  ${isSelf 
                    ? "rounded-2xl rounded-br-none bg-primary bg-gradient-to-r from-primary to-primary/85 text-primary-content" 
                    : "rounded-2xl rounded-bl-none bg-base-200 text-base-content"}`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="rounded-xl max-w-[240px] mb-2 cursor-pointer hover:opacity-90 transition-all border border-base-300"
                    />
                  )}
                  {message.text && <span className="leading-relaxed text-sm font-medium">{message.text}</span>}
                </div>
              </div>
            );
          })
        )}
      </div>

      <MessageInput />
    </div>
  );
};
