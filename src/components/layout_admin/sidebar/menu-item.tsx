"use client";

import { useSidebarContext } from "@/components/layout_admin/sidebar/sidebar-context";
import { cn } from "@/utils/Utils";
import Link from "next/link";
import React from "react";

type MenuItemProps =
  | {
      as?: "button";
      onClick: () => void;
      isActive: boolean;
      className?: string;
      children: React.ReactNode;
    }
  | {
      as: "link";
      href: string;
      isActive: boolean;
      className?: string;
      children: React.ReactNode;
    };

export function MenuItem(props: MenuItemProps) {
  const { toggleSidebar, isMobile } = useSidebarContext();

  // Base Tailwind classes
  const baseClass = "rounded-lg px-3.5 font-medium transition-all duration-200";

  // State style: active vs normal
  const activeClass =
    "bg-[rgba(87,80,241,0.07)] text-primary hover:bg-[rgba(87,80,241,0.07)] dark:bg-[#FFFFFF1A] dark:text-white";
  const normalClass =
    "text-gray-700 hover:bg-gray-100 hover:text-black dark:text-gray-300 dark:hover:bg-[#FFFFFF1A] dark:hover:text-white";

  const combinedClass = cn(
    baseClass,
    props.isActive ? activeClass : normalClass,
    props.className
  );

  // Link version
  if (props.as === "link") {
    return (
      <Link
        href={props.href}
        onClick={() => isMobile && toggleSidebar()}
        className={cn(combinedClass, "relative block py-2")}
      >
        {props.children}
      </Link>
    );
  }

  // Button version
  return (
    <button
      onClick={props.onClick}
      aria-expanded={props.isActive}
      className={cn(combinedClass, "flex w-full items-center gap-3 py-3")}
    >
      {props.children}
    </button>
  );
}
