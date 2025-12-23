import axiosClient from "../../adapter/axiosClient";
const chatBotFactory = {
  askAi: async (data) => {
    const res = await axiosClient.post(`/chat/ask`, data);
    return res.data;
  },
};
export default chatBotFactory;
