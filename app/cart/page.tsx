"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
    const { data } = await supabase
      .from("cart")
      .select("*")
      .order("id");

    setCart(data || []);

    let sum = 0;

    data?.forEach((item) => {
      sum += item.price * item.quantity;
    });

    setTotal(sum);
  }

  async function removeItem(id: number) {
    await supabase
      .from("cart")
      .delete()
      .eq("id", id);

    fetchCart();
  }

  async function updateQuantity(
    id: number,
    quantity: number
  ) {
    if (quantity < 1) return;

    await supabase
      .from("cart")
      .update({ quantity })
      .eq("id", id);

    fetchCart();
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-7xl mx-auto p-4 md:p-8">

        <h1 className="text-3xl md:text-5xl font-bold mb-8">
          Shopping Cart
        </h1>

        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="w-full min-w-[700px]">

            <thead>
              <tr className="border-b bg-gray-50">

                <th className="p-4 text-left">
                  Image
                </th>

                <th className="p-4 text-left">
                  Product
                </th>

                <th className="p-4 text-left">
                  Price
                </th>

                <th className="p-4 text-left">
                  Quantity
                </th>

                <th className="p-4 text-left">
                  Subtotal
                </th>

                <th className="p-4 text-left">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>

              {cart.map((item) => (
                <tr
                  key={item.id}
                  className="border-b"
                >

                  <td className="p-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
                    />
                  </td>

                  <td className="p-4 font-medium">
                    {item.title}
                  </td>

                  <td className="p-4">
                    ₹{item.price}
                  </td>

                  <td className="p-4">

                    <div className="flex items-center gap-3">

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity - 1
                          )
                        }
                        className="bg-gray-200 px-3 py-1 rounded"
                      >
                        -
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity + 1
                          )
                        }
                        className="bg-gray-200 px-3 py-1 rounded"
                      >
                        +
                      </button>

                    </div>

                  </td>

                  <td className="p-4 font-semibold">
                    ₹{item.price * item.quantity}
                  </td>

                  <td className="p-4">

                    <button
                      onClick={() =>
                        removeItem(item.id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Remove
                    </button>

                  </td>

                </tr>
              ))}

              {cart.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center p-12 text-lg"
                  >
                    Cart is Empty 🛒
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

        <div className="bg-white shadow rounded-xl p-6 mt-6 flex flex-col md:flex-row gap-4 justify-between items-center">

          <h2 className="text-2xl md:text-3xl font-bold">
            Total: ₹{total}
          </h2>

          <a
            href="/checkout"
            className="w-full md:w-auto"
          >
            <button className="w-full md:w-auto bg-[#081534] hover:bg-slate-800 text-white px-8 py-3 rounded-lg">
              Proceed To Checkout
            </button>
          </a>

        </div>

      </div>

    </div>
  );
}