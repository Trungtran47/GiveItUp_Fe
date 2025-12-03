"use client";
import SidebarProfile from "@/containers/users/profile/SidebarProfile";
import { PropsWithChildren } from "react";

export default function ProfileLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex w-full">
      {/* SIDEBAR cố định + không bị co */}
      <div className="sticky top-[56px] h-[calc(100vh-56px)] w-64 flex-shrink-0 overflow-hidden">
        <SidebarProfile />
      </div>

      {/* CONTENT tự scroll + không đẩy sidebar */}
      <div className="flex-1 pl-6 pt-8 overflow-y-auto min-w-0">{children}</div>
    </div>
  );
}
