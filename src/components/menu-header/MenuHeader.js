// import IconArrow from "@spo/assets/icons/ic-arrow";
// import IcLogo from "@spo/assets/images/logo/logo.png";
// import vnFlag from "@spo/assets/images/logo/Vn.svg";

import Image from "next/image";
import Link from "next/link";
import Constants from "../../utils/Constants";
import classes from "./MenuHeader.module.scss";
// import { useTranslations } from "next-intl";
import IconArrow from "@/assets/icons/ic-arrow";
import IconUser from "@/assets/icons/ic-user";
import ButtonCommon from "@/components/common/button/ButtonCommon";
import { Dropdown } from "antd";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";
import IconSearch from "@/assets/icons/ic-search";
import { logout } from "@/redux/auth/reducer";
import { getDataUser, getDataUserFailure } from "@/redux/user/reducer";
import Text from "@/components/common/text-common/text/Text";
export default function MenuHeader() {
  const user = useSelector((state) => state.user.dataUser);
  const [dataUser, setDataUser] = useState(user);
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
        onClick: () => router.push("/profile"),
      },
      {
        key: "settings",
        label: (
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span>Cài đặt</span>
          </div>
        ),
        onClick: () => router.push("/settings"),
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
                setDataUser(null);
              },
            })
          );
          console.log("Đăng xuất");
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
        <div>
          <Image
            src="/image/logo_home.png"
            alt="Google"
            width={128}
            height={61}
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
                <Text className="text-sm">{dataUser?.username || "User"}</Text>
                <ChevronDown size={14} />
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
