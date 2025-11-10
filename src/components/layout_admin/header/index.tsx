"use client";

import AppInitializer from "@/app/AppInitializer";
import { UserInfo } from "@/components/layout_admin/header/user-info";
import { useSidebarContext } from "@/components/layout_admin/sidebar/sidebar-context";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { MenuIcon } from "./icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function Header() {
  type User = Record<string, unknown> | null;
  interface RootState {
    user: {
      dataUser: User;
    };
  }
  const user = useSelector((state: RootState) => state.user.dataUser);
  const [dataUser, setDataUser] = useState<User | null>(user);
  const router = useRouter();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setInitialized(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (initialized && !user) {
      router.push("/login");
    }
  }, [user, initialized]);

  // const user = useSelector((state) => state.user.dataUser);
  const { toggleSidebar, isMobile } = useSidebarContext();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-0 border-gray-200 bg-white px-4! py-1! shadow-sm  md:px-6 2xl:px-10">
      {/* Nút mở sidebar trên mobile */}
      <button
        onClick={toggleSidebar}
        className="rounded-lg border border-gray-300 bg-white p-2 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 lg:hidden"
      >
        <MenuIcon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        <span className="sr-only">Toggle Sidebar</span>
      </button>

      {/* Logo trên mobile */}
      {isMobile && (
        <Link href="/" className="ml-3 hidden sm:inline-flex">
          <Image
            src="/images/logo/logo-icon.svg"
            width={32}
            height={32}
            alt="Logo"
            priority
          />
        </Link>
      )}

      {/* Tiêu đề dashboard */}
      <div className="hidden xl:block">
        <h1 className="text-lg font-semibold text-gray-900 ">GiveItUp</h1>
        <p className="text-sm text-gray-500 ">Cùng nhau tiến bước</p>
      </div>

      {/* Search box */}
      <div className="flex flex-1 items-center justify-end gap-3 sm:gap-4">
        {/* <div className="relative w-full max-w-xs">
          <FormInput />
        </div> */}
        {/* Tạm ẩn các phần khác */}
        {/*
         */}
        {/* <ThemeToggleSwitch /> */}
        {/* <Notification /> */}
        <div className="shrink-0">
          <AppInitializer />
          <UserInfo dataUser={dataUser} setDataUser={setDataUser} />
        </div>
      </div>
    </header>
  );
}
