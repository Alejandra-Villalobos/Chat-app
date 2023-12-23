import axios from 'axios';

const baseURL = "http://localhost:8080";

const getMessages = (token, chat_id, page, limit) => {
    return new Promise((resolve, reject) => {
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
      axios
        .get(baseURL + `/chat/${chat_id}?page=${page}&limit=${limit}`, config)
        .then((response) => {
          resolve(response.data.data);
        })
        .catch((error) => {
          console.log("Error:", error.response.data);
          reject(error);
        });
    });
  };

  const postMessages = (token, chat_id, content) => {
    return new Promise((resolve, reject) => {
        const data = {
            content: content,
          };
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
      axios
        .post(baseURL + `/chat/${chat_id}`, data, config)
        .then((response) => {
          resolve();
        })
        .catch((error) => {
          console.log("Error:", error.response.data);
          reject(error);
        });
    });
  };

  export { getMessages, postMessages }