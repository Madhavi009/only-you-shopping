export default function OurStoryPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* HERO */}
      <section
        className="relative h-[70vh] flex items-center justify-center"
        style={{
          backgroundImage: "url('/our.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/0"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-6">
          <p className="uppercase tracking-[8px] text-black text-sm font-semibold mb-4">
            Welcome To Only You
          </p>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-black">
            Our Story
          </h1>

          <p className="text-lg md:text-2xl text-black">
            The Journey Behind Only You Shopping
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img
            src="ourstory.jpg"
            alt="Our Story"
            className="w-full max-h-[700px] object-contain rounded-3xl shadow-lg"
          />

          <div>
            <h2 className="text-5xl font-bold mb-6">Who We Are</h2>

            <p className="text-lg text-gray-600 mb-4">
              Only You Shopping is a modern e-commerce platform created to
              provide Fashion, Beauty, Electronics, Sports, Home & Lifestyle
              products.
            </p>

            <p className="text-lg text-gray-600">
              Our mission is to deliver premium quality products, affordable
              prices and a smooth shopping experience for every customer.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <div className="bg-white p-10 rounded-3xl shadow">
            <h2 className="text-4xl font-bold mb-4">🎯 Our Mission</h2>

            <p className="text-lg text-gray-600">
              To provide customers with the best online shopping experience
              through quality products, affordable pricing and excellent
              customer service.
            </p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow">
            <h2 className="text-4xl font-bold mb-4">🚀 Our Vision</h2>

            <p className="text-lg text-gray-600">
              To become India's most trusted online shopping destination by
              delivering innovation, convenience and customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 px-6">
          <div className="bg-white p-8 rounded-2xl shadow text-center">
            <h3 className="text-5xl font-bold">10K+</h3>
            <p>Customers</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow text-center">
            <h3 className="text-5xl font-bold">500+</h3>
            <p>Products</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow text-center">
            <h3 className="text-5xl font-bold">50+</h3>
            <p>Brands</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow text-center">
            <h3 className="text-5xl font-bold">24/7</h3>
            <p>Support</p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-12">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white shadow p-8 rounded-3xl">
              <h3 className="text-2xl font-bold mb-4">🚚 Fast Delivery</h3>

              <p>Quick delivery across India with secure shipping.</p>
            </div>

            <div className="bg-white shadow p-8 rounded-3xl">
              <h3 className="text-2xl font-bold mb-4">🔒 Secure Payments</h3>

              <p>Safe and trusted payment methods for every order.</p>
            </div>

            <div className="bg-white shadow p-8 rounded-3xl">
              <h3 className="text-2xl font-bold mb-4">⭐ Premium Quality</h3>

              <p>Carefully selected products from trusted brands.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="uppercase tracking-[6px] text-pink-500 font-semibold">
              Get In Touch
            </p>

            <h2 className="text-5xl font-extrabold mt-4">Contact Us</h2>

            <p className="text-gray-500 mt-4 text-lg">
              We'd love to hear from you. Reach out anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[35px] shadow-xl text-center hover:-translate-y-2 transition">
              <div className="text-5xl mb-4">📧</div>

              <h3 className="text-2xl font-bold mb-3">Email Us</h3>

              <p className="text-gray-600">support@onlyyou.com</p>
            </div>

            <div className="bg-white p-10 rounded-[35px] shadow-xl text-center hover:-translate-y-2 transition">
              <div className="text-5xl mb-4">📞</div>

              <h3 className="text-2xl font-bold mb-3">Call Us</h3>

              <p className="text-gray-600">+91 9876543210</p>
            </div>

            <div className="bg-white p-10 rounded-[35px] shadow-xl text-center hover:-translate-y-2 transition">
              <div className="text-5xl mb-4">📍</div>

              <h3 className="text-2xl font-bold mb-3">Location</h3>

              <p className="text-gray-600">Hyderabad, India</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
