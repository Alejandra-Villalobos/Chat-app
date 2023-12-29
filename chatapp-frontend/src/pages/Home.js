import { useEffect, useState } from "react";
import { AutoComplete } from "antd";
import { FaUserAlt } from "react-icons/fa";
import ChatContainer from "../components/ChatContainer";
import { getChats } from "../services/chat";
import { FilterUsersEmail } from "../services/user";
import Menu from "../components/Menu";

function Home() {
  var [chats, setChats] = useState([]);
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const username = localStorage.getItem("username");

  const [userResults, setUserResults] = useState();

  const handleSearch = async (value) => {
    await FilterUsersEmail(value).then((data) => {
      var usersFormat = [];
      data.map((user) =>
        usersFormat.push({
          label: (
            <div className="flex items-center gap-3">
              <div>
                <FaUserAlt size={25}/>
              </div>
              <div>
                <p className="bold">{user.email}</p>
                <p className="italic font-jost">{user.name}</p>
              </div>
            </div>
          ),
        })
      );
      setUserResults(usersFormat);
    });
  };

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
    <div className="flex flex-col font-patua w-screen h-screen bg-emerald-200 pattern-crosses-sky-800/25">
      <Menu username={username} />
      <div className="flex w-full justify-center pt-3">
        <AutoComplete
          className="w-full rounded-md mx-3"
          options={userResults}
          placeholder="Search users to start a chat"
          onSearch={(text) => handleSearch(text)}
        />
      </div>
      <section className="w-full h-full flex gap-7 flex-wrap content-start p-8">
        {chats.map((chat) => (
          <ChatContainer
            key={chat.chat_id}
            id={chat.chat_id}
            username={
              email === chat.first_user_email
                ? chat.second_user_email
                : chat.first_user_email
            }
          />
        ))}
      </section>
    </div>
  );
}

export default Home;
