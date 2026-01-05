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
        title: "Quản lý tài khoản",
        url: `${ADMIN_PREFIX}/account`,
        icon: Icons.User,
        items: [
          {
            title: "Tài khoản người dùng",
            url: `${ADMIN_PREFIX}/account`,
          },
          {
            title: "Tài khoản tổ chức",
            url: `${ADMIN_PREFIX}/account_organization`,
          },
        ],
      },
      {
        title: "Quản lý danh mục",
        url: `${ADMIN_PREFIX}/category`,
        icon: Icons.Calendar,
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
      // {
      //   title: "Cài đặt",
      //   url: "/setting",
      //   icon: Icons.Setting,
      //   items: [
      
      //   ],
      // },

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
