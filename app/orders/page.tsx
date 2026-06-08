"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .order("id", { ascending: false });

    setOrders(data || []);
  }

  function getStatusColor(status: string) {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Processing":
        return "bg-blue-100 text-blue-700";

      case "Shipped":
        return "bg-purple-100 text-purple-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-10">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10">
            <p className="text-xl">No Orders Found 📦</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow p-6">
                <div className="flex justify-between items-center mb-5">
                  <div>
                    <h2 className="text-2xl font-bold">Order Details</h2>

                    <p className="text-gray-500 text-sm">
                      Track your order status and delivery details
                    </p>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-lg ${getStatusColor(
                      order.status,
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p>
                      <strong>Name:</strong> {order.user_name}
                    </p>

                    <p>
                      <strong>Email:</strong> {order.email}
                    </p>

                    <p>
                      <strong>Phone:</strong> {order.phone}
                    </p>
                  </div>

                  <div>
                    <p>
                      <strong>Total:</strong> ₹{order.total_amount}
                    </p>

                    <p>
                      <strong>Date:</strong>{" "}
                      {order.created_at
                        ? new Date(order.created_at).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            },
                          )
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <strong>Delivery Address:</strong>

                  <p className="text-gray-600 mt-2">{order.address}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="bg-white rounded-xl shadow p-6 mt-6">
          <h2 className="text-2xl font-bold">Total Orders: {orders.length}</h2>
        </div>
      </div>
    </div>
  );
}
