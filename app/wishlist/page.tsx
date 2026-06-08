"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  async function fetchWishlist() {
    setLoading(true);

    const { data } = await supabase
      .from("wishlist")
      .select("*")
      .order("id", { ascending: false });

    setWishlist(data || []);
    setLoading(false);
  }

  async function removeItem(id: number) {
    await supabase
      .from("wishlist")
      .delete()
      .eq("id", id);

    fetchWishlist();
  }

  async function moveToCart(item: any) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please Login First");
      return;
    }

    await supabase
      .from("cart")
      .insert([
        {
          user_id: user.id,
          product_id: item.product_id,
          title: item.title,
          image: item.image,
          price: item.price,
          quantity: 1,
        },
      ]);

    alert("Added To Cart 🛒");
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-7xl mx-auto p-8">

        <h1 className="text-5xl font-bold mb-10">
          Wishlist ❤️
        </h1>

        {loading ? (
          <div className="bg-white p-8 rounded-xl shadow">
            Loading Wishlist...
          </div>
        ) : wishlist.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10">
            <p className="text-xl">
              No Wishlist Items Found ❤️
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">

            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-60 object-cover"
                />

                <div className="p-4">

                  <h2 className="text-xl font-bold">
                    {item.title}
                  </h2>

                  <p className="text-green-600 text-2xl font-bold mt-2">
                    ₹{item.price}
                  </p>

                  <div className="flex gap-2 mt-4">

                    <button
                      onClick={() =>
                        moveToCart(item)
                      }
                      className="flex-1 bg-slate-900 text-white py-2 rounded-lg"
                    >
                      Add To Cart
                    </button>

                    <button
                      onClick={() =>
                        removeItem(item.id)
                      }
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                    >
                      Remove
                    </button>

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}