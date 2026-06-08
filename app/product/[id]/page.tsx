"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  async function fetchProduct() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", params.id)
      .single();

    if (!error) {
      setProduct(data);
    }
  }

  async function addToCart() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please Login First");
      return;
    }

    await supabase.from("cart").insert([
      {
        user_id: user.id,
        product_id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        quantity: 1,
      },
    ]);

    alert("Added To Cart 🛒");
  }

  async function addToWishlist() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please Login First");
      return;
    }

    await supabase.from("wishlist").insert([
      {
        user_id: user.id,
        product_id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
      },
    ]);

    alert("Added To Wishlist ❤️");
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

        {/* Product Image */}
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full rounded-3xl shadow-lg object-cover"
          />
        </div>

        {/* Product Details */}
        <div>

          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            Premium Product
          </span>

          <h1 className="text-3xl md:text-5xl font-bold mt-4">
            {product.title}
          </h1>

          <div className="flex items-center gap-3 mt-4">
            <h2 className="text-2xl md:text-4xl text-green-600 font-bold">
              ₹{product.price}
            </h2>

            <p className="line-through text-gray-400">
              ₹{Math.round(product.price * 1.3)}
            </p>
          </div>

          <div className="mt-4 text-yellow-500 text-lg">
            ⭐⭐⭐⭐⭐
            <span className="text-gray-500 text-sm ml-2">
              (4.9 Rating)
            </span>
          </div>

          <p className="text-gray-600 mt-6 leading-7">
            {product.description}
          </p>

          <div className="mt-6">
            <p className="font-semibold">
              Stock Available:
              <span className="text-green-600 ml-2">
                {product.stock}
              </span>
            </p>
          </div>

          <p className="text-green-600 mt-3 font-medium">
            🚚 Free Shipping Available
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">

            <button
              onClick={addToCart}
              className="bg-black hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Add To Cart
            </button>

            <button
              onClick={addToWishlist}
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl font-semibold"
            >
              ❤️ Wishlist
            </button>

            <button
              onClick={() => router.push("/checkout")}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Buy Now
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}