"use client";

import { SidebarProvider } from "@/components/layout_admin/sidebar/sidebar-context";
import { ThemeProvider } from "next-themes";

export function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <SidebarProvider>{children}</SidebarProvider>
    </ThemeProvider>
  );
}
