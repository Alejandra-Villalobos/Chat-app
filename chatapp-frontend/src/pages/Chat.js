import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "antd";
import { RiSendPlaneFill } from "react-icons/ri";
import { TfiMoreAlt } from "react-icons/tfi";
import ChatContainer from "../components/ChatContainer";
import MessageBox from "../components/MessageBox";
import { getMessages, postMessages } from "../services/message";
import { getChats } from "../services/chat";

const { TextArea } = Input;
function Chat() {
  const { id } = useParams();
  
  var [messages, setMessages] = useState([]);
  var [chats, setChats] = useState([]);
  const token = localStorage.getItem("token")
  const username = localStorage.getItem("username")
  const email = localStorage.getItem("email")
  const userId = localStorage.getItem("userId")

  var [page, setPage] = useState(1);
  var [limit, setLimit] = useState(5);

  var [content, setContent] = useState('');
  
  useEffect(() => {
    getMessages(token, id, page, limit)
      .then((data) => {
        setMessages(data);
        console.log(data)
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, [page, limit, messages.length])

  useEffect(() => {
    getChats(token)
      .then((data) => {
        setChats(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });

  }, []);

  const handleMessage = async (e) => {
    try {
      await postMessages(token, id, content)
      setContent("")
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col font-patua w-screen h-screen">
      <nav className="w-full bg-yellow-100 flex justify-between p-3">
        <p className="text-xl">ChatApp</p>
        <p className="text-xl">Welcome, {username}!</p>
      </nav>
      <div className="flex h-full overflow-hidden">
        <section className="bg-pink-200 w-1/4 h-full p-3 flex gap-7 flex-wrap content-start justify-center overflow-y-scroll">
        {chats.map((chat) => (
          <ChatContainer key={chat.chat_id} id={chat.chat_id} username={email === chat.first_user_email ? chat.second_user_email : chat.first_user_email} />
        ))}
        </section>
        <section className="bg-emerald-200 w-3/4 h-full">
          <p className="text-xl bg-sky-300 p-3 text-center">ChatApp</p>
          <button className="bg-sky-700 p-3 top-0 w-full"><TfiMoreAlt className="w-full" color="white" onClick={() => setLimit(limit+=5)}/></button>
          <div className="flex flex-col overflow-y-scroll h-3/4">
          {messages.map((message) => (
          <MessageBox key={message.timestamp} message={message.content} timestamp={message.timestamp}
            color={userId === message.sender_id ? "bg-cyan-700" : "bg-rose-400"} 
            position={userId === message.sender_id ? "self-end" : "self-start"} />
        ))}
          </div>
          <div className="w-full flex">
            <TextArea
              className="mx-3 h-18 w-11/12 shadow-md"
              showCount
              maxLength={1000}
              style={{
                resize: "none",
              }}
              placeholder="Enter your message"
              onChange={(e) => setContent(e.target.value)}
            />
            <button className="bg-white w-1/12 mr-3 flex justify-center items-center rounded-lg shadow-md">
              <RiSendPlaneFill size={45} color="Blue" onClick={(e) => {
                handleMessage();
                
              }}/>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Chat;
