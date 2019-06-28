const axios = require('axios');

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