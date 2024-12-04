import { motion } from "framer-motion";
import ProductCard from "../product/ProductCard";

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    },
    {
      id: 3,
      name: "Premium Camera",
      price: 599.99,
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
    },
    {
      id: 4,
      name: "Laptop Pro",
      price: 1299.99,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    },
  ];

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
          {products.map((product) => (
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
