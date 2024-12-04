import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { XIcon } from "@heroicons/react/outline";

const MobileNav = ({ isOpen, onClose }) => {
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Categories", path: "/categories" },
    { name: "Cart", path: "/cart" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            className="fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white z-50"
          >
            <div className="p-4 flex justify-between items-center border-b">
              <span className="text-xl font-bold">Menu</span>
              <button onClick={onClose} className="p-2">
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <nav className="p-4">
              <ul className="space-y-4">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className="block py-2 text-lg hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
