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
      <NextTopLoader color="#5750F1" showSpinner={false} />

      <div className="flex min-h-screen bg-white text-gray-900 overflow-hidden">
        <Sidebar />

        {/* Content Wrapper */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />

          <main className="flex-1 p-4 overflow-x-hidden">
            <div className="w-full max-w-full">{children}</div>
          </main>
        </div>
      </div>
    </AdminProviders>
  );
}
