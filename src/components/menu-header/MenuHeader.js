"use client";
import Image from "next/image";
import Link from "next/link";
import Constants from "../../utils/Constants";
import classes from "./MenuHeader.module.scss";

import IconArrow from "@/assets/icons/ic-arrow";
import IconSearch from "@/assets/icons/ic-search";
import IconUser from "@/assets/icons/ic-user";
import { ChevronDown, Heart, History, LogOut, User, Bell } from "lucide-react"; // Thêm Bell
import ButtonCommon from "@/components/common/button/ButtonCommon";
import Text from "@/components/common/text-common/text/Text";

// Redux & Router
import { logout } from "@/redux/auth/reducer";
import { clearUserData } from "@/redux/user/reducer";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Badge, List, Avatar, Empty } from "antd";
import dayjs from "dayjs";
import { useNotificationSocket } from "@/components/hooks/useNotificationSocket";
import Utils from "@/utils/Utils";

export default function MenuHeader() {
  const user = useSelector((state) => state.user.dataUser);
  const [dataUser, setDataUser] = useState(user);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  // --- SỬ DỤNG HOOK (Logic tách biệt hoàn toàn) ---
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    contextHolder,
  } = useNotificationSocket(dataUser);

  useEffect(() => {
    setDataUser(user);
    if (user?.role === "ADMIN") {
      router.push("/admin/dashboard");
    }
  }, [user]);

  // --- HÀM RENDER UI DROPDOWN ---
  // --- 4. RENDER UI DROPDOWN (GIAO DIỆN MỚI) ---
  const renderNotificationMenu = () => (
    <div className="w-[400px] bg-white shadow-xl rounded-xl border border-gray-100 max-h-[500px] overflow-y-auto custom-scrollbar font-sans scroll-white">
      {/* HEADER: Thoáng hơn, chữ rõ ràng hơn */}
      <div className="px-5 py-2 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur-sm z-10">
        <span className="font-bold text-lg text-gray-800">Thông báo</span>
        {unreadCount > 0 && (
          <span
            onClick={markAllAsRead}
            className="text-xs font-medium text-green-600 hover:text-green-700 cursor-pointer hover:underline transition-all"
          >
            Đánh dấu tất cả là đã đọc
          </span>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-400">
          <Bell className="w-10 h-10 mb-2 opacity-20" />
          <span className="text-sm">Bạn chưa có thông báo nào</span>
        </div>
      ) : (
        <List
          dataSource={notifications}
          renderItem={(item) => (
            <div
              className={`group flex items-start gap-2 px-5 py-2 border-b border-gray-50 cursor-pointer transition-all duration-200 last:border-0 relative
                ${
                  !item.read
                    ? "bg-green-50/60 hover:bg-green-50"
                    : "bg-white hover:bg-gray-50"
                }
              `}
              onClick={() => {
                markAsRead(item);
                if (item.link) router.push(item.link);
              }}
            >
              <div className="relative flex-shrink-0">
                <Avatar
                  src={item.senderAvatar}
                  icon={!item.senderAvatar && <User className="w-5 h-5" />}
                  size={48} // Tăng kích thước avatar lên chút cho rõ
                  className={`border-2 shadow-sm ${
                    !item.read ? "border-white" : "border-gray-100"
                  } bg-gray-200`}
                />
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                  <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
              </div>

              {/* CONTENT: Có khoảng cách, phân cấp chữ */}
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <div
                  className={`text-sm leading-snug ${
                    !item.read ? "text-gray-900 font-semibold" : "text-gray-600"
                  }`}
                >
                  {/* Nếu muốn hightlight tên người gửi, bạn có thể tách chuỗi hoặc render riêng */}
                  {item.message}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 font-medium">
                    {dayjs(item.createdAt).format("DD/MM/YYYY - HH:mm")}
                  </span>
                  {/* Dấu chấm xanh báo chưa đọc */}
                  {!item.read && (
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  )}
                </div>
              </div>
            </div>
          )}
        />
      )}
    </div>
  );
  // --- MENU CŨ CỦA BẠN GIỮ NGUYÊN ---
  const dataMenus = [
    { href: Constants.ROUTES.SEARCH, label: "Tìm kiếm" },
    { href: Constants.ROUTES.HOME, label: "Trang chủ" },
    { href: Constants.ROUTES.PROJECT, label: "Dự án" },
    { href: Constants.ROUTES.ABOUT_US, label: "Về chúng tôi" },
  ];
  const userMenu = useMemo(
    () => [
      {
        key: "profile",
        label: (
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>Thông tin cá nhân</span>
          </div>
        ),
        onClick: () => router.push(Constants.ROUTES.USER_INFO),
      },
      {
        key: "favorites",
        label: (
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            <span>Bài viết đã yêu thích</span>
          </div>
        ),
        onClick: () => router.push(Constants.ROUTES.FAVORITES),
      },
      {
        key: "view_history",
        label: (
          <div className="flex items-center gap-2">
            <History className="w-4 h-4" />
            <span>Lịch sử xem</span>
          </div>
        ),
        onClick: () => router.push(Constants.ROUTES.VIEW_HISTORY),
      },
      { type: "divider" },
      {
        key: "logout",
        label: (
          <div className="flex items-center gap-2 text-red-500">
            <LogOut className="w-4 h-4" />
            <span>Đăng xuất</span>
          </div>
        ),
        onClick: () => {
          dispatch(
            logout({
              onSuccess: () => {
                dispatch(clearUserData());
                setDataUser(null);
              },
            })
          );
        },
      },
    ],
    [router, dispatch]
  );
  return (
    <div className={classes.header}>
      {contextHolder} {/* Placeholder để hiển thị Toast từ Hook */}
      <div className={classes.containerMenu}>
        <nav className={classes.menu}>
          {dataMenus.map((menu, i) =>
            menu.href ? (
              <Link
                key={i}
                href={menu.href}
                prefetch
                className={`${classes.menuItem} ${
                  pathname === menu.href ? classes.active : ""
                }`}
              >
                {menu.label === "Tìm kiếm" ? (
                  <div className="flex gap-1">
                    <IconSearch />
                    {menu.label}
                  </div>
                ) : (
                  menu.label
                )}
              </Link>
            ) : (
              <div
                key={i}
                className={`${classes.menuItem} ${classes.hasSubmenu}`}
              >
                <div className={classes.labelMut}>
                  <span>{menu.label}</span>
                  <IconArrow />
                </div>
                <div className={classes.submenu}>
                  {menu.submenu.map((sub, j) => (
                    <Link
                      key={j}
                      href={sub.href}
                      prefetch
                      className={`${classes.submenuItem} ${
                        pathname === sub.href ? classes.active : ""
                      }`}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            )
          )}
        </nav>

        <div className="w-[128px] h-[46px] relative">
          <Image
            src="/image/logo_home.png"
            alt="Logo"
            fill
            className="object-contain"
            unoptimized
          />
        </div>

        <div className="flex items-center gap-4">
          {/* --- [MỚI] ICON THÔNG BÁO --- */}
          {dataUser && (
            <Dropdown
              popupRender={renderNotificationMenu}
              trigger={["click"]}
              placement="bottom"
              arrow
            >
              <div className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors">
                <Badge
                  count={unreadCount}
                  overflowCount={99}
                  size="small"
                  offset={[2, -2]}
                >
                  <Bell className="w-6 h-6 text-gray-600" />
                </Badge>
              </div>
            </Dropdown>
          )}

          {/* --- USER INFO GIỮ NGUYÊN --- */}
          {dataUser ? (
            <Dropdown
              menu={{ items: userMenu }}
              placement="bottomRight"
              trigger={["click"]}
            >
              <div className="flex gap-1 justify-center items-center cursor-pointer select-none">
                <IconUser />
                <Text className="text-sm">{` Chào, ${
                  dataUser?.username || "User"
                }`}</Text>
                <ChevronDown size={18} color="black" />
              </div>
            </Dropdown>
          ) : (
            <ButtonCommon
              startIcon={<IconUser color="white" />}
              title="Đăng nhập"
              onClick={() => router.push("/login")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
