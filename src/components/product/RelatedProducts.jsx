import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

const RelatedProducts = ({ currentProductId, category }) => {
  // Mock related products (replace with actual API call)
  const relatedProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      category: "Electronics",
      rating: 4.5,
      reviews: 128,
    },
    // Add more products...
  ];

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts
          .filter((product) => product.id !== currentProductId)
          .slice(0, 4)
          .map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
