// import IconArrow from "@spo/assets/icons/ic-arrow";
// import IcLogo from "@spo/assets/images/logo/logo.png";
// import vnFlag from "@spo/assets/images/logo/Vn.svg";
"use client";
import Image from "next/image";
import Link from "next/link";
import Constants from "../../utils/Constants";
import classes from "./MenuHeader.module.scss";
// import { useTranslations } from "next-intl";
import IconArrow from "@/assets/icons/ic-arrow";
import IconSearch from "@/assets/icons/ic-search";
import IconUser from "@/assets/icons/ic-user";
import ButtonCommon from "@/components/common/button/ButtonCommon";
import Text from "@/components/common/text-common/text/Text";
import { logout } from "@/redux/auth/reducer";
import { Dropdown } from "antd";
import { ChevronDown, Heart, History, LogOut, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData } from "@/redux/user/reducer";
export default function MenuHeader() {
  const user = useSelector((state) => state.user.dataUser);
  const [dataUser, setDataUser] = useState(user);
  useEffect(() => {
    setDataUser(user);
  }, [user]);
  const pathname = usePathname(); // lấy đường dẫn hiện tại
  const router = useRouter();
  const dispatch = useDispatch();
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
      {
        type: "divider",
      },
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
    [router]
  );
  return (
    <div className={classes.header}>
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
        <div className="w-[128px] h-[46px]">
          <Image
            src="/image/logo_home.png"
            alt="Logo"
            fill
            className="object-contain"
            unoptimized
          />
        </div>

        <div>
          {dataUser ? (
            // <div className="flex gap-1 justify-center items-center cursor-pointer">
            //   <IconUser />
            //   <Text>{user?.username}</Text>
            // </div>
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
              startIcon={<IconUser />}
              title="Đăng nhập"
              onClick={() => router.push("/login")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
