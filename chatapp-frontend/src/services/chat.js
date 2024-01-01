import axios from 'axios';
import { toast } from 'react-toastify';

const baseURL = "http://localhost:8080";

const getChats = (token) => {
    return new Promise((resolve, reject) => {
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
      axios
        .get(baseURL + "/chat", config)
        .then((response) => {
          resolve(response.data.data);
        })
        .catch((error) => {
          console.log("Error:", error.response.data);
          reject(error);
        });
    });
  };

  const getOneChat = (token, chatId) => {
    return new Promise((resolve, reject) => {
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
      axios
        .get(baseURL + `/chat/${chatId}`, config)
        .then((response) => {
          resolve(response.data.data);
        })
        .catch((error) => {
          console.log("Error:", error.response.data);
          reject(error);
        });
    });
  };

  const verifyChatExists = (token, email) => {
    return new Promise((resolve, reject) => {
      const data = {
        email: email
      };
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
      axios
        .post(baseURL + `/verifyChat`, data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.log("Error:", error.response);
          reject(error);
        });
    });
  };

  const createChat = (token, email) => {
    return new Promise((resolve, reject) => {
      const data = {
        email: email
      };
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
      axios
        .post(baseURL + `/chat`, data, config)
        .then((response) => {
          toast(response.data.message)
          resolve(response.data.message);
        })
        .catch((error) => {
          console.log("Error:", error.response);
          reject(error);
        });
    });
  };

  export { getChats, getOneChat, verifyChatExists, createChat }