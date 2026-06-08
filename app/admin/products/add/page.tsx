"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imagePreview, setImagePreview] =
    useState<string | null>(null);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setImagePreview(
        URL.createObjectURL(file)
      );
    }
  };

  const handleSubmit = () => {
    alert("Product Created Successfully");
  };

  return (
    <div className="max-w-7xl mx-auto py-8">

      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-3xl p-8 mb-8 shadow-xl flex justify-between items-center">

        <div>
          <h1 className="text-5xl font-bold">
            Add New Product
          </h1>

          <p className="mt-3 text-lg text-gray-300">
            Create and manage products for your store.
          </p>
        </div>

        <button
          onClick={() =>
            router.push("/admin/products")
          }
          className="w-16 h-16 rounded-full bg-white/20 hover:bg-red-500 transition text-white text-4xl flex items-center justify-center"
        >
          ×
        </button>

      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Left Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-3xl font-bold mb-8">
            Product Information
          </h2>

          <div className="grid md:grid-cols-3 gap-4 mb-6">

            <select className="border p-4 rounded-xl">
              <option>Select Category</option>
              <option>Fashion</option>
              <option>Beauty</option>
              <option>Electronics</option>
              <option>Sports</option>
            </select>

            <select className="border p-4 rounded-xl">
              <option>Select Sub Category</option>
            </select>

            <select className="border p-4 rounded-xl">
              <option>Select Inner Category</option>
            </select>

          </div>

          <input
            type="text"
            placeholder="Product Name"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full border p-4 rounded-xl mb-4"
          />

          <div className="grid md:grid-cols-2 gap-4 mb-4">

            <input
              type="text"
              placeholder="Brand Name"
              value={brand}
              onChange={(e) =>
                setBrand(e.target.value)
              }
              className="border p-4 rounded-xl"
            />

            <input
              type="text"
              placeholder="SKU Code"
              value={sku}
              onChange={(e) =>
                setSku(e.target.value)
              }
              className="border p-4 rounded-xl"
            />

          </div>

          <textarea
            rows={6}
            placeholder="Product Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full border p-4 rounded-xl mb-6"
          />

          <div className="grid md:grid-cols-2 gap-4 mb-6">

            <input
              type="number"
              placeholder="Price ₹"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
              className="border p-4 rounded-xl"
            />

            <input
              type="number"
              placeholder="Stock Quantity"
              value={stock}
              onChange={(e) =>
                setStock(e.target.value)
              }
              className="border p-4 rounded-xl"
            />

          </div>

          <div className="border-2 border-dashed rounded-2xl p-8 text-center">

            <input
              type="file"
              onChange={handleImageChange}
              className="w-full"
            />

            <p className="text-gray-500 mt-3">
              Upload Product Image
            </p>

          </div>

          <button
            onClick={handleSubmit}
            className="mt-8 bg-slate-900 hover:bg-black text-white px-10 py-4 rounded-2xl font-semibold"
          >
            Create Product
          </button>

        </div>

        {/* Right Preview */}
        <div className="bg-white rounded-3xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            Product Preview
          </h2>

          <div className="border rounded-2xl overflow-hidden">

            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-72 object-cover"
              />
            ) : (
              <div className="h-72 flex items-center justify-center bg-gray-100">
                No Image
              </div>
            )}

            <div className="p-5">

              <h3 className="text-2xl font-bold">
                {title || "Product Name"}
              </h3>

              <p className="text-gray-500 mt-2">
                {description ||
                  "Product description preview"}
              </p>

              <div className="mt-4 flex justify-between">

                <span className="text-green-600 text-2xl font-bold">
                  ₹{price || "0"}
                </span>

                <span className="font-semibold">
                  Stock: {stock || "0"}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}