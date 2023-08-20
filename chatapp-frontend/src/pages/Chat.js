import ChatContainer from "../components/ChatContainer";
import MessageBox from "../components/MessageBox";

function Chat({ id, username }) {
  return (
    <div className="flex flex-col font-patua w-screen h-screen">
      <nav className="w-full h-1/12 bg-yellow-100 flex justify-between p-3">
        <p className="text-xl">ChatApp</p>
        <p className="text-xl">Welcome, Username!</p>
      </nav>
      <div className="flex h-full">
        <section className="bg-pink-200 w-1/4 h-full p-3 flex gap-7 flex-wrap content-start justify-center overflow-y-scroll">
          <ChatContainer username="Chat1" />
          <ChatContainer username="Chat2" />
          <ChatContainer username="Chat2.5" />
          <ChatContainer username="Chat3" />
          <ChatContainer username="Chat4" />
          <ChatContainer username="Chat5" />
          <ChatContainer username="Chat6" />
          <ChatContainer username="Chat7" />
          <ChatContainer username="Chat8" />
          <ChatContainer username="Chat9" />
          <ChatContainer username="Chat10" />
        </section>
        <section className="bg-emerald-200 w-3/4 h-full flex flex-col">
            <p className="text-xl bg-purple-500 p-3 text-center">ChatApp</p>
            <MessageBox message="Hola" timestamp="2023-08-10 22:50" color="bg-rose-400" position="self-start"/>
            <MessageBox message="Que taaaaaaaaaaaaaaaaaaal?" timestamp="2023-08-10 22:51" color="bg-rose-400"/>
            <MessageBox message="Bien" timestamp="2023-08-10 22:55" color="bg-cyan-700" position="self-end"/>
            <MessageBox message="Y tu?" timestamp="2023-08-10 22:56" color="bg-cyan-700" position="self-end"/>
            <MessageBox message=":D" timestamp="2023-08-10 22:56" color="bg-cyan-700" position="self-end"/>
            <MessageBox message="Bien" timestamp="2023-08-10 22:59" color="bg-rose-400" position="self-start"/>
        </section>
      </div>
    </div>
  );
}

export default Chat;
