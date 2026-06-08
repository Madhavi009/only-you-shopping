"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SubCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);

  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  async function fetchCategories() {
    const { data } = await supabase
      .from("categories")
      .select("*")
      .order("id", { ascending: false });

    setCategories(data || []);
  }

  async function fetchSubCategories() {
    const { data } = await supabase
      .from("sub_categories")
      .select(
        `
        *,
        categories(name)
      `
      )
      .order("id", { ascending: false });

    setSubCategories(data || []);
  }

  async function addSubCategory() {
    if (!categoryId || !name || !image) {
      alert("Please Fill All Fields");
      return;
    }

    const fileName = `${Date.now()}-${image.name}`;

    const { error: uploadError } =
      await supabase.storage
        .from("sub-category-images")
        .upload(fileName, image);

    if (uploadError) {
      alert(uploadError.message);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("sub-category-images")
      .getPublicUrl(fileName);

    const { error } = await supabase
      .from("sub_categories")
      .insert([
        {
          category_id: Number(categoryId),
          name,
          image: publicUrl,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Sub Category Added Successfully ✅");

    setCategoryId("");
    setName("");
    setImage(null);

    fetchSubCategories();
  }

  async function deleteSubCategory(id: number) {
    const confirmDelete = confirm(
      "Delete Sub Category?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("sub_categories")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchSubCategories();
  }

  const filteredSubCategories =
    subCategories.filter((sub) =>
      sub.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="space-y-6">

      {/* HERO */}
      <div className="bg-gradient-to-r from-[#081534] via-[#132a56] to-[#30486d] rounded-3xl p-6 md:p-10 text-white shadow-xl">

        <p className="tracking-[4px] text-pink-300 text-sm">
          SUB CATEGORY MANAGEMENT
        </p>

        <h1 className="text-3xl md:text-5xl font-bold mt-2">
          Sub Categories
        </h1>

        <p className="text-gray-300 mt-2 text-sm md:text-base">
          Manage all sub categories and collections
        </p>

      </div>

      {/* STATS */}
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg">

        <h2 className="text-xl md:text-2xl font-bold">
          Total Sub Categories: {subCategories.length}
        </h2>

      </div>

      {/* ADD SUB CATEGORY */}
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          <select
            value={categoryId}
            onChange={(e) =>
              setCategoryId(e.target.value)
            }
            className="w-full border p-3 rounded-lg"
          >
            <option value="">
              Select Category
            </option>

            {categories.map((cat) => (
              <option
                key={cat.id}
                value={cat.id}
              >
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Sub Category Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="file"
            onChange={(e) =>
              setImage(
                e.target.files?.[0] || null
              )
            }
            className="w-full border p-3 rounded-lg"
          />

          <button
            onClick={addSubCategory}
            className="w-full bg-slate-900 text-white rounded-lg px-5 py-3"
          >
            Add Sub Category
          </button>

        </div>

        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="w-24 h-24 mt-4 rounded-lg object-cover border"
          />
        )}

      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-2xl shadow-lg p-4">

        <input
          type="text"
          placeholder="🔍 Search Sub Category..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full border p-3 rounded-xl"
        />

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">

        <table className="w-full min-w-[700px]">

          <thead>

            <tr className="border-b bg-gray-50">

              <th className="p-4 text-left">
                ID
              </th>

              <th className="p-4 text-left">
                Image
              </th>

              <th className="p-4 text-left">
                Category
              </th>

              <th className="p-4 text-left">
                Sub Category
              </th>

              <th className="p-4 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredSubCategories.map((sub) => (

              <tr
                key={sub.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  {sub.id}
                </td>

                <td className="p-4">

                  <img
                    src={sub.image}
                    alt={sub.name}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover border"
                  />

                </td>

                <td className="p-4">
                  {sub.categories?.name}
                </td>

                <td className="p-4 font-medium">
                  {sub.name}
                </td>

                <td className="p-4">

                  <button
                    onClick={() =>
                      deleteSubCategory(sub.id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-3 md:px-4 py-2 rounded-lg text-sm md:text-base"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

            {filteredSubCategories.length === 0 && (

              <tr>

                <td
                  colSpan={5}
                  className="text-center p-6 md:p-10 text-gray-500"
                >
                  No Sub Categories Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}