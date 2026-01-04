import axiosClient from "@/adapter/axiosClient";
import Constants from "@/utils/Constants";

const payOutFactory = {
  authorRequest: async (data) => {
    const res = await axiosClient.post(`/payouts/request`, data);
    return res.data;
  },
  adminProcessRequest: async (adminId, data) => {
    const res = await axiosClient.put(`/payouts/process/${adminId}`, data, {
      headers: {
        "Content-Type": "multipart/form-data", // bắt buộc với file
      },
    });
    return res.data;
  },
  authorConfirm: async (authorId, payoutId) => {
    const res = await axiosClient.put(
      `/payouts/${authorId}/confirm/${payoutId}`
    );
    return res.data;
  },
  adminCreate: async (adminId, data) => {
    const res = await axiosClient.post(
      `/payouts/admin-create/${adminId}`,
      data
    );
    return res.data;
  },
  deletePayout: async (authorId, payoutId) => {
    const res = await axiosClient.delete(
      `/payouts/${authorId}/delete/${payoutId}`
    );
    return res.data;
  },
  updatePayout: async (data) => {
    const res = await axiosClient.put(`/payouts/update`, data);
    return res.data;
  },
  getAllPayoutRequests: async (query) => {
    let params = {
      CurrentPage: Constants.PAGING.CURRENT_PAGE,
      PageSize: Constants.PAGING.ROW_PER_PAGE,
    };
    if (query?.get(Constants.ROUTER_URL.PAGE)) {
      params.CurrentPage = query.get(Constants.ROUTER_URL.PAGE);
    }
    if (query?.get(Constants.ROUTER_URL.PAGE_SIZE)) {
      params.PageSize = query.get(Constants.ROUTER_URL.PAGE_SIZE);
    }
    const res = await axiosClient.get(`/payouts`, { params });
    return res.data;
  },
  getPayoutByAuthorId: async (authorId) => {
    const res = await axiosClient.get(`/payouts/author/${authorId}`);
    return res.data;
  },
};
export default payOutFactory;
