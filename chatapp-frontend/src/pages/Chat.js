import { Input } from "antd";
import { RiSendPlaneFill } from "react-icons/ri";
import ChatContainer from "../components/ChatContainer";
import MessageBox from "../components/MessageBox";

const { TextArea } = Input;
function Chat({ id, username }) {
  return (
    <div className="flex flex-col font-patua w-screen h-screen">
      <nav className="w-full bg-yellow-100 flex justify-between p-3">
        <p className="text-xl">ChatApp</p>
        <p className="text-xl">Welcome, Username!</p>
      </nav>
      <div className="flex h-full overflow-hidden">
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
        <section className="bg-emerald-200 w-3/4 h-full">
          <p className="text-xl bg-sky-300 p-3 text-center">ChatApp</p>
          <div className="flex flex-col overflow-y-scroll h-3/4">
            <MessageBox
              message="Hola"
              timestamp="2023-08-10 22:50"
              color="bg-rose-400"
              position="self-start"
            />
            <MessageBox
              message="Hola"
              timestamp="2023-08-10 22:50"
              color="bg-rose-400"
              position="self-start"
            />
            <MessageBox
              message="Hola"
              timestamp="2023-08-10 22:50"
              color="bg-rose-400"
              position="self-start"
            />
            <MessageBox
              message="Que taaaaaaaaaaaaaaaaaaal?"
              timestamp="2023-08-10 22:51"
              color="bg-rose-400"
            />
            <MessageBox
              message="Bien"
              timestamp="2023-08-10 22:55"
              color="bg-cyan-700"
              position="self-end"
            />
            <MessageBox
              message="Y tu?"
              timestamp="2023-08-10 22:56"
              color="bg-cyan-700"
              position="self-end"
            />
            <MessageBox
              message=":D"
              timestamp="2023-08-10 22:56"
              color="bg-cyan-700"
              position="self-end"
            />
            <MessageBox
              message="Bien"
              timestamp="2023-08-10 22:59"
              color="bg-rose-400"
              position="self-start"
            />
            <MessageBox
              message="xd"
              timestamp="2023-08-10 22:59"
              color="bg-rose-400"
              position="self-start"
            />
          </div>
          <div className="w-full flex">
            <TextArea
              className="mx-3 h-24 w-11/12 shadow-md"
              showCount
              maxLength={1000}
              style={{
                resize: "none",
              }}
              placeholder="Enter your message"
            />
            <button className="bg-white w-1/12 mr-3 flex justify-center items-center rounded-full shadow-md">
              <RiSendPlaneFill size={45} color="Blue"/>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Chat;
