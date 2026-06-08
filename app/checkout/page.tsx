"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function CheckoutPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCartTotal();
    loadUser();
  }, []);

  async function loadUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user?.email) {
      setEmail(user.email);
    }
  }

  async function fetchCartTotal() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("cart")
      .select("*")
      .eq("user_id", user.id);

    let sum = 0;

    data?.forEach((item) => {
      sum += item.price * item.quantity;
    });

    setTotal(sum);
  }

  async function placeOrder(e: any) {
    e.preventDefault();

    if (!name || !email || !phone || !address) {
      alert("Please fill all fields");
      return;
    }

    if (total === 0) {
      alert("Your cart is empty");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("orders")
      .insert([
        {
          user_id: user?.id,
          user_name: name,
          email,
          phone,
          address,
          total_amount: total,
          status: "Pending",
        },
      ]);

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    if (user) {
      await supabase
        .from("cart")
        .delete()
        .eq("user_id", user.id);
    }

    alert("Order Placed Successfully 🎉");

    router.push("/orders");
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Checkout
        </h1>

        <form
          onSubmit={placeOrder}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            type="email"
            placeholder="Email Address"
            readOnly
            className="w-full border p-3 rounded-lg bg-gray-100"
            value={email}
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="w-full border p-3 rounded-lg"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
          />

          <textarea
            rows={4}
            placeholder="Delivery Address"
            className="w-full border p-3 rounded-lg"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
          />

          <div className="bg-gray-100 p-5 rounded-xl">

            <h2 className="text-xl font-semibold">
              Order Summary
            </h2>

            <p className="text-3xl font-bold text-green-600 mt-3">
              ₹{total}
            </p>

          </div>

          <button
            type="submit"
            disabled={loading || total === 0}
            className="w-full bg-[#081534] hover:bg-slate-800 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading
              ? "Placing Order..."
              : "Place Order"}
          </button>

        </form>

      </div>

    </div>
  );
}