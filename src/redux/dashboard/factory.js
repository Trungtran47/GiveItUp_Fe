import axiosClient from "@/adapter/axiosClient";
import Constants from "@/utils/Constants";
import dayjs from "dayjs";

const dashboardFactory = {
  dashboardAuthor: async (query) => {
    const now = dayjs();
    const params = {
      mode: "MONTH",
      month: now.month() + 1,
      year: now.year(),
    };
    if (query?.get(Constants.ROUTER_URL.MODE)) {
      params["mode"] = query.get(Constants.ROUTER_URL.MODE);
    }
    if (query?.get(Constants.ROUTER_URL.DATE)) {
      params["date"] = query?.get(Constants.ROUTER_URL.DATE);
    }
    if (query?.get(Constants.ROUTER_URL.MONTH)) {
      params["month"] = query?.get(Constants.ROUTER_URL.MONTH);
    }
    if (query?.get(Constants.ROUTER_URL.YEAR)) {
      params["year"] = query?.get(Constants.ROUTER_URL.YEAR);
    }
    const res = await axiosClient.get("/dashboard/author", { params });
    return res.data;
  },
  dashboardAdmin: async (fromDate, toDate) => {
    const res = await axiosClient.get("/dashboard/admin", {
      params: { fromDate, toDate },
    });
    return res.data;
  },
};
export default dashboardFactory;
