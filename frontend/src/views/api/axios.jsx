import axios from "axios";
import {getToken,isTokenExpired,logout} from "../utils/auth";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.request.use((config)=>{
  const rawToken = localStorage.getItem("token");

if (rawToken) {
  
    if(isTokenExpired()){
      logout();
      return Promise.reject("Token expired");
    }
    const token = rawToken.replace(/^"|"$/g, "");

  config.headers.Authorization = `Bearer ${token}`;
}
  return config;
})
export default instance;