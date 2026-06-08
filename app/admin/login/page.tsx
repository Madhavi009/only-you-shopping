"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (
      email === "madhavimarri98@gmail.com" &&
      password === "12345678"
    ) {
      localStorage.setItem("admin", "true");
      window.location.href = "/admin/dashboard";
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-slate-600/70 flex items-center justify-center p-4">

      <div className="w-full max-w-5xl bg-white rounded-[30px] overflow-hidden shadow-2xl flex">

        {/* LEFT SIDE */}
        <div
          className="hidden lg:block w-1/2 relative bg-cover bg-center"
          style={{
            backgroundImage: "url('/only.webp')",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>

          <div className="absolute top-10 left-10 z-10">
            <h1 className="text-white text-3xl font-black leading-tight">
              THE
              <br />
              <span className="text-pink-500">
                BOUTIQUE
              </span>
              <br />
              EXPERIENCE.
            </h1>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 relative">

          <button className="absolute top-6 right-6 text-gray-300 text-3xl">
            ×
          </button>

          <h1 className="text-3xl md:text-3xl font-black text-slate-900 mb-8">
            SIGN IN
          </h1>

          <p className="text-xs font-bold uppercase text-slate-400 mb-2">
            Email
          </p>

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="
            w-full
            bg-slate-100
            rounded-xl
            p-3
            md:p-4
            outline-none
            mb-5
            "
          />

          <div className="flex justify-between items-center mb-2">

            <p className="text-xs font-bold uppercase text-slate-400">
              Password
            </p>

            <p className="text-pink-500 text-sm font-bold cursor-pointer">
              FORGOT?
            </p>

          </div>

          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
            w-full
            bg-slate-100
            rounded-xl
            p-3
            md:p-4
            outline-none
            mb-6
            "
          />

          <button
            onClick={handleLogin}
            className="
            w-full
            bg-black
            text-white
            py-3
            md:py-4
            rounded-xl
            font-bold
            tracking-[2px]
            hover:bg-gray-900
            transition
            "
          >
            ENTER ADMIN PANEL →
          </button>

          <div className="text-center mt-8">

            <p className="font-semibold">
              Admin Panel
            </p>

            <div className="w-24 h-1 bg-pink-500 mx-auto mt-2 rounded-full"></div>

          </div>

        </div>

      </div>

    </div>
  );
}