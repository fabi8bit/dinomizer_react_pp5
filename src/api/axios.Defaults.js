import axios from "axios";

axios.defaults.baseURL = "https://dinomizer-api-391f3ee03dea.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();