import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingCartIcon,
  MenuIcon,
  HeartIcon,
} from "@heroicons/react/outline";
import SearchBar from "../common/SearchBar";
import MobileNav from "./MobileNav";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items } = useCart();
  const { wishlist } = useWishlist();

  return (
    <header className="bg-primary text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <MenuIcon className="h-6 w-6" />
          </button>

          {/* Logo */}
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold"
            >
              EchoMart
            </motion.div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:block mx-8">
            <SearchBar />
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link to="/cart">
              <motion.div whileHover={{ scale: 1.1 }} className="relative">
                <ShoppingCartIcon className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-secondary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {items.length}
                </span>
              </motion.div>
            </Link>
            <Link
              to="/wishlist"
              className="relative p-2 text-gray-600 hover:text-primary"
            >
              <HeartIcon className="h-6 w-6" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="bg-white text-primary px-6 py-2 rounded-md font-medium"
            >
              Login
            </motion.button>
          </nav>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-4">
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
