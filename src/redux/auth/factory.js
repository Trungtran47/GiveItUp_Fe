import axiosClient from "../../adapter/axiosClient";

const authFactory = {
  requestSignIn: async (data) => {
    const res = await axiosClient.post("/auth/token", data);
    return res.data;
  },

  refreshToken: async (token) => {
    const res = await axiosClient.post("/auth/refresh", token);
    return res.data;
  },

  introspectToken: async (token) => {
    const res = await axiosClient.post("/auth/introspect", token);
    return res.data;
  },

  logout: async (token) => {
    const res = await axiosClient.post("/auth/logout", token);
    return res.data;
  },
};

export default authFactory;
