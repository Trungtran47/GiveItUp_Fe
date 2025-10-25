import axiosClient from "../../adapter/axiosClient";

const userFactory = {
  registerUser: async (data) => {
    const res = await axiosClient.post("/users", data);
    return res.data;
  },
  getDataUser: async () => {
    const res = await axiosClient.get("/users/my-info");
    return res.data;
  },
};

export default userFactory;
