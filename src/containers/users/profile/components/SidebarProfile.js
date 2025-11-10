"use client";
import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Heart,
  HandCoins,
  User,
} from "lucide-react";
import { useSelector } from "react-redux";
import Constants from "@/utils/Constants";

export default function SidebarProfile({ active, onSelect }) {
  const user = useSelector((state) => state.user.dataUser);
  const menuItems = [
    Constants.ROLES.AUTHOR.includes(user?.role) && {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    Constants.ROLES.AUTHOR.includes(user?.role) && {
      id: "myposts",
      label: "Bài viết đã đăng",
      icon: FileText,
    },
    { id: "favorites", label: "Bài viết đã yêu thích", icon: Heart },
    { id: "donations", label: "Danh sách đã ủng hộ", icon: HandCoins },
    { id: "profile", label: "Thông tin cá nhân", icon: User },
  ].filter(Boolean);

  return (
    <div className="w-64 border-r min-h-screen shadow-sm p-4">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Tài khoản</h2>
      <ul className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <li
              key={item.id}
              onClick={() => onSelect(item.id)}
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
