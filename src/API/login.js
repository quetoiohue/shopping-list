const axios = require('axios');
const host = 'http://localhost:7000'
export const accessToken = token => {
    return axios.get('https://graph.facebook.com/v3.3/me?fields=id,name,gender,friends,email,picture&transport=cors', {
        params: {
            access_token: token
        }
    })
    .then(res => {
        console.log(res);
        return res;
    })
}

export const checkAccount =  (username , password) => {
   return  axios.post(host +'/account', {
        USERNAME: username,
        PASS: password
    })
    .then(res => {
        console.log(res);
        return res;
    })
}