export default function footer() {
  return (
    <footer className="bg-slate-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-8 py-12 grid md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Only You
          </h2>

          <p className="text-gray-300">
            Your favorite shopping destination for
            Fashion, Beauty, Electronics and Lifestyle
            products.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-xl mb-3">
            Quick Links
          </h3>

          <div className="space-y-2">
            <a href="/" className="block hover:text-gray-300">
              Home
            </a>

            <a href="/products" className="block hover:text-gray-300">
              Products
            </a>

            <a href="/categories" className="block hover:text-gray-300">
              Categories
            </a>

            <a href="/our-story" className="block hover:text-gray-300">
              Our Story
            </a>
          </div>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-bold text-xl mb-3">
            Support
          </h3>

          <div className="space-y-2">
            <p>Contact Us</p>
            <p>FAQ</p>
            <p>Shipping Policy</p>
            <p>Return Policy</p>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold text-xl mb-3">
            Contact
          </h3>

          <div className="space-y-2">
            <p>📧 support@onlyyou.com</p>
            <p>📞 +91 9876543210</p>
            <p>📍 Hyderabad, India</p>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-700 text-center py-4 text-gray-400">
        © 2026 Only You. All Rights Reserved.
      </div>

    </footer>
  );
}