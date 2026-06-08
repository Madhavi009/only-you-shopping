import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="h-[700px] bg-cover bg-center flex items-center"
      style={{
        backgroundImage: "url('/image/fashion-banner.jpg')",
      }}
    >
      <div className="bg-black/50 w-full h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 text-white">
          <h1 className="text-7xl font-bold mb-6">
            Only You Shopping
          </h1>

          <p className="text-2xl mb-8">
            Fashion • Beauty • Electronics • Sports
          </p>

          <a
            href="/products"
            className="bg-white text-black px-8 py-4 rounded-xl"
          >
            Shop Now
          </a>
        </div>
      </div>
    </section>
  );
}