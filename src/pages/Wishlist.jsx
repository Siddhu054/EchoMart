import { motion } from "framer-motion";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { TrashIcon, ShoppingCartIcon } from "@heroicons/react/outline";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    removeFromWishlist(product.id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Your wishlist is empty</p>
          <a href="/products" className="text-primary hover:text-primary-dark">
            Continue Shopping
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-primary font-bold mb-4">${product.price}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark flex items-center justify-center space-x-2"
                  >
                    <ShoppingCartIcon className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
