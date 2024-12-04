import { motion } from "framer-motion";
import {
  ShoppingBagIcon,
  UsersIcon,
  CurrencyDollarIcon,
  TrendingUpIcon,
} from "@heroicons/react/outline";
import AdminLayout from "../../components/layout/AdminLayout";

const Dashboard = () => {
  const stats = [
    {
      name: "Total Sales",
      value: "$24,567",
      change: "+12%",
      icon: CurrencyDollarIcon,
    },
    {
      name: "Active Orders",
      value: "45",
      change: "+5%",
      icon: ShoppingBagIcon,
    },
    {
      name: "New Customers",
      value: "245",
      change: "+18%",
      icon: UsersIcon,
    },
    {
      name: "Growth",
      value: "12%",
      change: "+2%",
      icon: TrendingUpIcon,
    },
  ];

  const recentOrders = [
    {
      id: "ORD123",
      customer: "John Doe",
      date: "2024-02-22",
      amount: 299.99,
      status: "Processing",
    },
    // Add more orders...
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button className="px-4 py-2 bg-primary text-white rounded-md">
            Generate Report
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-green-500 text-sm font-medium">
                  {stat.change}
                </span>
                <span className="text-gray-500 text-sm ml-2">
                  vs last month
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${order.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
