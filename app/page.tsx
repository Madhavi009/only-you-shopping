"use client";

import Link from "next/link";
import TrendingProducts from "@/components/TrendingProducts";
import Footer from "@/components/footer";

export default function HomePage() {
  const categories = [
    {
      name: "Fashion",
      image: "/image/Fashion.avif",
    },
    {
      name: "Beauty",
      image: "/image/beauty.webp",
    },
    {
      name: "Electronics",
      image: "/image/electronics.webp",
    },
    {
      name: "Sports",
      image: "/image/sports.jpg",
    },
  ];

  return (
    <main className="bg-gray-50">
      {/* HERO SECTION */}
     <section
  className="relative min-h-[650px] md:min-h-screen flex items-center"
  style={{
    backgroundImage: "url('/jtt.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "contain",
  }}
>
  <div className="absolute inset-0 bg-black/10"></div>

  <div className="relative z-10 w-full">
    <div className="max-w-7xl mx-auto px-6">

      <div className="max-w-2xl">

        <p className="uppercase tracking-[3px] text-black text-sm font-bold">
          Premium Shopping Experience
        </p>

        <h1 className="text-5xl md:text-7xl font-extrabold text-yellow-500 mt-4 leading-tight">
          Discover Your Style
        </h1>

        <p className="text-black text-lg md:text-xl font-bold mt-4">
          Fashion • Beauty • Electronics • Lifestyle
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">

          <a href="/products">
            <button className="bg-white text-black px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-gray-200 transition">
              Shop Now
            </button>
          </a>

          <a href="/categories">
            <button className="bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition">
              Explore
            </button>
          </a>

        </div>

      </div>

    </div>
  </div>
</section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Shop By Categories
        </h2>

        <p className="text-center text-gray-500 mt-2 mb-10">
          Explore our premium collections
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold">{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRENDING PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Trending Products
            </h2>

            <p className="text-gray-500 mt-2">
              Most loved products by customers
            </p>
          </div>

          <a href="/products">
            <button className="bg-slate-900 text-white px-6 py-3 rounded-xl">
              View All
            </button>
          </a>
        </div>

        <TrendingProducts />
      </section>

      {/* FLASH SALE */}
      <section className="py-20 bg-gradient-to-r from-black via-slate-900 to-black text-white">
        <div className="max-w-7xl mx-auto text-center px-6">
          <p className="uppercase tracking-[6px] text-pink-400 mb-3">
            Limited Time Offer
          </p>

          <h2 className="text-4xl md:text-5xl font-bold">Mega Sale</h2>

          <p className="text-xl mt-4">Up To 70% OFF On Selected Products</p>

          <a href="/products">
            <button className="mt-8 bg-white text-black px-8 py-3 rounded-xl font-semibold">
              Shop Deals
            </button>
          </a>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            Why Choose Only You
          </h2>

          <div className="grid md:grid-cols-4 gap-6 mt-12">
            <div className="bg-gray-50 p-8 rounded-3xl text-center shadow">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="font-semibold">Free Delivery</h3>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl text-center shadow">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="font-semibold">Secure Payment</h3>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl text-center shadow">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="font-semibold">Premium Quality</h3>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl text-center shadow">
              <div className="text-4xl mb-4">↩️</div>
              <h3 className="font-semibold">Easy Returns</h3>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Customer Reviews
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-8 rounded-3xl shadow">
            <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>

            <p className="mt-4 text-gray-600">
              Amazing products and fast delivery.
            </p>

            <p className="mt-4 font-semibold">- Madhavi</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow">
            <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>

            <p className="mt-4 text-gray-600">
              Excellent quality and customer support.
            </p>

            <p className="mt-4 font-semibold">- Customer</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow">
            <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>

            <p className="mt-4 text-gray-600">
              One of the best shopping experiences.
            </p>

            <p className="mt-4 font-semibold">- User</p>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 py-20 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Subscribe Newsletter
          </h2>

          <p className="mt-4">Get updates about offers and new arrivals</p>

          <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-5 py-4 rounded-xl text-black w-full md:w-96"
            />

            <button className="bg-black px-8 py-4 rounded-xl">Subscribe</button>
          </div>
        </div>
      </section>
    </main>
  );
}
