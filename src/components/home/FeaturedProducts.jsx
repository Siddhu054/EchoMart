import { motion } from "framer-motion";
import ProductCard from "../product/ProductCard";
import { products } from "../../data/products";

const FeaturedProducts = () => {
  // Select featured products with high ratings
  const featuredProducts = products
    .filter((product) => product.rating >= 4.7) // Only products with high ratings
    .sort((a, b) => b.rating - a.rating) // Sort by rating
    .slice(0, 8); // Take top 8 products

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8"
        >
          Featured Products
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * product.id }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
