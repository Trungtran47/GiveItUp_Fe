import axiosClient from "@/adapter/axiosClient";
import { EventSourcePolyfill } from "event-source-polyfill";
import Cookies from "js-cookie";

const subscribeOrderStatus = (orderCode, onStatusUpdate) => {
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

  const sse = new EventSourcePolyfill(
    `${axiosClient.defaults.baseURL}/sse/payment/status/${orderCode}`,
    {
      headers: {
        Authorization: `Bearer ${user?.Token}`, // token JWT
      },
      heartbeatTimeout: 45000, // auto reconnect
    }
  );

  sse.addEventListener("order-status", (e) => onStatusUpdate(e.data));
  sse.addEventListener("order-init", (e) => onStatusUpdate(e.data));

  return sse;
};

export default subscribeOrderStatus;
