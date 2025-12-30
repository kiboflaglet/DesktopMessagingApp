import ChatContent from "./components/ChatContent"
import ChatSidebar from "./components/ChatSidebar"
import Header from "./components/Header"
import UserAvatar from "./components/UserAvatar"


const App = () => {
  return (
    <div className="  h-[calc(100vh-40px)] grid grid-rows-[auto_1fr] gap-3">

      <div className=" ">
        <Header />
      </div>

      <div className="grid grid-cols-[3fr_7fr] gap-4">
        <ChatSidebar />
        <ChatContent />
      </div>

    </div>
  )
}

export default App

