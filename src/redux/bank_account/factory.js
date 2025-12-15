import axiosClient from "../../adapter/axiosClient";

const bankAccountFactory = {
  // Tạo tài khoản ngân hàng mới
  createBankAccount: async (data) => {
    const res = await axiosClient.post("/bank_account/create", data);
    return res.data;
  },

  // Cập nhật tài khoản ngân hàng
  updateBankAccount: async (data) => {
    const res = await axiosClient.put("/bank_account/update", data);
    return res.data;
  },

  // Lấy danh sách tài khoản ngân hàng theo organizationId
  getBankAccountsByOrganizationId: async (organizationId) => {
    const res = await axiosClient.get(
      `/bank_account/getBy_organizationId/${organizationId}`
    );
    return res.data;
  },

  // Lấy thông tin chi tiết 1 tài khoản ngân hàng theo baId
  getBankAccountById: async (baId) => {
    const res = await axiosClient.get(`/bank_account/${baId}`);
    return res.data;
  },
  deleteBankAccount: async (baId) => {
    const res = await axiosClient.delete(`/bank_account/delete/${baId}`);
    return res.data;
  },
};

export default bankAccountFactory;
