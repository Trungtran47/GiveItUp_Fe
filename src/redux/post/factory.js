import axiosClient from "../../adapter/axiosClient";

const postFactory = {
  // Tạo tài khoản ngân hàng mới
  createPost: async (formData) => {
    const res = await axiosClient.post("/posts/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // bắt buộc với file
      },
    });
    return res.data;
  },
  updatePost: async (postId, formData) => {
    const res = await axiosClient.put(`/posts/update/${postId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // bắt buộc với file
      },
    });
    return res.data;
  },

  // // Cập nhật tài khoản ngân hàng
  // updateBankAccount: async (formData) => {
  //   const res = await axiosClient.put("/bank_account/update", formData);
  //   return res.data;
  // },

  getPostByUserId: async (userId) => {
    const res = await axiosClient.get(`/posts/user/${userId}`);
    return res.data;
  },
  deletePostById: async (postId) => {
    const res = await axiosClient.delete(`/posts/delete/${postId}`);
    return res.data;
  },

  // // Lấy thông tin chi tiết 1 tài khoản ngân hàng theo baId
  // getBankAccountById: async (baId) => {
  //   const res = await axiosClient.get(`/bank_account/${baId}`);
  //   return res.data;
  // },
};

export default postFactory;
