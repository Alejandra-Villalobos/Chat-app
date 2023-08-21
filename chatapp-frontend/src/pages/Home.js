import ChatContainer from "../components/ChatContainer";

function Home() {

  return (
    <div className="flex flex-col font-patua w-screen h-screen">
      <nav className="w-full bg-yellow-100 flex justify-between p-3">
        <p className="text-xl">ChatApp</p>
        <p className="text-xl">Welcome, Username!</p>
      </nav>
      <section className="bg-emerald-200 w-full h-full p-3 flex gap-7 flex-wrap content-start">
        <ChatContainer id="1" username="Chat1"/>
        <ChatContainer id="2" username="Chat2"/>
        <ChatContainer id="3" username="Chat3"/>
        <ChatContainer id="4" username="Chat4"/>
        <ChatContainer id="5" username="Chat5"/>
        <ChatContainer id="6" username="Chat6"/>
        <ChatContainer id="7" username="Chat7"/>
        <ChatContainer id="8" username="Chat8"/>
        <ChatContainer id="9" username="Chat9"/>
        <ChatContainer id="10" username="Chat10"/>
        <ChatContainer id="11" username="Chat11"/>
      </section>
    </div>
  );
}

export default Home;
