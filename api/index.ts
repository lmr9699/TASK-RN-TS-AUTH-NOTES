import axios from "axios";
import { getToken } from "./storage";

const instance = axios.create({
  baseURL: "https://task-react-auth-backend.eapi.joincoded.com/api",
});

instance.interceptors.request.use(async (req) => {
  const token = await getToken();

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default instance;
