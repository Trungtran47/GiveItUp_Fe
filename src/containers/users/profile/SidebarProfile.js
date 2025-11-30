"use client";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Heart,
  HandCoins,
  User,
  History,
} from "lucide-react";
import { useSelector } from "react-redux";
import Constants from "@/utils/Constants";

export default function SidebarProfile() {
  const router = useRouter();
  const pathname = usePathname();
  const user = useSelector((state) => state.user.dataUser);

  const menuItems = [
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
      id: "view_history",
      label: "Lịch sử xem",
      icon: History,
      path: Constants.ROUTES.VIEW_HISTORY,
    },
    {
      id: "info",
      label: "Thông tin cá nhân",
      icon: User,
      path: Constants.ROUTES.USER_INFO,
    },
  ].filter(Boolean);

  return (
    <div className="w-64 border-r min-h-screen shadow-sm py-8 overflow-hidden">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Tài khoản</h2>
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
              <span>{item.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
