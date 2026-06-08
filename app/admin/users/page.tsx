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

      <div>
        <h1 className="text-4xl font-bold">
          Users
        </h1>

        <p className="text-gray-500 mt-2">
          Manage all registered users
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold">
          Total Users: {users.length}
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow overflow-auto">

        <table className="w-full">
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
                className="border-b"
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
                    className={`px-3 py-1 rounded-lg ${getRoleColor(
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
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
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
                  className="text-center p-10 text-gray-500"
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