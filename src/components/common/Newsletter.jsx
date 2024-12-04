import { useState } from "react";
import { motion } from "framer-motion";
import { MailIcon } from "@heroicons/react/outline";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <MailIcon className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">
            Subscribe to our Newsletter
          </h2>
          <p className="text-gray-600 mb-8">
            Stay updated with our latest products and exclusive offers!
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-2 border rounded-md"
              />
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 bg-primary text-white rounded-md ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-primary-dark"
                }`}
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
            {status === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-green-600"
              >
                Thank you for subscribing!
              </motion.p>
            )}
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-red-600"
              >
                Something went wrong. Please try again.
              </motion.p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
