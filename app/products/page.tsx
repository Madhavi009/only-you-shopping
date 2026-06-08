"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

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

    const { error } = await supabase.from("cart").insert([
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

    const { error } = await supabase.from("wishlist").insert([
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

  const filteredProducts = products.filter((product) =>
    product.title?.toLowerCase().includes(search.toLowerCase()),
  );

  async function shareProduct(product: any) {
  const productUrl =
    window.location.origin +
    `/product/${product.id}`;

  if (navigator.share) {
    await navigator.share({
      title: product.title,
      text: product.description,
      url: productUrl,
    });
  } else {
    await navigator.clipboard.writeText(
      productUrl
    );

    alert("Product link copied 🔗");
  }
}

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div
        className="relative rounded-[40px] overflow-hidden mb-12 h-[500px]"
        style={{
          backgroundImage: "url('/ld.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-gradient-to-r from-black/30 to-transparent h-full flex items-center">
          <div className="px-12 md:px-20">
            <p className="text-black-600 text-lg tracking-[8px] uppercase mb-4">
              Premium Collection
            </p>

            <h1 className="text-6xl md:text-7xl font-bold text-white">
              Discover Products
            </h1>

            <p className="text-white text-xl mt-6 max-w-3xl">
              Explore Fashion, Beauty, Electronics, Lifestyle and Trending
              Products from our premium collection.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">
        <div className="inline-flex items-center gap-2 bg-white border shadow-md px-4 py-2 rounded-full">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span className="text-sm font-semibold text-gray-700">
            {filteredProducts.length} Products
          </span>
        </div>

        <input
          type="text"
          placeholder="🔍 Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
      w-full
      lg:w-96
      px-6
      py-4
      rounded-3xl
      border
      shadow-lg
      focus:outline-none
    "
        />
      </div>
      {/* Products */}
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="
    group
    bg-white
    rounded-[35px]
    overflow-hidden
    shadow-lg
    hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]
    hover:-translate-y-3
    transition-all
    duration-500
    border border-gray-100
    "
          >
            <div className="relative overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="
        w-full
        h-80
        object-cover
        group-hover:scale-110
        transition-all
        duration-700
        "
              />

              <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow">
                30% OFF
              </div>
<button
  onClick={() => addToWishlist(product)}
  className="
  absolute
  top-4
  right-4
  text-2xl
  hover:scale-125
  transition-all
  duration-300
  "
>
  ♥
</button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <button className="bg-white text-black px-5 py-2 rounded-full shadow-lg font-medium">
                  Quick View
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                  PREMIUM
                </span>

                <span className="text-xs text-gray-500">
                  Stock {product.stock}
                </span>
              </div>

              <h2 className="text-xl font-bold text-gray-900 line-clamp-1">
                {product.title}
              </h2>

              <p className="text-sm text-gray-500 mt-2 line-clamp-2 min-h-[40px]">
                {product.description}
              </p>

              <div className="flex items-center mt-3">
          <span className="text-sm text-yellow-500">⭐⭐⭐⭐⭐</span>

                <span className="text-sm text-gray-500 ml-2">(4.9)</span>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <p className="text-1xl font-extrabold text-black">
                  ₹{product.price}
                </p>

                <p className="line-through text-gray-400">
                  ₹{Math.round(product.price * 1.3)}
                </p>
              </div>

              <p className="text-green-600 text-sm mt-1 font-medium">
                🚚 Free Shipping
              </p>
  <div className="flex gap-3 mt-6">

  <button
    onClick={() => addToCart(product)}
    className="
    flex-1
    bg-gradient-to-r
    from-black
    to-slate-800
    text-white
    py-3
    rounded-2xl
    text-sm
    font-semibold
    hover:scale-95
    transition
    "
  >
    Add To Cart
  </button>

  <button
    onClick={() => shareProduct(product)}
    className="
    w-14
    flex
    items-center
    justify-center
    bg-blue-50
    border
    border-blue-200
    rounded-2xl
    text-lg
    hover:bg-blue-100
    transition
    "
  >
    🔗
  </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="bg-white p-16 rounded-3xl shadow text-center mt-10">
          <h2 className="text-4xl font-bold">No Products Found</h2>

          <p className="text-gray-500 mt-3">Try another search.</p>
        </div>
      )}
    </div>
  );
}
