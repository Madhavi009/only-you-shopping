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
    <section className="max-w-7xl mx-auto py-20 px-6">
      <h2 className="text-6xl font-bold mb-12 text-center">
        Shop By Category
      </h2>

      <div className="grid md:grid-cols-4 gap-8">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-xl transition"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-72 object-cover"
            />

            <div className="p-6">
              <h3 className="text-2xl font-bold">
                {cat.name}
              </h3>

              <button className="mt-4 bg-black text-white px-5 py-2 rounded-xl">
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}