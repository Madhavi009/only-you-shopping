"use client";

import {
  LayoutDashboard,
  Layers,
  Tag,
  Package,
  ShoppingBag,
  Users,
  LogOut,
} from "lucide-react";

export default function AdminSidebar({
  showSidebar,
  setShowSidebar,
}: any) {
  const handleLogout = () => {
    localStorage.removeItem("admin");
    window.location.href = "/admin/login";
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* COLLAPSED SIDEBAR */}
      {!showSidebar && (
        <div className="fixed left-0 top-0 h-screen w-16 bg-white border-r shadow-sm z-50 flex flex-col items-center">

          <button
            onClick={() => setShowSidebar(true)}
            className="mt-4 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-lg hover:bg-gray-100"
          >
            ☰
          </button>

          <div className="flex flex-col items-center gap-6 mt-10 text-slate-500">

            <a href="/admin/dashboard">
              <LayoutDashboard size={20} />
            </a>

            <a href="/admin/categories">
              <Layers size={20} />
            </a>

            <a href="/admin/subcategories">
              <Tag size={20} />
            </a>

            <a href="/admin/products">
              <Package size={20} />
            </a>

            <a href="/admin/orders">
              <ShoppingBag size={20} />
            </a>

            <a href="/admin/users">
              <Users size={20} />
            </a>

            <button onClick={handleLogout}>
              <LogOut size={20} />
            </button>

          </div>

        </div>
      )}

      {/* FULL SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-screen w-72 md:w-60 bg-[#081534] text-white z-50 transition-all duration-300 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b border-slate-700">

          <div>

            <h1 className="text-xl font-bold tracking-wide">
              ONLY YOU
            </h1>

            <p className="text-[10px] uppercase tracking-[3px] text-slate-400">
              Admin Panel
            </p>

          </div>

          <button
            onClick={() => setShowSidebar(false)}
            className="text-2xl hover:text-red-400 transition"
          >
            ✕
          </button>

        </div>

        {/* MENU */}
        <nav className="flex flex-col gap-3 p-5 text-base">

          <a
            href="/admin/dashboard"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </a>

          <a
            href="/admin/categories"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
          >
            <Layers size={20} />
            Categories
          </a>

          <a
            href="/admin/subcategories"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
          >
            <Tag size={20} />
            Sub Categories
          </a>

          <a
            href="/admin/products"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
          >
            <Package size={20} />
            Products
          </a>

          <a
            href="/admin/orders"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
          >
            <ShoppingBag size={20} />
            Orders
          </a>

          <a
            href="/admin/users"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
          >
            <Users size={20} />
            Users
          </a>

        </nav>

        {/* LOGOUT */}
        <div className="absolute bottom-5 left-4 right-4">

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </aside>
    </>
  );
}