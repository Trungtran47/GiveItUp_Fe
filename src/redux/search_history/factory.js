import axiosClient from "@/adapter/axiosClient";
import Constants from "@/utils/Constants";

const searchHistoryFactory = {
  search: async (query) => {
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
    if (query?.get(Constants.ROUTER_URL.KEYWORD)) {
      params["keyword"] = query.get(Constants.ROUTER_URL.KEYWORD);
    }
    const res = await axiosClient.get(`/search`, { params });
    return res.data;
  },
  getHistorySearch: async () => {
    const res = await axiosClient.get(`/search/history`);
    return res.data;
  },
  deleteHistorySearch: async (historyId) => {
    const res = await axiosClient.delete(`/search/history/${historyId}`);
    return res.data;
  },
  deleteAllHistorySearch: async () => {
    const res = await axiosClient.delete(`/search/history/all`);
    return res.data;
  },
};

export default searchHistoryFactory;
