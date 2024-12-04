import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SearchIcon, FilterIcon, XIcon } from "@heroicons/react/outline";
import ProductCard from "../product/ProductCard";

const SearchResults = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: "all",
    sortBy: "relevance",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock categories and price ranges
  const categories = ["Electronics", "Fashion", "Home", "Books"];
  const priceRanges = [
    { label: "Under $50", value: "0-50" },
    { label: "$50 - $100", value: "50-100" },
    { label: "$100 - $200", value: "100-200" },
    { label: "Over $200", value: "200+" },
  ];

  // Mock search function (replace with actual API call)
  const searchProducts = async (searchQuery, searchFilters) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock results
      const mockResults = [
        {
          id: 1,
          name: "Wireless Headphones",
          price: 199.99,
          category: "Electronics",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
          rating: 4.5,
          reviews: 128,
        },
        // Add more mock products...
      ];

      setResults(mockResults);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      searchProducts(query, filters);
    }
  }, [query, filters]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Bar */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border rounded-md"
          />
          <SearchIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="p-2 border rounded-md hover:bg-gray-50"
        >
          <FilterIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-4 rounded-md shadow-md mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Price Range
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) =>
                  setFilters({ ...filters, priceRange: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="all">All Prices</option>
                {priceRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium mb-2">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters({ ...filters, sortBy: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </motion.div>
      )}

      {/* Results */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-500">Searching...</p>
        </div>
      ) : query ? (
        <div>
          <p className="mb-4 text-gray-600">
            {results.length} results for "{query}"
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SearchResults;
