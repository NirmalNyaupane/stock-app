import axios from "axios";
const TOKEN = "cho5c09r01qrto3vbn60cho5c09r01qrto3vbn6g";
export const finhub = axios.create({
    baseURL:"https://finnhub.io/api/v1",
    params:{
        "token":TOKEN
    }
})