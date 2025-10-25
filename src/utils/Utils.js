import dayjs from "dayjs";
import { toast } from "react-toastify";
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
