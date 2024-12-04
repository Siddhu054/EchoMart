import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const UserLayout = ({ children }) => {
  const { pathname } = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { path: "/profile", label: "Profile" },
    { path: "/profile/orders", label: "Orders" },
    { path: "/profile/wishlist", label: "Wishlist" },
    { path: "/profile/addresses", label: "Addresses" },
    { path: "/profile/settings", label: "Settings" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-600">
                  {user?.name?.[0]?.toUpperCase()}
                </span>
              </div>
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <p className="text-gray-600 text-sm">{user?.email}</p>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-2 rounded-md transition-colors ${
                    pathname === item.path
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
};

export default UserLayout;
