import Constants from "@/utils/Constants";
import axiosClient from "../../adapter/axiosClient";

const userFactory = {
  forgotPassword: async (data) => {
    const res = await axiosClient.post("/users/forgot-password", data);
    return res.data;
  },
  resetPassword: async (data) => {
    const res = await axiosClient.post("/users/reset-password", data);
    return res.data;
  },
  registerUser: async (data) => {
    const res = await axiosClient.post("/users", data);
    return res.data;
  },
  registerAuthor: async (userId, data) => {
    const res = await axiosClient.put(
      `/users/register/author/${userId}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data", // bắt buộc với file
        },
      }
    );
    return res.data;
  },
  updateUser: async (userId, data) => {
    const res = await axiosClient.put(`/users/${userId}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },
  getUserByOerganizationId: async (organizationId) => {
    const res = await axiosClient.get(`/users/organization/${organizationId}`);
    return res.data;
  },
  getDataUser: async () => {
    const res = await axiosClient.get("/users/my-info");
    return res.data;
  },
  getUserById: async (userId) => {
    const res = await axiosClient.get(`/users/${userId}`);
    return res.data;
  },
  updateStatus: async (userId, status) => {
    const res = await axiosClient.put(
      `/users/update_status/${userId}/status?status=${status}`
    );
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
  getAllAuthors: async (query) => {
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
    if (query?.get(Constants.ROUTER_URL.ORGANIZATION_NAME)) {
      params["organizationName"] = query?.get(
        Constants.ROUTER_URL.ORGANIZATION_NAME
      );
    }
    const res = await axiosClient.get("/users/authors", { params });
    return res.data;
  },
};

export default userFactory;
