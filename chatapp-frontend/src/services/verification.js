import axios from "axios";
import { toast } from "react-toastify";

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
        toast(response.data.message);
        resolve();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        reject(error);
      });
  });
};

const verifyAccountStatus = (email) => {
  return new Promise((resolve, reject) => {
    const data = {
      email: email,
    };

    axios
      .post(baseURL + "/accountStatus", data)
      .then((response) => {
        resolve();
      })
      .catch((error) => {
        toast.loading(`Redirecting: ${error.response.data.message}`);
        reject(error);
      });
  });
};

const deactivateCode = (email) => {
  return new Promise((resolve, reject) => {
    const data = {
      email: email,
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

export { verifyCode, verifyAccountStatus, deactivateCode };
