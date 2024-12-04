import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661",
      itemCount: 320,
    },
    {
      id: 2,
      name: "Fashion",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050",
      itemCount: 520,
    },
    {
      id: 3,
      name: "Home & Living",
      image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a",
      itemCount: 230,
    },
  ];

  return (
    <section className="py-12 bg-light">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8"
        >
          Shop by Category
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.id} to={`/category/${category.id}`}>
              <motion.div
                whileHover={{ y: -5 }}
                className="relative rounded-lg overflow-hidden shadow-lg group h-64"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transform transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                    <p className="text-sm opacity-90">
                      {category.itemCount} items
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
