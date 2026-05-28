import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { SidebarSkeleton } from "./SidebarSkeleton.jsx";
import { Users, Search, UserPlus, Check, X } from "lucide-react";

export const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
    sendFriendRequest,
    getFriendRequests,
    friendRequests,
    acceptFriendRequest,
    rejectFriendRequest
  } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [friendEmail, setFriendEmail] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    getUsers();
    getFriendRequests();
  }, [getUsers, getFriendRequests]);

  const handleAddFriend = async (e) => {
    e.preventDefault();
    if (!friendEmail.trim()) return;
    setIsAdding(true);
    const success = await sendFriendRequest(friendEmail.trim());
    if (success) {
      setFriendEmail("");
    }
    setIsAdding(false);
  };

  const getInitials = (name) => {
    if (!name) return "";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    if (showOnlineOnly) {
      return onlineUsers.includes(user._id) && matchesSearch;
    }
    return matchesSearch;
  });

  const onlineCount = users.filter(user => onlineUsers.includes(user._id)).length;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-full lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 p-5 w-full space-y-4">
        <div className="flex items-center gap-2">
          <Users className="size-6 text-primary" />
          <span className="font-semibold text-base-content">Friends</span>
        </div>

        {/* Add Friend Form */}
        <form onSubmit={handleAddFriend} className="flex items-center gap-2">
          <input
            type="email"
            placeholder="Add friend by email..."
            className="input input-bordered input-sm flex-1 rounded-xl bg-base-200/50 focus:outline-none text-xs"
            value={friendEmail}
            onChange={(e) => setFriendEmail(e.target.value)}
            disabled={isAdding}
          />
          <button
            type="submit"
            className="btn btn-sm btn-primary px-3 rounded-xl"
            disabled={isAdding || !friendEmail.trim()}
          >
            <UserPlus className="size-4" />
          </button>
        </form>

        {/* Pending Friend Requests */}
        {friendRequests.length > 0 && (
          <div className="text-left bg-base-200/55 p-3 rounded-xl border border-base-300 space-y-2">
            <h4 className="text-[10px] font-bold text-base-content/60 tracking-wider uppercase m-0">
              Pending Invites ({friendRequests.length})
            </h4>
            <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
              {friendRequests.map((req) => (
                <div key={req._id} className="flex items-center justify-between gap-2 p-1.5 bg-base-100 rounded-lg">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="size-6 rounded-full overflow-hidden flex-shrink-0 bg-base-300 flex items-center justify-center font-bold text-[10px] text-base-content/65 select-none">
                      {req.senderId.profilePic ? (
                        <img src={req.senderId.profilePic} alt={req.senderId.fullName} className="size-full object-cover" />
                      ) : (
                        getInitials(req.senderId.fullName)
                      )}
                    </div>
                    <span className="text-[11px] font-semibold text-base-content truncate">
                      {req.senderId.fullName}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => acceptFriendRequest(req._id)}
                      className="btn btn-xs btn-circle btn-success size-5 min-h-0 text-white"
                      title="Accept"
                    >
                      <Check className="size-3" />
                    </button>
                    <button
                      onClick={() => rejectFriendRequest(req._id)}
                      className="btn btn-xs btn-circle btn-error size-5 min-h-0 text-white"
                      title="Reject"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="relative">
          <input
            type="text"
            placeholder="Search friends..."
            className="input input-bordered input-sm w-full pl-8 rounded-xl bg-base-200/50 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-2.5 top-2 size-4 text-base-content/40" />
        </div>

        <div className="flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm checkbox-primary"
            />
            <span className="text-sm text-base-content/85 select-none font-medium">Show online only</span>
          </label>
          <span className="text-xs text-base-content/50">({onlineCount} online)</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3 flex-1">
        {filteredUsers.length === 0 ? (
          <div className="text-center text-base-content/55 py-8 hidden lg:block">
            No friends found
          </div>
        ) : (
          filteredUsers.map((user) => {
            const isOnline = onlineUsers.includes(user._id);
            const isSelected = selectedUser?._id === user._id;

            return (
              <button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`w-full p-3 flex items-center gap-3 hover:bg-base-200/50 transition-colors
                  ${isSelected ? "bg-base-200 ring-1 ring-base-300" : ""}`}
              >
                <div className="relative mx-auto lg:mx-0">
                  <div className="size-12 rounded-full overflow-hidden">
                    {user.profilePic ? (
                      <img
                        src={user.profilePic}
                        alt={user.fullName}
                        className="size-full object-cover"
                      />
                    ) : (
                      <div className="size-full bg-base-300 flex items-center justify-center font-bold text-base-content/60 text-sm">
                        {getInitials(user.fullName)}
                      </div>
                    )}
                  </div>
                  {isOnline && (
                    <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-base-100" />
                  )}
                </div>

                <div className="text-left min-w-0 flex-1">
                  <h4 className="font-medium text-base-content truncate">{user.fullName}</h4>
                  <p className="text-xs text-base-content/60 truncate">
                    {isOnline ? "Online" : "Offline"}
                  </p>
                </div>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
};
