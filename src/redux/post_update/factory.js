import axiosClient from "@/adapter/axiosClient";

const postUpdateFactory = {
  create: async (userId, data) => {
    const res = await axiosClient.post(`/post_update/create/${userId}`, data, {
      headers: {
        "Content-Type": "multipart/form-data", // bắt buộc với file
      },
    });
    return res.data;
  },
  updatePostUpdate: async (userId, postUpdateId, data) => {
    const res = await axiosClient.put(
      `/post_update/${userId}/update/${postUpdateId}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data", // bắt buộc với file
        },
      }
    );
    return res.data;
  },
};
export default postUpdateFactory;
