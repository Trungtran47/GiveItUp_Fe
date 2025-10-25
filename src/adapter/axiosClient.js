import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // ví dụ: "http://localhost:8080"
  headers: {
    "Content-Type": "application/json",
  },
});

// 🧩 Thêm token vào header trước mỗi request
axiosClient.interceptors.request.use(
  (config) => {
    const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

    if (user?.Token) {
      config.headers.Authorization = `Bearer ${user.Token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ⚠️ Bắt lỗi response toàn cục
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("xxx", error);
    throw error;
  }
);

export default axiosClient;
