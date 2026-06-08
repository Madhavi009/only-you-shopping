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
    if (!product) return;

    await supabase.from("cart").insert([
      {
        product_id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        quantity: 1,
      },
    ]);

    alert("Added To Cart");
  }

  async function addToWishlist() {
    if (!product) return;

    await supabase.from("wishlist").insert([
      {
        product_id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
      },
    ]);

    alert("Added To Wishlist");
  }

  if (!product) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-10">
      <div className="grid md:grid-cols-2 gap-10">

        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full rounded-xl shadow"
          />
        </div>

        <div>
          <h1 className="text-5xl font-bold">
            {product.title}
          </h1>

          <h2 className="text-3xl text-green-600 font-bold mt-4">
            ₹{product.price}
          </h2>

          <p className="text-gray-600 mt-6">
            {product.description}
          </p>

          <p className="mt-4">
            Stock Available:
            <span className="font-bold ml-2">
              {product.stock}
            </span>
          </p>

          <div className="flex gap-4 mt-8">

            <button
              onClick={addToCart}
              className="bg-black text-white px-6 py-3 rounded-lg"
            >
              Add To Cart
            </button>

            <button
              onClick={addToWishlist}
              className="bg-pink-500 text-white px-6 py-3 rounded-lg"
            >
              ❤️ Wishlist
            </button>

            <button
              onClick={() =>
                router.push("/checkout")
              }
              className="bg-green-600 text-white px-6 py-3 rounded-lg"
            >
              Buy Now
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}