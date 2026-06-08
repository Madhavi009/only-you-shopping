"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data } = await supabase
      .from("users")
      .select("*")
      .order("id", { ascending: false });

    setUsers(data || []);
  }

  async function deleteUser(id: number) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    await supabase
      .from("users")
      .delete()
      .eq("id", id);

    fetchUsers();
  }

  function getRoleColor(role: string) {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-700";

      case "user":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  return (
    <div className="space-y-6">

      {/* HERO */}
      <div className="bg-gradient-to-r from-[#081534] via-[#132a56] to-[#30486d] rounded-3xl p-6 md:p-10 text-white shadow-xl">

        <p className="tracking-[4px] text-pink-300 text-sm">
          USER MANAGEMENT
        </p>

        <h1 className="text-3xl md:text-5xl font-bold mt-2">
          Users
        </h1>

        <p className="text-gray-300 mt-2 text-sm md:text-base">
          Manage all registered users
        </p>

      </div>

      {/* STATS */}
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg">

        <h2 className="text-xl md:text-2xl font-bold">
          Total Users: {users.length}
        </h2>

      </div>

      {/* USERS TABLE */}
      <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">

        <table className="w-full min-w-[900px]">

          <thead>

            <tr className="border-b bg-gray-50">

              <th className="p-4 text-left">
                ID
              </th>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Phone
              </th>

              <th className="p-4 text-left">
                Role
              </th>

              <th className="p-4 text-left">
                Joined
              </th>

              <th className="p-4 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  {user.id}
                </td>

                <td className="p-4 font-medium">
                  {user.name}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4">
                  {user.phone}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${getRoleColor(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </span>

                </td>

                <td className="p-4">

                  {user.created_at
                    ? new Date(
                        user.created_at
                      ).toLocaleDateString()
                    : "N/A"}

                </td>

                <td className="p-4">

                  <button
                    onClick={() =>
                      deleteUser(user.id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-3 md:px-4 py-2 rounded-lg text-sm"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

            {users.length === 0 && (

              <tr>

                <td
                  colSpan={7}
                  className="text-center p-6 md:p-10 text-gray-500"
                >
                  No Users Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}