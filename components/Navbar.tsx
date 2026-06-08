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
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    const { count: wishlist } = await supabase
      .from("wishlist")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    setCartCount(cart || 0);
    setWishlistCount(wishlist || 0);
  }

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">

        <div className="flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
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
            <a href="/">Home</a>
            <a href="/products">Products</a>
            <a href="/categories">Categories</a>
            <a href="/our-story">Our Story</a>
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <a
                href="/auth/login"
                className="bg-slate-900 text-white px-6 py-2 rounded-lg"
              >
                Sign In
              </a>
            ) : (
              <>
                <a href="/wishlist" className="relative">
                  <Heart />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </a>

                <a href="/cart" className="relative">
                  <ShoppingBag />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </a>

                <a href="/orders">
                  <Package />
                </a>

                <a href="/profile">
                  <User />
                </a>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden mt-4 border-t pt-4 flex flex-col gap-4">

            <a href="/">Home</a>
            <a href="/products">Products</a>
            <a href="/categories">Categories</a>
            <a href="/our-story">Our Story</a>

            {!user ? (
              <a
                href="/auth/login"
                className="bg-slate-900 text-white px-4 py-2 rounded-lg text-center"
              >
                Sign In
              </a>
            ) : (
              <div className="flex gap-6 pt-2">
                <a href="/wishlist">
                  <Heart />
                </a>

                <a href="/cart">
                  <ShoppingBag />
                </a>

                <a href="/orders">
                  <Package />
                </a>

                <a href="/profile">
                  <User />
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}