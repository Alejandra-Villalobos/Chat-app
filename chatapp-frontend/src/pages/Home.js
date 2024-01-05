import { useEffect, useState } from "react";
import { AutoComplete } from "antd";
import { ToastContainer } from "react-toastify";
import ChatContainer from "../components/ChatContainer";
import { getChats } from "../services/chat";
import { FilterUsersEmail } from "../services/user";
import Menu from "../components/Menu";
import SearchResult from "../components/SearchResult";

function Home({ socket }) {
  var [chats, setChats] = useState([]);
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const username = localStorage.getItem("username");

  const [userResults, setUserResults] = useState();

  const handleSearch = async (value) => {
    await FilterUsersEmail(token, value).then((data) => {
      var usersFormat = [];
      data.map((user) =>
        usersFormat.push({
          label: (
            <SearchResult
              email={user.email}
              name={user.name}
              chatExists={user.chat_exists}
              onChatAdded={handleGetChats}
            />
          ),
        })
      );
      setUserResults(usersFormat);
    });
  };

  const handleGetChats = async () => {
    const data = await getChats(token);
    setChats(data);
  };

  useEffect(() => {
    handleGetChats();
  }, []);

  return (
    <div className="flex flex-col font-patua w-screen h-screen bg-emerald-200 pattern-crosses-sky-800/25">
      <ToastContainer />
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
