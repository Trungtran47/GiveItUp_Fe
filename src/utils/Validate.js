export const isString = (value) =>
  typeof value === "string" || value instanceof String;

// eslint-disable-next-line no-restricted-globals
export const isNumber = (value) => typeof value === "number" && isFinite(value);

export const isArray = (value) => Array.isArray(value);

export const isFunction = (value) => typeof value === "function";

export const isObject = (value) =>
  value && typeof value === "object" && value.constructor === Object;

export const isNull = (value) => value === null;

export const isUndefined = (value) => typeof value === "undefined";

export const isBoolean = (value) => typeof value === "boolean";

export const isRegExp = (value) =>
  value && typeof value === "object" && value.constructor === RegExp;

export const isError = (value) =>
  value instanceof Error && typeof value.message !== "undefined";

export const isDate = (value) => value instanceof Date;

const maxLength = (max) => (value) =>
  value && value.length > max ? `* Không quá ${max} kí tự` : undefined;
export default class Validator {
  static genValidate = (validate, fieldName) => {
    let _validate = {};
    validate?.forEach((e, i) => {
      _validate[`${fieldName}_${i}`] = e;
    });
    return _validate;
  };

  // static required = (message) => (value) => {
  //     return value ? undefined : (message || '* Không được để trống');
  // }
  static required = (message) => (value) => {
    return value !== undefined && value !== null && value !== ""
      ? undefined
      : message || "* Không được để trống";
  };
  static requiredNumberAndZero(strQty) {
    return parseInt(strQty) >= 0 && parseInt(strQty).toString() == strQty
      ? undefined
      : "* Không được để trống";
  }
  static maxLength = (max) => (value) =>
    value && value.length > max ? `* Không quá ${max} kí tự` : undefined;
  static maxMonth = (max) => (value) =>
    value && parseInt(value) > max ? `* Không quá ${max} tháng` : undefined;
  static maxDate = (value) => {
    if (value > new Date()) {
      return "Ngày không được lớn hơn ngày hiện tại";
    }
    return undefined;
  };
  static emoji = (value) =>
    value &&
    /(u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]+)$/i.test(
      value
    )
      ? "Vui lòng nhập dúng dữ liệu"
      : undefined;
  static CheckedDate = (dateCheck, type) => (value) => {
    if (value && dateCheck) {
      switch (type) {
        case 1:
          if (value > dateCheck) {
            return "Thời gian đặt hàng từ phải nhỏ hơn hoặc bằng thời gian đặt hàng đến";
          } else {
            return undefined;
          }
        case 2:
          if (value < dateCheck) {
            return "Thời gian đặt hàng đến phải lớn hơn hoặc bằng thời gian đặt hàng từ";
          } else {
            return undefined;
          }
        default:
          return undefined;
      }
    } else {
      return undefined;
    }
  };
  static checkInvalidDate = (value) => {
    return value == "Invalid Date" ? `* Ngày không đúng định dạng` : undefined;
  };
  static checkTimeFrom =
    (data, text = "đặt hàng") =>
    (value) => {
      if (value && data) {
        if (value > data) {
          return `Thời gian ${text} từ phải nhỏ hơn hoặc bằng thời gian ${text} đến`;
        }
      }
      return undefined;
    };
  static checkTimeTo =
    (data, text = "đặt hàng") =>
    (value) => {
      if (value && data) {
        if (value < data) {
          return `Thời gian ${text} đến phải lớn hơn hoặc bằng thời gian ${text} từ`;
        }
      }
      return undefined;
    };
  static phone = (value) =>
    value &&
    !/(090|093|070|072|079|077|076|078|089|088|091|094|083|084|085|081|082|032|033|034|035|036|037|038|039|086|096|097|098|099|059|092|052|056|058)+([0-9]{7})\b/i.test(
      value
    )
      ? "Số điện thoại không hợp lệ"
      : undefined;
  static phoneNumber = (value) =>
    value && !/^[0-9]{10}$/i.test(value)
      ? "Số điện thoại không hợp lệ"
      : undefined;
  static number = (value) =>
    !/^[0-9]*$/i.test(value) && value != null
      ? "Giá trị nhập vào phải là số !"
      : undefined;
  static specialCharacters = (value) => {
    return value != "" &&
      /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/i.test(value)
      ? "Không được chứa kí tự đặc biệt"
      : undefined;
  };
  static checkPrice = (value) => {
    return value && value < 0 ? "Giá tiền phải lớn hơn hoặc bằng 0" : undefined;
  };
  static checkSymbols = (value) => {
    return value && /[!$%^&*()_+|~=`{}\[\]:\/;<>?@#]/i.test(value)
      ? "Không chứa kí tự đặc biệt"
      : undefined;
  };
  static checkCharRegex = (value) => {
    return value &&
      !/^[/\s/A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ0-9_.,+-]+$/i.test(
        value
      )
      ? "Không đúng định dạng"
      : undefined;
  };
  static money = (value) =>
    !/^[0-9.]*$/i.test(value) && value != null
      ? "Giá trị không đúng định dạng"
      : undefined;

  static checkEmotion = (value) => {
    return value != null && /^\+\d* ?\d*$/i.test(value)
      ? "Không chưa kí tự đặc biệt"
      : undefined;
  };

  static checkChar = (value) => {
    // return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/i.test(value) && value ? "Không chưa kí tự đặc biệt" : undefined
  };

  static checkPriceFrom = (height) => (value) => {
    if (
      value &&
      height &&
      parseInt(value?.toString().split(",").join("")) >=
        parseInt(height?.toString().split(",").join(""))
    ) {
      return "Giá trị từ phải nhỏ hơn giá trị đến";
    }
    return undefined;
  };
  static checkPriceWith = (height, text) => (value) => {
    if (
      value &&
      height &&
      parseInt(value?.toString().split(",").join("")) >
        parseInt(height?.toString().split(",").join(""))
    ) {
      // return 'Giá trị tính khấu hao phải nhỏ hơn hoặc bằng nguyên giá';
      return text;
    }
    return undefined;
  };
  static checkPriceTo = (height) => (value) => {
    if (
      value &&
      height &&
      parseInt(value?.toString().split(",").join("")) <=
        parseInt(height?.toString().split(",").join(""))
    ) {
      return "Giá trị đến phải lớn hơn giá trị từ";
    }
    return undefined;
  };

  static _toNumber = (v) => {
    if (v == null || v === "") return null;
    const str = String(v).replace(/,/g, "").trim();
    if (str === "") return null;
    const n = Number(str);
    return isNaN(n) ? null : n;
  };

  static checkPriceFromBill = (heightOrGetter) => (value) => {
    const height =
      typeof heightOrGetter === "function" ? heightOrGetter() : heightOrGetter;
    const valNum = Validator._toNumber(value);
    const heightNum = Validator._toNumber(height);

    if (valNum != null && heightNum != null && valNum >= heightNum) {
      return "Hoá đơn từ phải nhỏ hơn hoá đơn đến";
    }
    return undefined;
  };

  static checkPriceToBill = (heightOrGetter) => (value) => {
    const height =
      typeof heightOrGetter === "function" ? heightOrGetter() : heightOrGetter;
    const valNum = Validator._toNumber(value);
    const heightNum = Validator._toNumber(height);

    if (valNum != null && heightNum != null && valNum <= heightNum) {
      return "Hoá đơn đến phải lớn hơn hoá đơn từ";
    }
    return undefined;
  };

  static quantity = (value) => {
    return Number(value) == 0 ? "* Số lượng lớn hơn 0" : undefined;
  };
  static checkFormatDate = (value) => {
    // eslint-disable-next-line no-useless-escape
    return value &&
      !/\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/i.test(value)
      ? "* Không đúng định dạng"
      : undefined;
  };

  static checkEmoji = (value) => {
    return value != null &&
      /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/i.test(
        value
      )
      ? "* Dữ liệu không hợp lệ"
      : undefined;
  };
  static whiteSpace = (value) => {
    return value != null && !value?.trim()
      ? "* Dữ liệu không hợp lệ"
      : undefined;
  };

  static checkQuantity = (quantity) => (value) => {
    return value != null && Number(value) > quantity
      ? `* Số lượng nhập vượt quá cho phép`
      : undefined;
  };
  static CheckedDateRecall = (dateCheck, type) => (value) => {
    if (value && dateCheck) {
      switch (type) {
        case 1:
          if (value > dateCheck) {
            return `Ngày thu hồi phải lớn hơn hoặc bằng ngày cấp phát: ${dateCheck}`;
          } else {
            return undefined;
          }
        default:
          return undefined;
      }
    } else {
      return undefined;
    }
  };
}
