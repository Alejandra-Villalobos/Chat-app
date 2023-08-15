import ChatContainer from "../components/ChatContainer";

function Chat() {
  return (
    <div className="flex flex-col font-patua w-screen h-screen">
      <nav className="w-full h-1/12 bg-yellow-100 flex justify-between p-3">
        <p className="text-xl">ChatApp</p>
        <p className="text-xl">Welcome, Username!</p>
      </nav>
      <div className="flex">
        <section className="bg-pink-300 w-2/5 h-full p-3 flex gap-7 flex-wrap content-start">
          <ChatContainer username="Chat1" />
          <ChatContainer username="Chat2" />
          <ChatContainer username="Chat2" />
          <ChatContainer username="Chat3" />
          <ChatContainer username="Chat4" />
          <ChatContainer username="Chat5" />
          <ChatContainer username="Chat6" />
          <ChatContainer username="Chat7" />
          <ChatContainer username="Chat8" />
          <ChatContainer username="Chat9" />
          <ChatContainer username="Chat10" />
        </section>
        <section className="bg-emerald-200 w-3/5 h-full p-3">
          <nav className="w-full h-1/12 bg-purple-500 p-3">
            <p className="text-xl">ChatApp</p>
          </nav>
        </section>
      </div>
    </div>
  );
}

export default Chat;
