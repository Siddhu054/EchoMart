import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ShoppingBagIcon,
  UsersIcon,
  ChartBarIcon,
  CogIcon,
  TagIcon,
} from "@heroicons/react/outline";

const AdminLayout = ({ children }) => {
  const { pathname } = useLocation();

  const menuItems = [
    { path: "/admin", icon: HomeIcon, label: "Dashboard" },
    { path: "/admin/products", icon: TagIcon, label: "Products" },
    { path: "/admin/orders", icon: ShoppingBagIcon, label: "Orders" },
    { path: "/admin/customers", icon: UsersIcon, label: "Customers" },
    { path: "/admin/analytics", icon: ChartBarIcon, label: "Analytics" },
    { path: "/admin/settings", icon: CogIcon, label: "Settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
            <div className="flex items-center flex-shrink-0 px-4">
              <span className="text-xl font-bold text-gray-800">
                Admin Panel
              </span>
            </div>
            <div className="mt-5 flex-grow flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        pathname === item.path
                          ? "bg-primary text-white"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <Icon
                        className={`mr-3 flex-shrink-0 h-6 w-6 ${
                          pathname === item.path
                            ? "text-white"
                            : "text-gray-400 group-hover:text-gray-500"
                        }`}
                      />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
