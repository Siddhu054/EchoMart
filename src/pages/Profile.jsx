import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  UserIcon,
  ShoppingBagIcon,
  HeartIcon,
  LocationMarkerIcon,
  CogIcon,
} from "@heroicons/react/outline";
import { useAuth } from "../context/AuthContext";
import UserLayout from "../components/layout/UserLayout";

const Profile = () => {
  const { user } = useAuth();

  const stats = [
    { label: "Orders", value: 12 },
    { label: "Wishlist", value: 5 },
    { label: "Reviews", value: 8 },
    { label: "Points", value: 1250 },
  ];

  const quickLinks = [
    {
      icon: ShoppingBagIcon,
      label: "My Orders",
      path: "/profile/orders",
      description: "Track and manage your orders",
    },
    {
      icon: HeartIcon,
      label: "Wishlist",
      path: "/profile/wishlist",
      description: "Products you've saved",
    },
    {
      icon: LocationMarkerIcon,
      label: "Addresses",
      path: "/profile/addresses",
      description: "Your shipping addresses",
    },
    {
      icon: CogIcon,
      label: "Settings",
      path: "/profile/settings",
      description: "Profile and preferences",
    },
  ];

  return (
    <UserLayout>
      {/* Profile Overview */}
      <div className="grid gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
              <UserIcon className="h-10 w-10 text-gray-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user?.name}</h1>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-sm text-gray-500">Member since 2024</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-4 bg-gray-50 rounded-lg"
              >
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickLinks.map((link, index) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={link.path}
                className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <link.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{link.label}</h3>
                    <p className="text-gray-600">{link.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default Profile;
