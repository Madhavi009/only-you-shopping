"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function registerUser(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Registration Successful 🎉 Please Login");
    router.push("/auth/login");
  }

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-white to-purple-100 flex items-center justify-center p-4">

      <div className="w-full max-w-5xl bg-white rounded-[28px] shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div
          className="hidden lg:flex relative h-[520px] bg-cover bg-center items-center"
          style={{
            backgroundImage: "url('/image.png')",
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>

          <div className="relative z-10 px-10 text-white">

            <p className="uppercase tracking-[5px] text-pink-300 text-xs font-semibold">
              Join Only You
            </p>

            <h1 className="text-5xl font-extrabold mt-4">
              Create Account
            </h1>

            <p className="text-base mt-5 text-gray-200 max-w-sm leading-relaxed">
              Discover Fashion, Beauty, Electronics and Lifestyle Collections.
            </p>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-6 lg:p-8 flex flex-col justify-center">

          <div className="mb-5">

            <h1 className="text-5xl font-extrabold text-slate-900">
              Register
            </h1>

            <p className="text-gray-500 mt-2 text-sm">
              Create your shopping account
            </p>

          </div>

          <form onSubmit={registerUser} className="space-y-4">

            <div>

              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="
                w-full
                bg-slate-100
                p-3
                rounded-xl
                outline-none
                border
                border-transparent
                focus:border-black
                "
                required
              />

            </div>

            <div>

              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                w-full
                bg-slate-100
                p-3
                rounded-xl
                outline-none
                border
                border-transparent
                focus:border-black
                "
                required
              />

            </div>

            <div>

              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                w-full
                bg-slate-100
                p-3
                rounded-xl
                outline-none
                border
                border-transparent
                focus:border-black
                "
                required
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="
              w-full
              bg-black
              text-white
              py-3
              rounded-xl
              font-bold
              hover:bg-gray-900
              transition
              "
            >
              {loading
                ? "Creating Account..."
                : "CREATE ACCOUNT"}
            </button>

          </form>

          <div className="mt-5 text-center">

            <p className="text-gray-600 text-sm">
              Already have an account?
            </p>

            <a
              href="/auth/login"
              className="inline-block mt-2 text-pink-600 font-bold hover:underline"
            >
              Login Now
            </a>

          </div>

        </div>

      </div>

    </div>
  );
}