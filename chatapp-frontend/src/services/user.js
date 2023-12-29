import axios from "axios";

const baseURL = "http://localhost:8080";


const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    axios
      .get(baseURL + `/email?email=${email}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log("Error:", error.response.data);
        reject(error);
      });
  });
};

const FilterUsersEmail = (email) => {
  return new Promise((resolve, reject) => {
    axios
      .get(baseURL + `/emailFilter?email=${email}`)
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((error) => {
        console.log("Error:", error.response.data);
        reject(error);
      });
  });
};

export { findUserByEmail, FilterUsersEmail };
