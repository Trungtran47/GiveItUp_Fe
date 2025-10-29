"use client";

import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { Sidebar } from "@/components/layout_admin/sidebar";
import { Header } from "@/components/layout_admin/header";
import { AdminProviders } from "@/app/admin/providers";
import "../globals.css";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <AdminProviders>
      {/* Thanh loader trên đầu trang */}
      <NextTopLoader color="#5750F1" showSpinner={false} />

      {/* Layout chính */}
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Nội dung chính */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <Header />

          {/* Main content */}
          <main className="flex-1 mx-auto w-full max-w-screen-2xl p-1!">
            {children}
          </main>
        </div>
      </div>
    </AdminProviders>
  );
}
