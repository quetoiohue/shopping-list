const axios = require("axios");
const host = "http://localhost:7000";
export const accessToken = token => {
  return axios
    .get(
      "https://graph.facebook.com/v3.3/me?fields=id,name,gender,friends,email,picture&transport=cors",
      {
        params: {
          access_token: token
        }
      }
    )
    .then(res => {
      return res;
    });
};

export const checkAccount = async (username, password) => {
  return await axios
    .post(host + "/_account", {
      USERNAME: username,
      PASS: password
    })
    .then(res => {
      return res;
    });
};

export const getToken = async (username, password) => {
  return await axios.post(host + "/api/login", {
    username,
    password
  });
};

export const verifyToken = token => {
  return axios.post(host + "/api/verify_token", token, {
    headers: { Authorization: "Bearer " + token }
  });
};
