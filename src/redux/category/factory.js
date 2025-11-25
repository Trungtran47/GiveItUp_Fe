import Constants from "@/utils/Constants";
import axiosClient from "../../adapter/axiosClient";

const categoryFactory = {
  createCategory: async (data) => {
    const res = await axiosClient.post("/categories", data);
    return res.data;
  },
  updateCategory: async (id, data) => {
    const res = await axiosClient.put(`/categories/${id}`, data);
    return res.data;
  },
  deleteCategoryById: async (id) => {
    const res = await axiosClient.delete(`/categories/${id}`);
    return res.data;
  },
  getCategoryById: async (id) => {
    const res = await axiosClient.get(`/categories/${id}`);
    return res.data;
  },
  getAllCategories: async (query) => {
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
    if (query?.get(Constants.ROUTER_URL.CATEGORY_NAME)) {
      params["categoryName"] = query?.get(Constants.ROUTER_URL.CATEGORY_NAME);
    }
    const res = await axiosClient.get("/categories", { params });
    return res.data;
  },
};

export default categoryFactory;
