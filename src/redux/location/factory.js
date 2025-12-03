import { get } from "http";
import axiosClient from "../../adapter/axiosClient";

const locationFactory = {
  getProvinces: async () => {
    const res = await axiosClient.get("/api/location/provinces");
    return res.data;
  },
  getWards: async (provinceId) => {
    const res = await axiosClient.get(`/api/location/wards/${provinceId}`);
    return res.data;
  },
};

export default locationFactory;
