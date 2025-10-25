export default class Constants {
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
