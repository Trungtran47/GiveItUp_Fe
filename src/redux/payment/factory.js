import { cancel } from "redux-saga/effects";
import axiosClient from "../../adapter/axiosClient";

const paymentFactory = {
  getQrCode: async (data) => {
    const res = await axiosClient.post("/payment/createQr", data);
    return res.data;
  },
  cancelPayment: async (orderCode) => {
    const res = await axiosClient.post(`/payment/${orderCode}/cancel`);
    return res.data;
  },
  //   checkStatusPayment: async (orderCode) => {
  //     const res = await axiosClient.get(`/payment/status/${orderCode}`);
  //     return res.data;
  //   },
  // SSE helper để subscribe trạng thái order
  // subscribeOrderStatus: (orderCode, onStatusUpdate) => {
  //   // EventSource phải dùng full URL backend, dùng cùng baseURL với axiosClient
  //   const backendUrl = axiosClient.defaults.baseURL;
  //   const sse = new EventSource(`${backendUrl}/sse/order/status/${orderCode}`);

  //   sse.addEventListener("order-init", (e) => onStatusUpdate(e.data));
  //   sse.addEventListener("order-status", (e) => onStatusUpdate(e.data));

  //   return sse;
  // },
};

export default paymentFactory;
