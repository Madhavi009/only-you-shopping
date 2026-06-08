export default function TrendingProducts() {
  const products = [
    {
      id: 1,
      title: "Premium T-Shirt",
      price: 999,
      image: "/image/Fashionn.avif",
      category: "Fashion",
    },
    {
      id: 2,
      title: "Sony Headphones",
      price: 2999,
      image: "/image/headphones.png",
      category: "Electronics",
    },
    {
      id: 3,
      title: "Smart Watch",
      price: 1999,
      image: "/image/watch.jpg",
      category: "Accessories",
    },
    {
      id: 4,
      title: "Sports Shoes",
      price: 2499,
      image: "/image/shoe.png",
      category: "Sports",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <div className="flex justify-between items-center mb-10">

        <div>
          <p className="text-pink-500 uppercase tracking-[5px] text-sm font-semibold">
            Trending Collection
          </p>

          <h2 className="text-4xl font-bold mt-2">
            Featured Products
          </h2>

          <p className="text-gray-500 mt-2">
            Most loved products by our customers
          </p>
        </div>

        <button className="border px-6 py-3 rounded-xl hover:bg-black hover:text-white transition">
          View All
        </button>

      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">

        {products.map((product) => (

          <div
            key={product.id}
            className="
            bg-white
            rounded-[30px]
            overflow-hidden
            shadow-lg
            hover:shadow-2xl
            hover:-translate-y-2
            transition
            duration-500
            group
            "
          >

            <div className="relative overflow-hidden">

              <img
                src={product.image}
                alt={product.title}
                className="
                w-full
                h-72
                object-cover
                group-hover:scale-110
                transition
                duration-700
                "
              />

              <div className="absolute top-2 left-2 bg-red-400 text-white px-0 next-error-h1py-0 rounded-full text-xs font-bold">
                25% OFF
              </div>

              <button
                className="
                absolute
                top-4
                right-4
                bg-white
                w-10
                h-10
                rounded-full
                shadow-lg
                "
              >
                ❤️
              </button>

            </div>

            <div className="p-5">

              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                {product.category}
              </span>

              <h3 className="font-bold text-lg mt-4">
                {product.title}
              </h3>

              <div className="flex items-center mt-2 text-yellow-500 text-sm">
                ⭐⭐⭐⭐⭐
                <span className="text-gray-500 ml-2">
                  (4.9)
                </span>
              </div>

              <div className="flex items-center gap-3 mt-4">

                <p className="text-green-600 font-bold text-1xl">
                  ₹{product.price}
                </p>

                <p className="text-gray-400 line-through">
                  ₹{Math.round(product.price * 1.3)}
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

