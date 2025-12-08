import * as Icons from "../icons";
const ADMIN_PREFIX = "/admin";
export const NAV_DATA = [
  {
    label: "QUẢN LÝ",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        url: `${ADMIN_PREFIX}/dashboard`,
        items: [],
      },
      {
        title: "Quản trị hệ thống",
        url: `${ADMIN_PREFIX}/calendar`,
        icon: Icons.Calendar,
        items: [
          {
            title: "Quán lý tài khoản",
            url: `${ADMIN_PREFIX}/account`,
          },
          {
            title: "Quản lý tài khoản ngân hàng",
            url: "/admin/account",
          },
        ],
      },
      {
        title: "Quản lý danh mục",
        url: `${ADMIN_PREFIX}/category`,
        icon: Icons.User,
        items: [],
      },
      {
        title: "Quản lý dự án gây quỹ",
        url: `${ADMIN_PREFIX}/project`,
        icon: Icons.Alphabet,
        items: [
        
        ],
      },
      {
        title: "Quản lý yêu cầu rút tiền",
        url: `${ADMIN_PREFIX}/payout-requests`,
        icon: Icons.WithdrawRequestIcon,
        items: [
        ],
      },
            {
        title: "Danh sách quyên góp",
        url: `${ADMIN_PREFIX}/donation`,
        icon: Icons.DonationIcon,
        items: [
        ],
      },
      {
        title: "Cài đặt",
        url: "/setting",
        icon: Icons.Setting,
        items: [
      
        ],
      },

    ],
  },
  // {
  //   label: "OTHERS",
  //   items: [
  //     {
  //       title: "Charts",
  //       icon: Icons.PieChart,
  //       items: [
  //         {
  //           title: "Basic Chart",
  //           url: "/charts/basic-chart",
  //         },
  //       ],
  //     },
  //     {
  //       title: "UI Elements",
  //       icon: Icons.FourCircle,
  //       items: [
  //         {
  //           title: "Alerts",
  //           url: "/ui-elements/alerts",
  //         },
  //         {
  //           title: "Buttons",
  //           url: "/ui-elements/buttons",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Authentication",
  //       icon: Icons.Authentication,
  //       items: [
  //         {
  //           title: "Sign In",
  //           url: "/auth/sign-in",
  //         },
  //       ],
  //     },
  //   ],
  // },
];
