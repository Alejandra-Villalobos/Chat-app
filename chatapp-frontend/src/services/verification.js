import axios from 'axios';

const baseURL = "http://localhost:8080";

const verifyCode = (email, code) => {
    return new Promise((resolve, reject) => {
      const data = {
        email: email,
        code: code,
      };
  
      axios
        .post(baseURL + "/verification", data)
        .then((response) => {
          resolve();
        })
        .catch((error) => {
          console.log("Error:", error.response.data);
          reject(error);
        });
    });
  };

  const deactivateCode = (email) => {
    return new Promise((resolve, reject) => {
      const data = {
        email: email
      };
      axios
        .put(baseURL + "/verification", data)
        .then((response) => {
          resolve();
        })
        .catch((error) => {
          console.log("Error:", error.response.data);
          reject(error);
        });
    });
  };

  export { verifyCode, deactivateCode }