import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Input } from "antd";
import { RiSendPlaneFill } from "react-icons/ri";
import { TfiMoreAlt } from "react-icons/tfi";
import ChatContainer from "../components/ChatContainer";
import MessageBox from "../components/MessageBox";
import { getMessages, postMessages } from "../services/message";
import { getChats, getOneChat } from "../services/chat";
import Menu from "../components/Menu";
import TypingBubble from "../components/TypingBubble";

import { useAuth } from "../Context/AuthContext";

import socketIO, { io } from "socket.io-client";
var socket;

const { TextArea } = Input;
function Chat() {
  const { id } = useParams();
  const { user } = useAuth();

  const messagesSectionRef = useRef(null);

  var [messages, setMessages] = useState([]);
  var [chats, setChats] = useState([]);
  
  const token = user.token;
  const username = user.username;
  const email = user.email;
  const userId = user.userId;

  var [chatName, setChatName] = useState();

  var [page, setPage] = useState(1);
  var [limit, setLimit] = useState(5);

  var [content, setContent] = useState("");

  var [typingState, setTypingState] = useState(false);

  useEffect(() => {
    setMessages([]);
    setLimit(5);
    setPage(1);

    getOneChat(token, id)
      .then((data) => {
        setChatName(
          username === data[0].first_user_name
            ? data[0].second_user_name
            : data[0].first_user_name
        );
      })
      .catch((error) => {
        console.log("Error:", error);
      });

    socket = socketIO.connect("http://localhost:8080");
    socket.emit("join chat", id);

    return () => {
      if (socket) socket.disconnect();
    };
  }, [id]);

  useEffect(() => {
    getChats(token)
      .then((data) => {
        setChats(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });

    handleGetMessages();
  }, [page, limit, id]);

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));

    if (messagesSectionRef.current) {
      messagesSectionRef.current.scrollTop =
        messagesSectionRef.current.scrollHeight;
    }
  }, [socket, messages]);

  const handleMessage = async (e) => {
    try {
      await postMessages(token, id, content).then((message) => {
        socket.emit("message", message);
      });
    } catch (error) {
      console.error("Error:", error);
    }
    setContent("");
  };

  const handleTyping = () => {
    socket.emit("typing", { chat_id: id, state: true });
    setTimeout(() => {
      socket.emit("typing", { chat_id: id, state: false });
    }, 3000);
  };

  useEffect(() => {
    socket.on("typingResponse", (data) => setTypingState(data));
  }, [socket]);

  function handleGetMessages() {
    getMessages(token, id, page, limit)
      .then((data) => {
        data.forEach((m) => {
          var formatDate = new Date(m.timestamp);
          m.timestamp = `${formatDate.getDate()}/${
            formatDate.getMonth() + 1
          }/${formatDate.getFullYear()} - ${formatDate.getHours()}:${formatDate.getMinutes()}`;
        });
        setMessages(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  return (
    <div className="flex flex-col font-patua w-screen h-screen">
      <Menu username={username} />
      <div className="flex h-full overflow-hidden">
        <section className="bg-pink-200 w-2/6 md:w-3/12 xl:w-2/12 max-phone:hidden h-full p-2 flex gap-7 flex-wrap content-start justify-center overflow-y-scroll">
          {chats.map((chat) => (
            <ChatContainer
              key={chat.chat_id}
              id={chat.chat_id}
              useremail={
                email === chat.first_user_email
                  ? chat.second_user_email
                  : chat.first_user_email
              }
              username={
                username === chat.first_user_name
                  ? chat.second_user_name
                  : chat.first_user_name
              }
            />
          ))}
        </section>
        <section className="bg-emerald-200 w-4/6 md:w-9/12 xl:w-10/12 max-phone:w-full h-full pattern-crosses-sky-800/25">
          <p className="text-xl bg-sky-300 p-2 text-center">{chatName}</p>
          <button className="bg-sky-700 p-2 top-0 w-full">
            <TfiMoreAlt
              className="w-full"
              color="white"
              onClick={() => setLimit((limit += 5))}
            />
          </button>
          <section
            className="flex flex-col overflow-y-scroll h-3/4"
            ref={messagesSectionRef}
          >
            {messages.map((message) => (
              <MessageBox
                key={message.message_id}
                id={message.message_id}
                message={message.content}
                timestamp={message.timestamp}
                visibility={message.visibility}
                ownMessage={userId === message.sender_id ? true : false}
                color={
                  userId === message.sender_id ? "bg-cyan-700" : "bg-rose-400"
                }
                position={
                  userId === message.sender_id ? "self-end" : "self-start"
                }
                socket={socket}
                onVisibilityEdited={handleGetMessages}
                chatId={id}
              />
            ))}
            {typingState && <TypingBubble />}
          </section>
          <div className="w-full flex">
            <TextArea
              className="mx-3 h-1/3 w-11/12 shadow-md"
              showCount
              maxLength={1000}
              placeholder="Enter your message"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              onKeyDown={handleTyping}
            />
            <button className="bg-white w-1/12 mr-3 flex justify-center items-center rounded-full shadow-md">
              <RiSendPlaneFill
                size={45}
                color="Blue"
                onClick={(e) => {
                  handleMessage();
                }}
              />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Chat;
