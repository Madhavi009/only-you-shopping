"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Heart,
  ShoppingBag,
  Package,
  User,
} from "lucide-react";
// using plain anchor to avoid Link typing issues in this environment

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);

      if (session?.user) {
        fetchCounts(session.user.id);
      } else {
        setCartCount(0);
        setWishlistCount(0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function getUser() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setUser(session?.user || null);

    if (session?.user) {
      fetchCounts(session.user.id);
    }
  }

  async function fetchCounts(userId: string) {
    const { count: cart } = await supabase
      .from("cart")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", userId);

    const { count: wishlist } = await supabase
      .from("wishlist")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", userId);

    setCartCount(cart || 0);
    setWishlistCount(wishlist || 0);
  }

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-black to-gray-800 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">OY</span>
          </div>

          <div>
            <h1 className="text-1xl md:text-2xl font-black tracking-tight bg-gradient-to-r from-gray-800 via-gray-800 to-black bg-clip-text text-transparent">
              ONLY YOU
            </h1>

            <p className="text-[7px] uppercase tracking-[4px] text-gray-500">
              Premium Lifestyle
            </p>
          </div>
        </div>

        {/* MENU */}
        <div className="flex gap-8 font-medium text-lg">
          <a href="/" className="hover:text-blue-600">
            Home
          </a>

          <a href="/products" className="hover:text-blue-600">
            Products
          </a>

          <a href="/categories" className="hover:text-blue-600">
            Categories
          </a>

          <a href="/our-story" className="hover:text-blue-600">
            Our Story
          </a>
        </div>

        {/* RIGHT SIDE */}
        {!user ? (
          <a href="/auth/login" className="bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-black inline-flex items-center justify-center">
            Sign In
          </a>
        ) : (
         <div className="flex items-center gap-4">

  {/* Wishlist */}
  <a
    href="/wishlist"
    className="relative p-3 rounded-full bg-white shadow-md hover:shadow-xl transition"
  >
    <Heart size={22} className="text-slate-700" />

    {wishlistCount > 0 && (
      <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
        {wishlistCount}
      </span>
    )}
  </a>

  {/* Cart */}
  <a
    href="/cart"
    className="relative p-3 rounded-full bg-white shadow-md hover:shadow-xl transition"
  >
    <ShoppingBag size={22} className="text-slate-700" />

    {cartCount > 0 && (
      <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
        {cartCount}
      </span>
    )}
  </a>

  {/* Orders */}
  <a
    href="/orders"
    className="p-3 rounded-full bg-white shadow-md hover:shadow-xl transition"
  >
    <Package size={22} className="text-slate-700" />
  </a>

  {/* Profile */}
  <a
    href="/profile"
    className="p-3 rounded-full bg-white shadow-md hover:shadow-xl transition"
  >
    <User size={22} className="text-slate-700" />
  </a>

</div>
        )}
      </div>
    </nav>
  );
}
