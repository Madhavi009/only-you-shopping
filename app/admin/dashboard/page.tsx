"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const router = useRouter();

  const [products, setProducts] = useState(0);
  const [categories, setCategories] = useState(0);
  const [orders, setOrders] = useState(0);
  const [users, setUsers] = useState(0);

  useEffect(() => {
    const isAdmin = localStorage.getItem("admin");

    if (!isAdmin) {
      router.push("/admin/login");
      return;
    }

    fetchCounts();
  }, []);

  async function fetchCounts() {
    const { count: productCount } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    const { count: categoryCount } = await supabase
      .from("categories")
      .select("*", { count: "exact", head: true });

    const { count: orderCount } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true });

    const { count: userCount } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true });

    setProducts(productCount || 0);
    setCategories(categoryCount || 0);
    setOrders(orderCount || 0);
    setUsers(userCount || 0);
  }
  return (
    <div className="w-full p-4 mt-2">
      {/* PAGE TITLE */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>

        <p className="text-sm text-gray-500 mt-1">Welcome to Admin Panel</p>
      </div>

      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-[#081534] via-[#10254d] to-[#203a6e] rounded-2xl p-6 text-white shadow-xl">
        <div className="flex justify-between items-center">
          <div>
            <p className="uppercase tracking-[3px] text-pink-300 text-xs">
              Command Center
            </p>

            <h1 className="text-xl font-bold mt-2">ONLY YOU LIFESTYLE</h1>

            <p className="text-gray-300 mt-2 text-sm">
              Welcome back Administrator 👋
            </p>
          </div>

          <div className="hidden md:block text-5xl">📊</div>
        </div>
      </div>

      {/* STATS */}

      <div className="grid md:grid-cols-4 gap-6 mt-8">
        <div className="bg-white p-6 rounded-3xl shadow-lg">
          <p className="text-gray-500">Products</p>
          <h2 className="text-3xl font-bold mt-3">{products}</h2>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-lg">
          <p className="text-gray-500">Categories</p>
          <h2 className="text-3xl font-bold mt-3">{categories}</h2>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-lg">
          <p className="text-gray-500">Orders</p>
          <h2 className="text-3xl font-bold mt-3">{orders}</h2>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-lg">
          <p className="text-gray-500">Users</p>
          <h2 className="text-3xl font-bold mt-3">{users}</h2>
        </div>
      </div>

      {/* QUICK ACTIONS */}

      <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>

        <div className="grid md:grid-cols-4 gap-4">
          <a
            href="/admin/products"
            className="bg-black text-white p-5 rounded-2xl text-center"
          >
            📦 Products
          </a>

          <a
            href="/admin/categories"
            className="bg-blue-600 text-white p-5 rounded-2xl text-center"
          >
            📂 Categories
          </a>

          <a
            href="/admin/orders"
            className="bg-green-600 text-white p-5 rounded-2xl text-center"
          >
            🛒 Orders
          </a>

          <a
            href="/admin/users"
            className="bg-purple-600 text-white p-5 rounded-2xl text-center"
          >
            👥 Users
          </a>
        </div>
      </div>

      {/* OVERVIEW */}

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="bg-white rounded-2xl shadow-lg p-5">
          <h2 className="text-lg font-bold mb-3">Recent Activity</h2>

          <div className="space-y-2">
            <div className="p-3 bg-gray-100 rounded-lg text-sm">
              New Order Received
            </div>

            <div className="p-3 bg-gray-100 rounded-lg text-sm">
              Product Added
            </div>

            <div className="p-3 bg-gray-100 rounded-lg text-sm">
              User Registered
            </div>
          </div>
        </div>

        <div className="bg-[#081534] text-white rounded-3xl shadow-lg p-6">
          <h2 className="text-lg font-bold mb-4">Store Overview</h2>

          <div className="space-y-3 text-sm">
            <p>📦 Total Products : {products}</p>

            <p>📂 Total Categories : {categories}</p>

            <p>🛒 Total Orders : {orders}</p>

            <p>👥 Total Users : {users}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
