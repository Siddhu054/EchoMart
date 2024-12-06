import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "@heroicons/react/outline";

const ProductFilters = ({ filters, setFilters, isMobile, isOpen, onClose }) => {
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "electronics", label: "Electronics" },
    { value: "fashion", label: "Fashion" },
    { value: "home", label: "Home & Living" },
    { value: "sports", label: "Sports" },
    { value: "stationery", label: "Stationery" },
  ];
  const priceRanges = [
    { label: "All", value: "all" },
    { label: "Under $100", value: "0-100" },
    { label: "$100 - $500", value: "100-500" },
    { label: "$500 - $1000", value: "500-1000" },
    { label: "Over $1000", value: "1000-999999" },
  ];
  const ratings = ["all", "4", "3", "2", "1"];

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Category</h3>
        <div className="space-y-2">
          {categories.map(({ value, label }) => (
            <label key={value} className="flex items-center">
              <input
                type="radio"
                name="category"
                value={value}
                checked={filters.category === value}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
                className="mr-2"
              />
              <span className="capitalize">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range.value} className="flex items-center">
              <input
                type="radio"
                name="priceRange"
                value={range.value}
                checked={filters.priceRange === range.value}
                onChange={(e) =>
                  setFilters({ ...filters, priceRange: e.target.value })
                }
                className="mr-2"
              />
              <span>{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Rating</h3>
        <div className="space-y-2">
          {ratings.map((rating) => (
            <label key={rating} className="flex items-center">
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={filters.rating === rating}
                onChange={(e) =>
                  setFilters({ ...filters, rating: e.target.value })
                }
                className="mr-2"
              />
              <span>
                {rating === "all" ? "All Ratings" : `${rating} Stars & Above`}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  if (isMobile) {
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
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed right-0 top-0 h-full w-80 bg-white z-50 p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <button onClick={onClose}>
                  <XIcon className="h-6 w-6" />
                </button>
              </div>
              <FilterContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <FilterContent />
    </div>
  );
};

export default ProductFilters;
