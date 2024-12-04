import { motion } from "framer-motion";
import { ShoppingBagIcon } from "@heroicons/react/outline";
import UserLayout from "../components/layout/UserLayout";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  // Mock orders data (replace with actual data from API)
  const orders = [
    {
      id: "ORD123456",
      date: "2024-02-20",
      total: 299.99,
      status: "Delivered",
      items: [
        {
          id: 1,
          name: "Wireless Headphones",
          price: 199.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        },
        // Add more items...
      ],
    },
    // Add more orders...
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <UserLayout>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Order History</h1>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBagIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600">
              No orders yet
            </h2>
            <p className="text-gray-500 mt-2">
              When you place an order, it will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border rounded-lg p-6"
              >
                <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                  <div>
                    <Link
                      to={`/profile/orders/${order.id}`}
                      className="text-lg font-semibold hover:text-primary"
                    >
                      Order #{order.id}
                    </Link>
                    <p className="text-gray-600">
                      Placed on {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">${order.total}</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 border-t pt-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-grow">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">${item.price}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default OrderHistory;
