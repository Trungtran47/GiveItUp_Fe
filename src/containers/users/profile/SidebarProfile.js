"use client";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Heart,
  HandCoins,
  User,
  History,
  MessageSquare,
} from "lucide-react";
import { useSelector } from "react-redux";
import Constants from "@/utils/Constants";
import path from "path";

export default function SidebarProfile() {
  const router = useRouter();
  const pathname = usePathname();
  const user = useSelector((state) => state.user.dataUser);

  const menuItems = [
    {
      id: "info",
      label: "Thông tin cá nhân",
      icon: User,
      path: Constants.ROUTES.USER_INFO,
    },
    Constants.ROLES.AUTHOR.includes(user?.role) && {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      path: Constants.ROUTES.DASHBOARD,
    },
    Constants.ROLES.AUTHOR.includes(user?.role) && {
      id: "myposts",
      label: "Bài viết đã đăng",
      icon: FileText,
      path: Constants.ROUTES.MY_POSTS,
    },
    {
      id: "favorites",
      label: "Bài viết đã yêu thích",
      icon: Heart,
      path: Constants.ROUTES.FAVORITES,
    },
    {
      id: "donations",
      label: "Danh sách đã ủng hộ",
      icon: HandCoins,
      path: Constants.ROUTES.DONATIONS,
    },
    {
      id: "comment_activity",
      label: "Hoạt động bình luận",
      icon: MessageSquare,
      path: Constants.ROUTES.COMMENT_ACTIVITY,
    },
    {
      id: "view_history",
      label: "Lịch sử xem",
      icon: History,
      path: Constants.ROUTES.VIEW_HISTORY,
    },
  ].filter(Boolean);

  return (
    <div className="w-60  min-h-screen py-4 overflow-hidden">
      {/* <h2 className="text-[16px] font-semibold mb-6 text-gray-800"> */}
      {/* Tài khoản */}
      {/* </h2> */}
      <ul className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive = pathname === item.path;
          return (
            <li
              key={item.id}
              onClick={() => router.push(item.path)}
              className={`flex items-center gap-3 cursor-pointer px-3 py-2 rounded-xl transition 
              ${
                isActive
                  ? "bg-blue-100 text-[#017C18] font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[14px]">{item.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
