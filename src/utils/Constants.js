export default class Constants {
  static ROLES = {
    ADMIN: ["ROLE_ADMIN", "ADMIN"],
    AUTHOR: ["ROLE_AUTHOR", "AUTHOR"],
    USER: ["ROLE_USER", "USER"],
  };

  static STATUS_USER = {
    PENDING: 10, // Chờ xác nhận
    USER: 20, // Người dùng bình thường
    AUTHOR: 30, // Tài khoản author
    INACTIVE: 90, // Vô hiệu hóa
  };

  static PAGING = {
    ROW_PER_PAGE: 50,
    ROW_PER_PAGE_TWO: 100,
    CURRENT_PAGE: 1,
  };
  static MAX_VALUE_QUANTITY = {
    MAX_VALUE: 1000000000,
  };
  static RECEIPT_LIMIT = {
    LIMIT: 50,
    OFFSET: 0,
  };
  static STATUS_CATEGORY = {
    ACTIVE: 10,
    INACTIVE: 20,
    DELETED: 30,
  };
  static ROUTER_URL = {
    PAGE: "p",
    PAGE_SIZE: "psz",
    USER_NAME: "u_n",
    PHONE_NUMBER: "p_n",
    CATEGORY_NAME: "c_n",
  };

  static FormInputFormat = {
    PHONE: { VALUE: "phone" },
    MONEY: { VALUE: "money" },
    TEXT: { VALUE: "text" },
    DECIMAL: { VALUE: "decimal" },
    PASSWORD: { LABEL: "Password", VALUE: "password" },
  };
  static ROUTES = {
    SEARCH: "/search",
    PROJECT: "/project",
    ABOUT_US: "/about_us",
    HOME: "/",
    // HISTORY: "/history", // Lịch sử đấu
    // COMPS: "/comps", // Đội hình meta
    // POWER_UP: "/powerup", // Power Ups

    // // --- Số liệu (submenu)
    // STATS_OVERVIEW: "/stats/overview",
    // STATS_CHAMPIONS: "/stats/champions",
    // STATS_ITEMS: "/stats/items",
    // STATS_AUGMENTS: "/stats/augments",
    // STATS_TRAITS: "/stats/traits",
    // STATS_POWERUPS: "/stats/powerups",

    // SIMULATOR: "/simulator", // Trình mô phỏng
    // NEWS: "/news", // Tin tức

    // // --- Mẹo TFT (submenu)
    // TIPS_GUIDE: "/tips/guide",
    // TIPS_ADVANCED: "/tips/advanced",

    // RANKING: "/ranking", // Bảng xếp hạng
  };
  static GENDER = [
    {
      id: 1,
      key: 1,
      value: 1,
      label: "Nam",
    },
    {
      id: 2,
      key: 2,
      value: 2,
      label: "Nữ",
    },
    {
      id: 3,
      key: 3,
      value: 3,
      label: "Khác",
    },
  ];
  static ROLE = [
    {
      id: 2,
      key: "AUTHOR",
      value: "AUTHOR",
      label: "Tác giả",
    },
    {
      id: 3,
      key: "USER",
      value: "USER",
      label: "Người dùng",
    },
  ];
}
