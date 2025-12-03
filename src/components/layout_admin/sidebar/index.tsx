"use client";

import { useSidebarContext } from "@/components/layout_admin/sidebar/sidebar-context";
import { cn } from "@/utils/Utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_DATA } from "./data";
import { ArrowLeftIcon, ChevronUp } from "./icons";

export function Sidebar() {
  const pathname = usePathname();
  const { setIsOpen, isOpen, isMobile, toggleSidebar } = useSidebarContext();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? [] : [title]));
  };

  // Giữ menu con mở khi đang ở subpage
  useEffect(() => {
    NAV_DATA.some((section) =>
      section.items.some((item) =>
        item.items.some((subItem) => {
          if (subItem.url === pathname) {
            if (!expandedItems.includes(item.title)) {
              toggleExpanded(item.title);
            }
            return true;
          }
        })
      )
    );
  }, [pathname]);

  return (
    <>
      {/* Overlay cho mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "max-w-[290px] min-w-[290px] overflow-hidden border-r border-gray-200 bg-white transition-all duration-200",
          isMobile ? "fixed bottom-0 top-0 z-50" : "sticky top-0 h-screen",
          isOpen ? "w-full" : "w-0"
        )}
        aria-label="Main navigation"
        aria-hidden={!isOpen}
      >
        <div className="flex h-full flex-col py-2 pl-6 pr-2">
          {/* Logo + Nút đóng */}
          <div className="relative pr-4">
            <Link
              href="/"
              onClick={() => isMobile && toggleSidebar()}
              className="px-0 py-0"
            >
              <Image
                src="public/image/logo_login.png"
                alt="Logo"
                width={100}
                height={20}
                unoptimized
              />
            </Link>

            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <ArrowLeftIcon className="size-7 text-gray-500" />
              </button>
            )}
          </div>

          {/* Danh sách menu */}
          <div className="flex-1 overflow-y-auto pr-3">
            {NAV_DATA.map((section) => (
              <div key={section.label} className="mb-6">
                <h2 className="mb-4 text-sm font-medium text-gray-500 uppercase tracking-wide">
                  {section.label}
                </h2>

                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.title}>
                      {item.items.length ? (
                        <>
                          {/* Menu có submenu */}
                          <button
                            onClick={() => toggleExpanded(item.title)}
                            className={cn(
                              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-black hover:bg-gray-100 transition",
                              item.items.some(({ url }) => url === pathname)
                                ? "bg-blue-100 text-blue-600"
                                : ""
                            )}
                          >
                            <item.icon className="size-6 shrink-0" />
                            <span>{item.title}</span>
                            <ChevronUp
                              className={cn(
                                "ml-auto size-5 transition-transform duration-200",
                                expandedItems.includes(item.title)
                                  ? "rotate-0"
                                  : "rotate-180"
                              )}
                            />
                          </button>

                          {/* Submenu */}
                          {expandedItems.includes(item.title) && (
                            <ul className="ml-9 mt-2 space-y-1">
                              {item.items.map((subItem) => (
                                <li key={subItem.title}>
                                  <Link
                                    href={subItem.url}
                                    className={cn(
                                      "block rounded-md px-2 py-1.5 text-sm text-black hover:bg-gray-100 transition",
                                      pathname === subItem.url
                                        ? "bg-blue-100 text-blue-600"
                                        : ""
                                    )}
                                    onClick={() => isMobile && toggleSidebar()}
                                  >
                                    {subItem.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </>
                      ) : (
                        // Menu không có submenu
                        <Link
                          href={
                            "url" in item && item.url
                              ? item.url
                              : "/" +
                                item.title.toLowerCase().replace(/ /g, "-")
                          }
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-black hover:bg-gray-100 transition",
                            pathname ===
                              ("url" in item && item.url
                                ? item.url
                                : "/" +
                                  item.title.toLowerCase().replace(/ /g, "-"))
                              ? "bg-blue-100 text-blue-600"
                              : ""
                          )}
                          onClick={() => isMobile && toggleSidebar()}
                        >
                          <item.icon className="size-6 shrink-0" />
                          <span>{item.title}</span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
