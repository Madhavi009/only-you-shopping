"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("id", { ascending: false });

    if (!error) {
      setOrders(data || []);
    }
  }

  async function updateStatus(
    id: number,
    status: string
  ) {
    await supabase
      .from("orders")
      .update({ status })
      .eq("id", id);

    fetchOrders();
  }

  async function deleteOrder(id: number) {
    const confirmDelete = confirm(
      "Delete Order?"
    );

    if (!confirmDelete) return;

    await supabase
      .from("orders")
      .delete()
      .eq("id", id);

    fetchOrders();
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
    <div className="space-y-6">

      {/* HERO */}
      <div className="bg-gradient-to-r from-[#081534] via-[#132a56] to-[#30486d] rounded-3xl p-6 md:p-10 text-white shadow-xl">

        <p className="tracking-[4px] text-pink-300 text-sm">
          ORDER MANAGEMENT
        </p>

        <h1 className="text-3xl md:text-5xl font-bold mt-2">
          Orders
        </h1>

        <p className="text-gray-300 mt-2 text-sm md:text-base">
          Manage all customer orders
        </p>

      </div>

      {/* STATS */}
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg">

        <h2 className="text-xl md:text-2xl font-bold">
          Total Orders: {orders.length}
        </h2>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">

        <table className="w-full min-w-[1200px]">

          <thead>

            <tr className="border-b bg-gray-50">

              <th className="p-4 text-left">
                ID
              </th>

              <th className="p-4 text-left">
                Customer
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Phone
              </th>

              <th className="p-4 text-left">
                Address
              </th>

              <th className="p-4 text-left">
                Amount
              </th>

              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr
                key={order.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  #{order.id}
                </td>

                <td className="p-4 font-medium">
                  {order.user_name}
                </td>

                <td className="p-4">
                  {order.email}
                </td>

                <td className="p-4">
                  {order.phone}
                </td>

                <td className="p-4 max-w-xs">
                  {order.address}
                </td>

                <td className="p-4 font-bold text-green-600">
                  ₹{order.total_amount}
                </td>

                <td className="p-4">
                  {order.created_at
                    ? new Date(
                        order.created_at
                      ).toLocaleDateString()
                    : "N/A"}
                </td>

                <td className="p-4">

                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(
                        order.id,
                        e.target.value
                      )
                    }
                    className={`px-3 py-2 rounded-lg border text-sm ${getStatusColor(
                      order.status
                    )}`}
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Processing">
                      Processing
                    </option>

                    <option value="Shipped">
                      Shipped
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>

                    <option value="Cancelled">
                      Cancelled
                    </option>

                  </select>

                </td>

                <td className="p-4">

                  <button
                    onClick={() =>
                      deleteOrder(order.id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-3 md:px-4 py-2 rounded-lg text-sm"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

            {orders.length === 0 && (

              <tr>

                <td
                  colSpan={9}
                  className="text-center p-6 md:p-10 text-gray-500"
                >
                  No Orders Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}