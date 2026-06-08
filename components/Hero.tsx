import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[500px] md:min-h-[700px] flex items-center overflow-hidden">

      {/* Background Image */}
      <Image
        src="/image/fashion-banner.jpg"
        alt="Fashion Banner"
        fill
        priority
        className="object-cover md:object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-white">

          <p className="uppercase tracking-[4px] text-sm md:text-lg mb-3">
            Premium Shopping Experience
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6">
            Discover Your Style
          </h1>

          <p className="text-lg md:text-2xl mb-8 max-w-2xl">
            Fashion • Beauty • Electronics • Sports • Lifestyle
          </p>

          <div className="flex flex-col sm:flex-row gap-4">

            <a
              href="/products"
              className="bg-white text-black px-8 py-4 rounded-xl font-semibold text-center hover:bg-gray-200 transition"
            >
              Shop Now
            </a>

            <a
              href="/categories"
              className="border border-white px-8 py-4 rounded-xl font-semibold text-center hover:bg-white hover:text-black transition"
            >
              Explore
            </a>

          </div>

        </div>
      </div>

    </section>
  );
}