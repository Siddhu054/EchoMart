import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { XIcon } from "@heroicons/react/outline";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { items, total, removeFromCart, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-8">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Link
          to="/products"
          className="inline-block bg-primary text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-primary font-bold">${item.price}</p>
                <div className="flex items-center mt-2">
                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                    className="border rounded-md px-2 py-1"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <XIcon className="h-5 w-5 text-gray-500" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Link
              to="/checkout"
              className="block w-full bg-secondary text-white text-center py-3 rounded-md font-semibold hover:bg-opacity-90"
            >
              Proceed to Checkout
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
