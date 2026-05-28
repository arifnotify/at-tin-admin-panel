import axios from "axios";

const api = axios.create({
  baseURL: "https://attinbackend.onrender.com",
  withCredentials: true,
});

export default api;