"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CategoriesPage() {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const { data } = await supabase
      .from("categories")
      .select("*")
      .order("id", { ascending: false });

    if (data) setCategories(data);
  }

  async function addCategory() {
    if (!name || !image) {
      alert("Enter category name and select image");
      return;
    }

    try {
      const fileName = `${Date.now()}-${image.name}`;

      const { error: uploadError } = await supabase.storage
        .from("category-images")
        .upload(fileName, image);

      if (uploadError) {
        alert(uploadError.message);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("category-images")
        .getPublicUrl(fileName);

      const { error } = await supabase
        .from("categories")
        .insert([
          {
            name,
            image: publicUrl,
          },
        ]);

      if (error) {
        alert(error.message);
        return;
      }

      alert("Category Added Successfully");

      setName("");
      setImage(null);

      fetchCategories();
    } catch (err: any) {
      alert(err.message);
    }
  }

  async function deleteCategory(id: number) {
    const confirmDelete = confirm(
      "Delete Category?"
    );

    if (!confirmDelete) return;

    await supabase
      .from("categories")
      .delete()
      .eq("id", id);

    fetchCategories();
  }

  return (
    <div className="space-y-6">

      {/* HERO */}
      <div className="bg-gradient-to-r from-[#081534] via-[#132a56] to-[#30486d] rounded-3xl p-6 md:p-10 text-white shadow-xl">

        <p className="tracking-[4px] text-pink-300 text-sm">
          CATEGORY MANAGEMENT
        </p>

        <h1 className="text-3xl md:text-5xl font-bold mt-2">
          Categories
        </h1>

        <p className="text-gray-300 mt-2 text-sm md:text-base">
          Manage Categories & Collections
        </p>

      </div>

      {/* STATS */}
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg">

        <h2 className="text-xl md:text-2xl font-bold">
          Total Categories: {categories.length}
        </h2>

      </div>

      {/* ADD CATEGORY */}
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg flex flex-col md:flex-row flex-wrap gap-4">

        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full md:flex-1 border p-3 rounded-lg"
        />

        <input
          type="file"
          onChange={(e) =>
            setImage(e.target.files?.[0] || null)
          }
          className="w-full md:w-auto border p-3 rounded-lg"
        />

        <button
          onClick={addCategory}
          className="w-full md:w-auto bg-black text-white px-6 py-3 rounded-lg"
        >
          Add Category
        </button>

        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="w-20 h-20 rounded-lg object-cover border"
          />
        )}

      </div>

      {/* SEARCH */}
      <div className="bg-white p-4 rounded-2xl shadow-lg">

        <input
          type="text"
          placeholder="🔍 Search Category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-3 rounded-xl"
        />

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">

        <table className="w-full min-w-[600px]">

          <thead>

            <tr className="border-b bg-gray-50">

              <th className="p-4 text-left">
                ID
              </th>

              <th className="p-4 text-left">
                Image
              </th>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {categories
              .filter((cat) =>
                cat.name
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((cat) => (

                <tr
                  key={cat.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4">
                    {cat.id}
                  </td>

                  <td className="p-4">

                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover border"
                    />

                  </td>

                  <td className="p-4 font-medium">
                    {cat.name}
                  </td>

                  <td className="p-4">

                    <button
                      onClick={() =>
                        deleteCategory(cat.id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-3 md:px-4 py-2 rounded-lg text-sm md:text-base"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            {categories.length === 0 && (

              <tr>

                <td
                  colSpan={4}
                  className="text-center p-6 md:p-10 text-gray-500"
                >
                  No Categories Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}