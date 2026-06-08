import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[650px] md:h-[700px] overflow-hidden">

      {/* Background Image */}
      <Image
        src="/image/fashion-banner.jpg"
        alt="Fashion Banner"
        fill
        priority
        className="object-contain md:object-cover object-bottom"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-start pt-6 md:pt-20">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-8">

          <div className="max-w-xl">

            <p className="uppercase tracking-[4px] text-sm md:text-lg mb-2 text-white font-semibold">
              Premium Shopping Experience
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight mb-3">
              Discover Your Style
            </h1>

            <p className="text-base md:text-2xl text-white mb-6">
              Fashion • Beauty • Electronics • Sports • Lifestyle
            </p>

            <div className="flex flex-col sm:flex-row gap-3">

              <a
                href="/products"
                className="bg-white text-black px-8 py-4 rounded-xl font-semibold text-center hover:bg-gray-200 transition"
              >
                Shop Now
              </a>

              <a
                href="/categories"
                className="border border-white text-white px-8 py-4 rounded-xl font-semibold text-center hover:bg-white hover:text-black transition"
              >
                Explore
              </a>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
}