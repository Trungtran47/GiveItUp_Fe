import Constants from "@/utils/Constants";
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
  getAllUsers: async (query) => {
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
    if (query?.get(Constants.ROUTER_URL.USER_NAME)) {
      params["UserName"] = query?.get(Constants.ROUTER_URL.USER_NAME);
    }
    if (query?.get(Constants.ROUTER_URL.PHONE_NUMBER)) {
      params["PhoneNumber"] = query?.get(Constants.ROUTER_URL.PHONE_NUMBER);
    }
    const res = await axiosClient.get("/users", { params });
    return res.data;
  },
};

export default userFactory;
