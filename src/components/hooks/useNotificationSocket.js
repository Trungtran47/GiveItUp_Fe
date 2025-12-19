// src/hooks/useNotificationSocket.js
import { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import Cookies from "js-cookie";
import { notification as antdNotification } from "antd";
import { Bell } from "lucide-react";
import axiosClient from "@/adapter/axiosClient";

export const useNotificationSocket = (user) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const stompClientRef = useRef(null);
  const [api, contextHolder] = antdNotification.useNotification();

  // --- HÀM GỌI API LẤY LỊCH SỬ THÔNG BÁO ---
  const fetchNotifications = async () => {
    if (!user?.id) return;
    try {
      // Gọi API GET /notifications?userId=...
      const res = await axiosClient.get(`/notifications`, {
        params: { userId: user.id },
      });
      if (res?.data?.result) {
        setNotifications(res.data.result);
        setUnreadCount(res.data.result.filter((n) => !n.read).length);
      }
    } catch (error) {
      console.error("Lỗi lấy thông báo:", error);
    }
  };

  useEffect(() => {
    if (!user) return;
    // 1. Load thông báo cũ từ DB ngay khi vào trang
    fetchNotifications();
    // 2. Kết nối WebSocket (Giữ nguyên logic cũ)
    let token = null;
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        token = JSON.parse(userCookie).Token;
      } catch (e) {}
    }
    const socketUrl =
      (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080") + "/ws";
    const socket = new SockJS(socketUrl);
    const stompClient = Stomp.over(socket);
    stompClient.debug = () => {};
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    stompClient.connect(
      headers,
      () => {
        stompClient.subscribe(`/topic/notifications/${user.id}`, (message) => {
          const newNoti = JSON.parse(message.body);
          handleNewNotification(newNoti);
        });
      },
      (err) => console.error(err)
    );
    stompClientRef.current = stompClient;
    return () => {
      if (stompClientRef.current) stompClientRef.current.disconnect();
    };
  }, [user]);

  // --- XỬ LÝ KHI CÓ THÔNG BÁO MỚI (REALTIME) ---
  const handleNewNotification = (newNoti) => {
    setNotifications((prev) => [newNoti, ...prev]);
    setUnreadCount((prev) => prev + 1);

    api.info({
      message: "Thông báo mới",
      description: newNoti.message,
      placement: "topRight",
      icon: <Bell style={{ color: "#108ee9" }} />,
      duration: 3,
      style: { cursor: "pointer" },
      onClick: () => markAsRead(newNoti), // Click vào toast cũng tính là đọc
    });
  };

  // --- HÀM ĐÁNH DẤU ĐÃ ĐỌC (GỌI API PUT) ---
  const markAsRead = async (item) => {
    if (item.read) return;
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
    try {
      await axiosClient.put(`/notifications/${item.id}/read`);
      fetchNotifications(); // Tải lại danh sách thông báo
    } catch (error) {
      console.error("Lỗi đánh dấu đã đọc:", error);
    }
  };

  // --- HÀM ĐÁNH DẤU TẤT CẢ ---
  const markAllAsRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
    try {
      await axiosClient.put(`/notifications/read-all`, null, {
        params: { userId: user.id },
      });
    } catch (error) {
      console.error(error);
    }
  };
  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    contextHolder,
  };
};
