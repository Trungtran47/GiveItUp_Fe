import dayjs from "dayjs";
import { toast } from "react-toastify";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Modal } from "antd";
export const MOBILE_BREAKPOINT = 850;

export default class Utils {
  static formatCurrency(n) {
    if (!n) {
      return 0;
    }
    return n.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  }
  static triggerSubmit = (wrapRef) => {
    if (true) {
      try {
        let listBtn = wrapRef.current
          .closest("form.quick-submit")
          .querySelectorAll("button[type=submit]");
        if (listBtn.length > 0) {
          listBtn[0].click();
        }
      } catch (error) {
        // console.log("error", error)
      }
    }
  };
  static showErrorModal = (err) => {
    Modal.error({
      title: "Đăng nhập thất bại",
      content: err || "Vui lòng kiểm tra lại thông tin đăng nhập.",
      centered: true, // ✅ quan trọng: hiển thị ở giữa màn hình
      okText: "Đóng",
    });
  };
  static generateOrderCode() {
    const now = Math.floor(Date.now() / 1000); // timestamp theo giây, ~10 chữ số
    const rand = Math.floor(Math.random() * 9000) + 1000; // 4 chữ số
    return now * 10000 + rand;
  }

  static getDateDayjs(timestamp, type = 1) {
    if (!timestamp) {
      return null;
    }
    let result = null;
    const ts = dayjs?.isDayjs(timestamp) ? timestamp : dayjs(timestamp);

    switch (type) {
      case 1:
        result = ts?.format("DD/MM/YYYY");
        break;
      case 2:
        result = ts?.format("YYYY-MM-DD HH:mm");
        break;
      case 3:
        result = ts?.format("YYYY-MM-DD");
        break;
      case 4:
        result = ts?.format("HH:mm:ss - DD.MM.YYYY");
        break;
      case 5:
        result = ts?.format("DD.MM.YYYY - HH:mm");
        break;
      case 6:
        result = ts?.format("HH:mm");
        break;
      case 7:
        result = ts?.format("HH:mm  DD.MM.YYYY");
        break;
      case 8:
        result = ts?.format("MM/DD/YYYY");
        break;
      case 9:
        result = ts?.format("YYYY");
        break;
      case 10:
        result = ts?.format("MM");
        break;
      case 11:
        result = ts?.format("MM/YYYY");
        break;
      case 12:
        result = ts?.format("HH:mm:ss");
        break;
      case 13:
        result = ts?.format("HH:mm DD/MM/YYYY");
        break;
      case 14:
        result = ts?.format("DD [Thg] MM");
        break;
      case 15:
        result = ts?.format("DD/MM/YYYY, HH:mm");
        break;
      case 16:
        result = ts?.format("dd, DD/MM/YYYY HH:mm");
        break;
      case 17:
        result = ts?.format("DD/MM/YYYY HH:mm");
        break;
      case 18:
        result = ts?.format("HH:mm, DD/MM/YYYY");
        break;
      case 19:
        result = ts?.format("DD/MM/YYYY HH:mm:ss");
        break;
      case 20:
        result = ts?.format("YYYY-MM-DDTHH:mm:ss");
        break;
      default:
        break;
    }
    return result;
  }
}
export const getToast = (message, typeToast, iconMessage, timeClose) => {
  switch (typeToast) {
    case "success":
      return toast.success(message ?? "Thành công", {
        type: typeToast,
        icon: iconMessage,
        autoClose: timeClose,
      });
    case "error":
      return toast.error(message ?? "Lỗi hệ thống", {
        type: typeToast,
        icon: iconMessage,
        autoClose: timeClose || 10000,
      });
    case "warning":
      return toast.error(message ?? "Lỗi hệ thống", {
        type: typeToast,
        icon: iconMessage,
        autoClose: timeClose,
      });
    case "info":
      return toast.error(message ?? "Thành công", {
        type: typeToast,
        icon: iconMessage,
        autoClose: timeClose,
      });
    default:
      return toast.success(message ?? "Thành công", {
        type: typeToast,
        icon: iconMessage,
        autoClose: timeClose,
      });
  }
};
export const parseNumber = (value) => {
  if (typeof value === "string") {
    return parseFloat(value.replace(/,/g, "")) || 0;
  }
  return parseFloat(value) || 0;
};

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState();

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
export const formatNumber = (value, fractionDigits = 0, locale = "en-US") => {
  if (typeof value !== "number") return "";

  return value.toLocaleString(locale, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
};
export const convertParamsToArray = (obj) => {
  return Object.keys(obj).map(function (key) {
    return obj[key];
  });
};
