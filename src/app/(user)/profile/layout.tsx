"use client";
import SidebarProfile from "@/containers/users/profile/SidebarProfile";
import { PropsWithChildren } from "react";

export default function ProfileLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex w-full">
      {/* SIDEBAR DÍNH CỐ ĐỊNH DƯỚI HEADER */}
      <div className="sticky top-[56px] h-[calc(100vh-56px)] overflow-hidden ">
        <SidebarProfile />
      </div>

      {/* CONTENT TỰ SCROLL */}
      <div className="flex-1 pl-6 pt-8 ">{children}</div>
    </div>
  );
}
