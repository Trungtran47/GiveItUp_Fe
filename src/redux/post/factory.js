import { get } from "http";
import axiosClient from "../../adapter/axiosClient";
import Constants from "@/utils/Constants";

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
  getPostMap: async (city) => {
    const res = await axiosClient.get(`/posts/map?city=${city}`);
    return res.data;
  },
  getTop5Posts: async () => {
    const res = await axiosClient.get("/posts/top5");
    return res.data;
  },
  // // Cập nhật tài khoản ngân hàng
  // updateBankAccount: async (formData) => {
  //   const res = await axiosClient.put("/bank_account/update", formData);
  //   return res.data;
  // },

  getPostByOrganizationId: async (organizationId, query) => {
    const params = {
      CurrentPage: Constants.PAGING.CURRENT_PAGE,
      PageSize: Constants.PAGING.ROW_PER_PAGE,
    };
    if (query?.get(Constants.ROUTER_URL.PAGE)) {
      params.CurrentPage = query.get(Constants.ROUTER_URL.PAGE);
    }
    if (query?.get(Constants.ROUTER_URL.PAGE_SIZE)) {
      params.PageSize = query.get(Constants.ROUTER_URL.PAGE_SIZE);
    }
    if (query?.get(Constants.ROUTER_URL.KEYWORD)) {
      params["postTitle"] = query?.get(Constants.ROUTER_URL.KEYWORD);
    }
    if (query?.get(Constants.ROUTER_URL.STATUS)) {
      params["status"] = query?.get(Constants.ROUTER_URL.STATUS);
    }
    const res = await axiosClient.get(`/posts/organization/${organizationId}`, {
      params,
    });
    return res.data;
  },
  deletePostById: async (postId) => {
    const res = await axiosClient.delete(`/posts/delete/${postId}`);
    return res.data;
  },
  getPosts: async (query) => {
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
      params["userId"] = query?.get(Constants.ROUTER_URL.USER_ID);
    }
    if (query?.get(Constants.ROUTER_URL.POST_TITLE)) {
      params["postTitle"] = query?.get(Constants.ROUTER_URL.POST_TITLE);
    }
    if (query?.get(Constants.ROUTER_URL.CATEGORY_ID)) {
      params["categoryId"] = query?.get(Constants.ROUTER_URL.CATEGORY_ID);
    }
    if (query?.get(Constants.ROUTER_URL.POST_STATUS)) {
      params["status"] = query?.get(Constants.ROUTER_URL.POST_STATUS);
    }
    if (query?.get(Constants.ROUTER_URL.TYPE_SORT)) {
      params["typeSort"] = query?.get(Constants.ROUTER_URL.TYPE_SORT);
    }

    if (query?.get(Constants.ROUTER_URL.END_DATE)) {
      params["endDate"] = query?.get(Constants.ROUTER_URL.END_DATE);
    }
    if (query?.get(Constants.ROUTER_URL.CREATED_AT)) {
      params["createdAt"] = query?.get(Constants.ROUTER_URL.CREATED_AT);
    }
    if (query?.get(Constants.ROUTER_URL.RANDOM)) {
      params["random"] = query?.get(Constants.ROUTER_URL.RANDOM);
    }
    const res = await axiosClient.get("/posts", { params });
    return res.data;
  },
  getAllPosts: async (query) => {
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
      params["userId"] = query?.get(Constants.ROUTER_URL.USER_ID);
    }
    if (query?.get(Constants.ROUTER_URL.POST_TITLE)) {
      params["postTitle"] = query?.get(Constants.ROUTER_URL.POST_TITLE);
    }
    if (query?.get(Constants.ROUTER_URL.CATEGORY_ID)) {
      params["categoryId"] = query?.get(Constants.ROUTER_URL.CATEGORY_ID);
    }
    if (query?.get(Constants.ROUTER_URL.STATUS)) {
      params["status"] = query?.get(Constants.ROUTER_URL.STATUS);
    }
    if (query?.get(Constants.ROUTER_URL.TYPE_SORT)) {
      params["typeSort"] = query?.get(Constants.ROUTER_URL.TYPE_SORT);
    }

    if (query?.get(Constants.ROUTER_URL.END_DATE)) {
      params["endDate"] = query?.get(Constants.ROUTER_URL.END_DATE);
    }
    if (query?.get(Constants.ROUTER_URL.CREATED_AT)) {
      params["createdAt"] = query?.get(Constants.ROUTER_URL.CREATED_AT);
    }
    if (query?.get(Constants.ROUTER_URL.RANDOM)) {
      params["random"] = query?.get(Constants.ROUTER_URL.RANDOM);
    }
    const res = await axiosClient.get("/posts/admin", { params });
    return res.data;
  },
  getProjectById: async (postId) => {
    const res = await axiosClient.get(`/posts/${postId}`);
    return res.data;
  },
  // // Lấy thông tin chi tiết 1 tài khoản ngân hàng theo baId
  // getBankAccountById: async (baId) => {
  //   const res = await axiosClient.get(`/bank_account/${baId}`);
  //   return res.data;
  // },
};

export default postFactory;
