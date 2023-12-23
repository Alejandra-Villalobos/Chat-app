import axios from 'axios';

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

  export { getChats }