"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSubCategories();
  }, []);

  async function fetchProducts() {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    setProducts(data || []);
  }

  async function fetchCategories() {
    const { data } = await supabase
      .from("categories")
      .select("*");

    setCategories(data || []);
  }

  async function fetchSubCategories() {
    const { data } = await supabase
      .from("sub_categories")
      .select("*");

    setSubCategories(data || []);
  }

  async function deleteProduct(id: number) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    await supabase
      .from("products")
      .delete()
      .eq("id", id);

    fetchProducts();
  }

  const filteredProducts = products.filter(
    (product) =>
      product.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* HERO */}
   <div className="bg-gradient-to-r from-[#081534] via-[#132a56] to-[#30486d] rounded-3xl p-6 md:p-10 text-white shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">

  <div>
    <p className="tracking-[4px] text-pink-300 text-sm">
      INVENTORY MANAGEMENT
    </p>

    <h1 className="text-3xl md:text-6xl font-bold mt-2">
      Products
    </h1>

    <p className="mt-3 text-gray-300 text-sm md:text-lg">
      Manage inventory, stock levels and product catalog
    </p>
  </div>

  <a href="/admin/products/add" className="w-full md:w-auto">
    <button className="w-full md:w-auto bg-white text-black font-bold px-6 py-3 md:px-8 md:py-4 rounded-2xl shadow-lg hover:scale-105 transition">
      + Add Product
    </button>
  </a>

</div>

      {/* STATS */}
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <p className="text-gray-500">
            Total Products
          </p>

          <h2 className="text-2xl md:text-5xl font-bold mt-3">
            {products.length}
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <p className="text-gray-500">
            Categories
          </p>

          <h2 className="text-2xl md:text-5xl font-bold mt-3">
            {categories.length}
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <p className="text-gray-500">
            Sub Categories
          </p>

          <h2 className="text-2xl md:text-5xl font-bold mt-3">
            {subCategories.length}
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <p className="text-gray-500">
            Search Results
          </p>

          <h2 className="text-5xl font-bold mt-3">
            {filteredProducts.length}
          </h2>
        </div>

      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-3xl shadow-lg p-6">

        <input
          type="text"
          placeholder="🔍 Search Products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full border p-4 rounded-2xl"
        />

      </div>
<div className="flex flex-col gap-6">

  {filteredProducts.map((product) => (

    <div
      key={product.id}
className="bg-white rounded-3xl shadow-lg p-4 md:p-6 flex flex-col md:flex-row gap-6 items-center hover:shadow-xl transition"    >

      <img
        src={product.image}
        alt={product.title}
className="w-full md:w-40 h-56 md:h-40 object-cover rounded-2xl"      />

      <div className="flex-1">

        <h2 className="text-xl md:text-2xl font-bold">
          {product.title}
        </h2>

        <p className="text-gray-500 mt-2">
          {product.description}
        </p>

       <div className="flex flex-wrap gap-6 mt-4">

  <div>
    <p className="text-gray-500">
      Price
    </p>

    <p className="text-green-600 text-2xl md:text-3xl font-bold">
      ₹{product.price}
    </p>
  </div>

  <div>
    <p className="text-gray-500">
      Stock
    </p>

    <p className="text-xl md:text-2xl font-bold">
      {product.stock}
    </p>
  </div>

</div>

      </div>

    <div className="flex flex-col gap-3">

  <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl">
    Edit
  </button>

  <button
    onClick={() =>
      deleteProduct(product.id)
    }
    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl"
  >
    Delete
  </button>

</div>

    </div>

  ))}

</div>

      {filteredProducts.length === 0 && (
        <div className="bg-white rounded-3xl shadow-lg p-10 text-center">

          <h2 className="text-2xl font-bold">
            No Products Found
          </h2>

        </div>
      )}

    </div>
  );
}