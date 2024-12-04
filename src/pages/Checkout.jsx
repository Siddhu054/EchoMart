import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    shipping: {
      fullName: user?.name || "",
      email: user?.email || "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
    payment: {
      cardNumber: "",
      cardName: "",
      expiry: "",
      cvv: "",
    },
  });

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    // Here we'll integrate payment processing
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setStep(3);
      clearCart();
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Progress Steps */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? "bg-primary text-white" : "bg-gray-200"
            }`}
          >
            1
          </div>
          <div
            className={`w-20 h-1 ${step >= 2 ? "bg-primary" : "bg-gray-200"}`}
          />
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? "bg-primary text-white" : "bg-gray-200"
            }`}
          >
            2
          </div>
          <div
            className={`w-20 h-1 ${step >= 3 ? "bg-primary" : "bg-gray-200"}`}
          />
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 3 ? "bg-primary text-white" : "bg-gray-200"
            }`}
          >
            3
          </div>
        </div>
      </div>

      {/* Checkout Steps */}
      <div className="max-w-3xl mx-auto">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
            <form onSubmit={handleShippingSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.shipping.fullName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shipping: {
                          ...formData.shipping,
                          fullName: e.target.value,
                        },
                      })
                    }
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.shipping.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shipping: {
                          ...formData.shipping,
                          email: e.target.value,
                        },
                      })
                    }
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                {/* Add more shipping fields */}
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded hover:bg-primary-dark"
              >
                Continue to Payment
              </button>
            </form>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={formData.payment.cardNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        payment: {
                          ...formData.payment,
                          cardNumber: e.target.value,
                        },
                      })
                    }
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                {/* Add more payment fields */}
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded hover:bg-primary-dark"
              >
                Place Order
              </button>
            </form>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-6 rounded-lg shadow-md text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Order Confirmed!</h2>
            <p className="text-gray-600 mb-6">
              Your order has been placed successfully. You will receive an email
              confirmation shortly.
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="px-6 py-2 bg-primary text-white rounded hover:bg-primary-dark"
            >
              Continue Shopping
            </button>
          </motion.div>
        )}

        {/* Order Summary */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
