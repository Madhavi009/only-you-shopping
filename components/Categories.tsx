export default function CategoriesSection() {
  const categories = [
    {
      name: "Fashion",
      image: "/image/fashion.jpg",
    },
    {
      name: "Beauty",
      image: "/image/beauty.jpg",
    },
    {
      name: "Electronics",
      image: "/image/electronics.jpg",
    },
    {
      name: "Sports",
      image: "/image/sports.jpg",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto py-12 md:py-20 px-4 md:px-6">
      
      <h2 className="text-3xl md:text-6xl font-bold mb-3 text-center">
        Shop By Categories
      </h2>

      <p className="text-center text-gray-500 mb-10 md:mb-12">
        Explore our premium collections
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-xl transition duration-300"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-56 md:h-72 object-cover"
            />

            <div className="p-5 md:p-6">
              <h3 className="text-xl md:text-2xl font-bold">
                {cat.name}
              </h3>

              <button className="mt-4 w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition">
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}