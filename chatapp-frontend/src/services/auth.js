import axios from 'axios';
import { toast } from 'react-toastify';

const baseURL = "http://localhost:8080";

const loginService = (email, password) => {
    return new Promise((resolve, reject) => {
      const data = {
        email: email,
        password: password,
      };
  
      axios
        .post(baseURL + "/login", data)
        .then((response) => {
          resolve({
            token: response.data.token,
            email: response.data.data.email,
            username: response.data.data.name,
            userid: response.data.data.user_id,
          });
        })
        .catch((error) => {
          toast.error(error.response.data.message)
          reject(error.response.data.message);
        });
    });
  };

  const registerService = (email, name, password) => {
    return new Promise((resolve, reject) => {
      const data = {
        email: email,
        name: name,
        password: password,
      };
  
      axios
        .post(baseURL + "/register", data)
        .then((response) => {
          toast.loading(response.data.message)
          resolve();
        })
        .catch((error) => {
          toast.error(error.response.data.message)
          reject(error.response.data.message);
        });
    });
  };

  const loginGoogle = (email) => {
    return new Promise((resolve, reject) => {
      const data = {
        email: email,
      };
  
      axios
        .post(baseURL + "/loginGoogle", data)
        .then((response) => {
          resolve({
            token: response.data.token,
            email: response.data.data.email,
            username: response.data.data.name,
            userId: response.data.data.user_id,
          });
        })
        .catch((error) => {
          console.log("Error:", error.response.data);
          reject(error);
        });
    });
  };

  const registerGoogle = (email) => {
    return new Promise((resolve, reject) => {
      const data = {
        email: email,
      };
  
      axios
        .post(baseURL + "/registerGoogle", data)
        .then((response) => {
          resolve();
        })
        .catch((error) => {
          console.log("Error:", error.response.data);
          reject(error);
        });
    });
  };

  const logout = (token) => {
    return new Promise((resolve, reject) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .post(baseURL + "/logout", '', config)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.log("Error:", error.response.data);
          reject(error);
        });
    });
  };

  export { loginService, registerService, loginGoogle, registerGoogle, logout }