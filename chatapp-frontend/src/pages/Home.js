import { useContext, useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import ChatContainer from "../components/ChatContainer";
import { getChats } from "../services/chat";
import Menu from "../components/Menu";

function Home() {
  var [chats, setChats] = useState([]);
  const token = localStorage.getItem("token")
  const email = localStorage.getItem("email")
  const username = localStorage.getItem("username")

  useEffect(() => {
    getChats(token)
      .then((data) => {
        setChats(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  return (
    <div className="flex flex-col font-patua w-screen h-screen">
        <Menu username={username}/>
      <div className="flex w-full justify-center pt-3 bg-emerald-200">
        <input className="w-11/12 rounded-s-md p-3" placeholder="Search user email"/>
        <button className="bg-blue-500 rounded-e-md p-3">
          <BiSearchAlt2 size={35} color="white" />
        </button>
      </div>
      <section className="bg-emerald-200 w-full h-full p-6 flex gap-7 flex-wrap content-start">
        {chats.map((chat) => (
          <ChatContainer key={chat.chat_id} id={chat.chat_id} username={email === chat.first_user_email ? chat.second_user_email : chat.first_user_email} />
        ))}
      </section>
    </div>
  );
}

export default Home;
