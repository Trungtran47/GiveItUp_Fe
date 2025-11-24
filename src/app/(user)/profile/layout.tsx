"use client";
import SidebarProfile from "@/containers/users/profile/SidebarProfile";
import { PropsWithChildren } from "react";

export default function ProfileLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex">
      <SidebarProfile />
      <div className="flex-1 min-h-screen w-[900px] pt-8">{children}</div>
    </div>
  );
}
