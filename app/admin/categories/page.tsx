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

      const { error: uploadError } =
        await supabase.storage
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

      <div>
        <h1 className="text-4xl font-bold">
          Categories
        </h1>

        <p className="text-gray-500 mt-2">
          Manage Categories
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold">
          Total Categories: {categories.length}
        </h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow flex flex-wrap gap-4">

        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-3 rounded-lg"
        />

        <input
          type="file"
          onChange={(e) =>
            setImage(e.target.files?.[0] || null)
          }
          className="border p-3 rounded-lg"
        />

        <button
          onClick={addCategory}
          className="bg-black text-white px-6 py-3 rounded-lg"
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

      <input
        type="text"
        placeholder="Search Category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border p-3 rounded-lg"
      />

      <div className="bg-white rounded-xl shadow overflow-auto">

        <table className="w-full">
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
                  .includes(
                    search.toLowerCase()
                  )
              )
              .map((cat) => (
                <tr
                  key={cat.id}
                  className="border-b"
                >
                  <td className="p-4">
                    {cat.id}
                  </td>

                  <td className="p-4">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-16 h-16 rounded-lg object-cover border"
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
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
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
                  className="text-center p-10 text-gray-500"
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