import axios from "axios";

export const AxiosSource = axios.create({
  // baseURL : "http://184.94.212.195:5000/api/v1",
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

const useAxios = () => {
  return AxiosSource;
};

export default useAxios;
