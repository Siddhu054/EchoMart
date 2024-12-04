import { motion } from "framer-motion";
import { ShoppingCartIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative group">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover transform transition-transform group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white bg-primary px-4 py-2 rounded-md">
              View Details
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-primary">
              ${product.price}
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className="p-2 rounded-full bg-secondary text-white hover:bg-opacity-90"
            >
              <ShoppingCartIcon className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
