"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function registerUser(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    const { error } =
      await supabase.auth.signUp({
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

    alert(
      "Registration Successful 🎉 Please Login"
    );

    router.push("/auth/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100 flex items-center justify-center p-6">

      <div className="w-full max-w-6xl bg-white rounded-[40px] shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div
          className="hidden lg:flex relative bg-cover bg-center items-center"
          style={{
            backgroundImage:
              "url('/image.png')",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>

          <div className="relative z-10 px-12 text-white">

            <p className="uppercase tracking-[8px] text-pink-300 text-sm font-semibold">
              Join Only You
            </p>

            <h1 className="text-6xl font-extrabold mt-4 leading-tight">
              Create Account
            </h1>

            <p className="text-xl mt-6 text-gray-200">
              Discover Fashion, Beauty,
              Electronics and Lifestyle
              Products.
            </p>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 md:p-14">

          <div className="mb-10">

            <h1 className="text-5xl font-extrabold">
              Register
            </h1>

            <p className="text-gray-500 mt-3">
              Create your shopping account
            </p>

          </div>

          <form onSubmit={registerUser}>

            <div className="mb-5">

              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter Full Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="
                w-full
                bg-slate-100
                p-4
                rounded-2xl
                outline-none
                border
                border-transparent
                focus:border-black
                "
                required
              />

            </div>

            <div className="mb-5">

              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="
                w-full
                bg-slate-100
                p-4
                rounded-2xl
                outline-none
                border
                border-transparent
                focus:border-black
                "
                required
              />

            </div>

            <div className="mb-6">

              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Create Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="
                w-full
                bg-slate-100
                p-4
                rounded-2xl
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
              py-4
              rounded-2xl
              font-bold
              tracking-wide
              hover:bg-gray-900
              transition
              "
            >
              {loading
                ? "Creating Account..."
                : "CREATE ACCOUNT"}
            </button>

          </form>

          <div className="mt-8 text-center">

            <p className="text-gray-600">
              Already have an account?
            </p>

            <a
              href="/auth/login"
              className="
              inline-block
              mt-2
              text-pink-600
              font-bold
              hover:underline
              "
            >
              Login Now
            </a>

          </div>

        </div>

      </div>

    </div>
  );
}