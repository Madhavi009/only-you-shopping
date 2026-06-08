"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Heart,
  ShoppingBag,
  Package,
  User,
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);

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
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">

        {/* Top Navbar */}
        <div className="flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
              <span className="text-white font-bold">OY</span>
            </div>

            <div>
              <h1 className="font-black text-lg md:text-2xl">
                ONLY YOU
              </h1>

              <p className="text-[8px] uppercase tracking-[3px] text-gray-500">
                Premium Lifestyle
              </p>
            </div>

          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 font-medium">

            <a href="/" className="hover:text-blue-600 transition">
              Home
            </a>

            <a href="/products" className="hover:text-blue-600 transition">
              Products
            </a>

            <a href="/categories" className="hover:text-blue-600 transition">
              Categories
            </a>

            <a href="/our-story" className="hover:text-blue-600 transition">
              Our Story
            </a>

          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-5">

            {!user ? (
              <a
                href="/auth/login"
                className="bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800 transition"
              >
                Sign In
              </a>
            ) : (
              <>
                <a href="/wishlist" className="relative">
                  <Heart size={22} />

                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </a>

                <a href="/cart" className="relative">
                  <ShoppingBag size={22} />

                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </a>

                <a href="/orders">
                  <Package size={22} />
                </a>

                <a href="/profile">
                  <User size={22} />
                </a>
              </>
            )}

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenu && (

          <div className="md:hidden mt-4 bg-white rounded-2xl shadow-xl border overflow-hidden">

            <a
              href="/"
              className="block px-5 py-4 border-b hover:bg-gray-50"
              onClick={() => setMobileMenu(false)}
            >
              🏠 Home
            </a>

            <a
              href="/products"
              className="block px-5 py-4 border-b hover:bg-gray-50"
              onClick={() => setMobileMenu(false)}
            >
              🛍️ Products
            </a>

            <a
              href="/categories"
              className="block px-5 py-4 border-b hover:bg-gray-50"
              onClick={() => setMobileMenu(false)}
            >
              📂 Categories
            </a>

            <a
              href="/our-story"
              className="block px-5 py-4 border-b hover:bg-gray-50"
              onClick={() => setMobileMenu(false)}
            >
              📖 Our Story
            </a>

            {!user ? (

              <div className="p-4">
                <a
                  href="/auth/login"
                  className="block w-full text-center bg-black text-white py-3 rounded-xl"
                >
                  Sign In
                </a>
              </div>

            ) : (

              <div className="flex justify-around p-5">

                <a
                  href="/wishlist"
                  className="flex flex-col items-center"
                >
                  <Heart size={22} />
                  <span className="text-xs mt-1">Wishlist</span>
                </a>

                <a
                  href="/cart"
                  className="flex flex-col items-center"
                >
                  <ShoppingBag size={22} />
                  <span className="text-xs mt-1">Cart</span>
                </a>

                <a
                  href="/orders"
                  className="flex flex-col items-center"
                >
                  <Package size={22} />
                  <span className="text-xs mt-1">Orders</span>
                </a>

                <a
                  href="/profile"
                  className="flex flex-col items-center"
                >
                  <User size={22} />
                  <span className="text-xs mt-1">Profile</span>
                </a>

              </div>

            )}

          </div>

        )}

      </div>
    </nav>
  );
}