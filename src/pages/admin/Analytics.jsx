import { useState } from "react";
import { motion } from "framer-motion";
import {
  Line,
  Bar,
  Doughnut,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import AdminLayout from "../../components/layout/AdminLayout";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("week");

  // Mock data for charts
  const salesData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Sales",
        data: [2100, 1800, 2400, 2800, 1900, 3200, 2900],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        fill: false,
      },
    ],
  };

  const categoryData = {
    labels: ["Electronics", "Fashion", "Home & Living", "Books", "Others"],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  const customerData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "New Customers",
        data: [65, 75, 85, 95, 110, 125],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  const stats = [
    {
      label: "Total Revenue",
      value: "$24,567",
      change: "+12.5%",
      isPositive: true,
    },
    {
      label: "Total Orders",
      value: "1,234",
      change: "+8.2%",
      isPositive: true,
    },
    {
      label: "Average Order Value",
      value: "$85.32",
      change: "-2.4%",
      isPositive: false,
    },
    {
      label: "Conversion Rate",
      value: "3.2%",
      change: "+1.1%",
      isPositive: true,
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Analytics</h1>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="year">Last Year</option>
          </select>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-sm font-medium text-gray-500">
                {stat.label}
              </h3>
              <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
              <div
                className={`mt-2 flex items-center text-sm ${
                  stat.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                <span>{stat.change}</span>
                <span className="ml-2 text-gray-500">vs last period</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Trend */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Sales Trend</h2>
            <Line
              data={salesData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
              }}
            />
          </div>

          {/* Category Distribution */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Sales by Category</h2>
            <Doughnut
              data={categoryData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "right",
                  },
                },
              }}
            />
          </div>

          {/* Customer Growth */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Customer Growth</h2>
            <Bar
              data={customerData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
              }}
            />
          </div>

          {/* Top Products */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Top Products</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-500">#{index}</span>
                    <div>
                      <p className="font-medium">Product Name {index}</p>
                      <p className="text-sm text-gray-500">
                        {Math.floor(Math.random() * 100)} sales
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">
                    ${(Math.random() * 1000).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Analytics;
