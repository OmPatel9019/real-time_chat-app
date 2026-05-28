import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useChatStore } from "../store/useChatStore.js";

export const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isOnline = onlineUsers.includes(selectedUser._id);

  const getInitials = (name) => {
    if (!name) return "";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="size-10 rounded-full relative overflow-hidden">
              {selectedUser.profilePic ? (
                <img src={selectedUser.profilePic} alt={selectedUser.fullName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-base-300 flex items-center justify-center font-bold text-base-content/60 text-sm">
                  {getInitials(selectedUser.fullName)}
                </div>
              )}
            </div>
          </div>

          <div className="text-left">
            <h3 className="font-medium text-base-content">{selectedUser.fullName}</h3>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500" : "bg-zinc-500"}`} />
              <p className="text-xs text-base-content/70">
                {isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        </div>

        <button onClick={() => setSelectedUser(null)} className="btn btn-ghost btn-circle btn-sm">
          <X className="size-5 text-base-content/75" />
        </button>
      </div>
    </div>
  );
};
