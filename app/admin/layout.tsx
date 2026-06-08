"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [showSidebar, setShowSidebar] =
    useState(true);

  const hideSidebar =
    pathname === "/admin/login" ||
    pathname === "/admin/products/add";

  const isLoginPage =
    pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Sidebar */}
      {!hideSidebar && (
        <AdminSidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
      )}

      {/* Header */}
      {!hideSidebar && (
        <AdminHeader
          showSidebar={showSidebar}
        />
      )}

      {/* Main Content */}
      <main
        className={`transition-all duration-300 pt-20 ${
          !hideSidebar
            ? showSidebar
              ? "ml-60"
              : "ml-16"
            : ""
        }`}
      >
        <div className="p-8">
          {children}
        </div>
      </main>

    </div>
  );
}