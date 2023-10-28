import axios from "axios";
//connects to Heroku
// axios.defaults.baseURL = "https://dinomizer-api-391f3ee03dea.herokuapp.com/";
//connects to Gitpod for local testing
axios.defaults.baseURL = "https://8000-fabi8bit-dinomizerdrfpp-lj287mt52d5.ws-eu105.gitpod.io";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();