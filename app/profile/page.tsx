"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);
  }

  async function logout() {
    await supabase.auth.signOut();

    alert("Logged Out Successfully");

    window.location.href = "/";
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 md:py-10 px-4">

      <div className="max-w-4xl mx-auto">

        <div className="bg-white shadow-xl rounded-3xl p-6 md:p-10">

          {/* Header */}
          <div className="flex flex-col md:flex-row items-center md:items-center gap-6 mb-10">

            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-slate-900 text-white flex items-center justify-center text-3xl md:text-4xl font-bold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold">
                My Profile
              </h1>

              <p className="text-gray-500 mt-2">
                Manage your account details
              </p>
            </div>

          </div>

          {/* Profile Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="bg-gray-50 p-5 md:p-6 rounded-2xl">

              <p className="text-gray-500 text-sm">
                Email Address
              </p>

              <h2 className="text-lg md:text-xl font-semibold mt-2 break-all">
                {user?.email || "N/A"}
              </h2>

            </div>

            <div className="bg-gray-50 p-5 md:p-6 rounded-2xl">

              <p className="text-gray-500 text-sm">
                User ID
              </p>

              <h2 className="text-sm break-all mt-2">
                {user?.id || "N/A"}
              </h2>

            </div>

            <div className="bg-gray-50 p-5 md:p-6 rounded-2xl md:col-span-2">

              <p className="text-gray-500 text-sm">
                Last Sign In
              </p>

              <h2 className="text-base md:text-lg mt-2 break-words">
                {user?.last_sign_in_at
                  ? new Date(
                      user.last_sign_in_at
                    ).toLocaleString()
                  : "N/A"}
              </h2>

            </div>

          </div>

          {/* Logout Button */}
          <div className="mt-8 md:mt-10">

            <button
              onClick={logout}
              className="w-full md:w-auto bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-semibold"
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}