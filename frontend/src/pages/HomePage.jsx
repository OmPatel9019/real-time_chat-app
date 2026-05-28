import { useChatStore } from "../store/useChatStore.js";
import { Sidebar } from "../components/Sidebar.jsx";
import { NoChatSelected } from "../components/NoChatSelected.jsx";
import { ChatContainer } from "../components/ChatContainer.jsx";

export const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-100 overflow-hidden">
      <div className="flex pt-16 h-full w-full">
        <div className={`h-full ${selectedUser ? "hidden lg:block" : "w-full lg:w-72 flex-shrink-0"}`}>
          <Sidebar />
        </div>

        <div className={`flex-1 h-full flex flex-col ${!selectedUser ? "hidden lg:flex" : "flex"}`}>
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </div>
  );
};
