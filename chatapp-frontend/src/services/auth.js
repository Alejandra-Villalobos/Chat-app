import axios from 'axios';

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
          localStorage.setItem("token", response.data.token)
          localStorage.setItem("email", response.data.data.email)
          localStorage.setItem("username", response.data.data.name)
          resolve();
        })
        .catch((error) => {
          console.log("Error:", error.response.data);
          reject(error);
        });
    });
  };

  export { loginService }