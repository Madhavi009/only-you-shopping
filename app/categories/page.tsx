"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    const { data } = await supabase
      .from("categories")
      .select("*")
      .order("id");

    setCategories(data || []);

    if (data && data.length > 0) {
      setSelectedCategory(data[0]);
      loadProducts(data[0].id);
    }
  }

  async function loadProducts(categoryId: number) {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("category_id", categoryId);

    setProducts(data || []);
  }

  async function addToCart(product: any) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please Login First");
      return;
    }

    const { error } = await supabase
      .from("cart")
      .insert([
        {
          user_id: user.id,
          product_id: product.id,
          title: product.title,
          image: product.image,
          price: product.price,
          quantity: 1,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Added To Cart 🛒");
  }

  async function addToWishlist(product: any) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please Login First");
      return;
    }

    const { data: existing } = await supabase
      .from("wishlist")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_id", product.id)
      .maybeSingle();

    if (existing) {
      alert("Already In Wishlist ❤️");
      return;
    }

    const { error } = await supabase
      .from("wishlist")
      .insert([
        {
          user_id: user.id,
          product_id: product.id,
          title: product.title,
          image: product.image,
          price: product.price,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Added To Wishlist ❤️");
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6">

        {/* LEFT SIDEBAR */}
        <div className="w-full lg:w-80">

          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat);
                loadProducts(cat.id);
              }}
              className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer mb-4 transition ${
                selectedCategory?.id === cat.id
                  ? "bg-slate-900 text-white"
                  : "bg-white shadow"
              }`}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-16 h-16 rounded-xl object-cover"
              />

              <div>
                <h3 className="font-bold text-lg md:text-xl">
                  {cat.name}
                </h3>

                <p className="text-sm opacity-70">
                  Explore Collection
                </p>
              </div>
            </div>
          ))}

        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full lg:flex-1">

          {/* Banner */}
          {selectedCategory && (
            <div className="relative mb-10">

              <Image
                src="/shop.jpg"
                alt="Category Banner"
                width={1920}
                height={1080}
                className="w-full h-[220px] md:h-[350px] rounded-3xl object-cover"
              />

              <div className="absolute inset-0 bg-black/30 rounded-3xl flex items-center">

                <div className="pl-6 md:pl-16 text-white">

                  <p className="text-pink-300 tracking-widest text-xs md:text-base mb-2">
                    PREMIUM COLLECTION
                  </p>

                  <h1 className="text-3xl md:text-7xl font-bold">
                    {selectedCategory.name}
                  </h1>

                </div>

              </div>

            </div>
          )}

          {/* PRODUCTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl shadow overflow-hidden hover:shadow-xl transition"
              >

                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 object-cover"
                />

                <div className="p-5">

                  <h2 className="text-xl md:text-2xl font-bold">
                    {product.title}
                  </h2>

                  <p className="text-gray-500 mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  <p className="text-green-600 font-bold text-2xl mt-3">
                    ₹{product.price}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-2 mt-4">

                    <button
                      onClick={() => addToCart(product)}
                      className="bg-slate-900 text-white px-4 py-2 rounded-xl hover:bg-black"
                    >
                      Add To Cart
                    </button>

                    <button
                      onClick={() => addToWishlist(product)}
                      className="bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-600"
                    >
                      ❤️ Wishlist
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}