import Constants from "@/utils/Constants";
import axiosClient from "../../adapter/axiosClient";

const donateFactory = {
  getAllDonate: async (query) => {
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
    if (query?.get(Constants.ROUTER_URL.USER_ID)) {
      params.userId = query.get(Constants.ROUTER_URL.USER_ID);
    }
    const res = await axiosClient.get(`/donate/all?`, { params });
    return res.data;
  },
  createDonate: async (data) => {
    const res = await axiosClient.post("/donate/create", data);
    return res.data;
  },
  getDonateTotalbyAmount: async (postId) => {
    const res = await axiosClient.get(`/donate/total_amount/${postId}`);
    return res.data;
  },
};

export default donateFactory;
