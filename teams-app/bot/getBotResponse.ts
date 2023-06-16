//import axios
const axios = require('axios');

//define a function which returns the response from bot
export default function getBotResponse(serverUrl:string, msg: { messageText: string, parentName:string, childName:string }) {
    return axios.post(`${serverUrl}/parentchild`, msg)
        .then((res) => {
        //console.log(res);
        return res;
        })
        .catch((err) => {
        //console.log(err);
        throw err;
        });
    }