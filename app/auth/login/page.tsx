"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function loginUser(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Login Successful 🎉");

    router.push("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 flex items-center justify-center p-6">

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
              Welcome Back
            </p>

            <h1 className="text-6xl font-extrabold mt-4 leading-tight">
              Only You
            </h1>

            <p className="text-xl mt-6 text-gray-200">
              Discover Fashion, Beauty,
              Electronics and Lifestyle
              Products.
            </p>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 md:p-14 flex flex-col justify-center">

          <div className="mb-10">

            <h1 className="text-5xl font-extrabold text-slate-900">
              Sign In
            </h1>

            <p className="text-gray-500 mt-3">
              Login to continue shopping
            </p>

          </div>

          <form
            onSubmit={loginUser}
            className="space-y-5"
          >

            <div>

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

            <div>

              <div className="flex justify-between mb-2">

                <label className="text-sm font-semibold text-gray-600">
                  Password
                </label>

                <button
                  type="button"
                  className="text-pink-500 text-sm font-medium"
                >
                  Forgot Password?
                </button>

              </div>

              <input
                type="password"
                placeholder="Enter Password"
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
                ? "Signing In..."
                : "LOGIN NOW"}
            </button>

          </form>

          {/* REGISTER SECTION */}
          <div className="mt-8 text-center">

            <p className="text-gray-600">
              Don't have an account?
            </p>

            <a
              href="/auth/register"
              className="inline-block mt-2 text-pink-600 font-bold hover:underline"
            >
              Register Now
            </a>

          </div>

          {/* ADMIN LOGIN */}
          <div className="mt-8 border-t pt-6 text-center">

          </div>

        </div>

      </div>

    </div>
  );
}