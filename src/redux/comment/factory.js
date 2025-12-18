import axiosClient from "@/adapter/axiosClient";

const commentFactory = {
  createComment: async (userId, request) => {
    const res = await axiosClient.post(`/comment/create/${userId}`, request);
    return res.data;
  },
  getCommentsByPost: async (postId) => {
    const res = await axiosClient.get(`/comment/get/${postId}`);
    return res.data;
  },
  getMyComments: async () => {
    const res = await axiosClient.get(`/comment/get/my_comment`);
    return res.data;
  },
  deleteComment: async (userId, commentId) => {
    const res = await axiosClient.delete(
      `/comment/${userId}/delete/${commentId}`
    );
    return res.data;
  },
  reactToComment: async (commentId, type) => {
    const res = await axiosClient.post(
      `/comment/${commentId}/reaction?type=${type}`
    );
    return res.data;
  },
};
export default commentFactory;
