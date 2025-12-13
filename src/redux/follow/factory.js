import axiosClient from "@/adapter/axiosClient";

const followFactory = {
  toggleFollow: async (userId, targetUserId) => {
    const res = await axiosClient.post(
      `/follows/${userId}/toggle/${targetUserId}`
    );
    return res.data;
  },
};
export default followFactory;
