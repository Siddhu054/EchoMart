import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "../components/product/ProductCard";
import ProductFilters from "../components/product/ProductFilters";
import ProductSort from "../components/product/ProductSort";
import { products, categories } from "../data/products";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: "all",
    rating: "all",
  });
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [productList, setProductList] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  useEffect(() => {
    if (categoryParam) {
      setFilters((prev) => ({
        ...prev,
        category: categoryParam.toLowerCase().replace(/[^a-z0-9]/g, ""),
      }));
      const filteredProducts = products.filter((product) => {
        const normalizedProductCategory = product.category
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "");
        const normalizedCategory = categoryParam
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "");
        return normalizedProductCategory === normalizedCategory;
      });
      setProductList(filteredProducts);
    }
  }, [categoryParam]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setFilters((prev) => ({
      ...prev,
      category: category,
    }));
    if (category === "all") {
      setProductList(products);
    } else {
      const filteredProducts = products.filter((product) => {
        const normalizedProductCategory = product.category
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "");
        const normalizedCategory = category
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "");
        return normalizedProductCategory === normalizedCategory;
      });
      setProductList(filteredProducts);
    }
  };

  const filterProducts = (products) => {
    return products.filter((product) => {
      if (
        filters.category !== "all" &&
        product.category.toLowerCase().replace(/[^a-z0-9]/g, "") !==
          filters.category.toLowerCase().replace(/[^a-z0-9]/g, "")
      ) {
        return false;
      }
      if (filters.priceRange !== "all") {
        const [min, max] = filters.priceRange.split("-").map(Number);
        if (product.price < min || product.price > max) {
          return false;
        }
      }
      if (filters.rating !== "all" && product.rating < Number(filters.rating)) {
        return false;
      }
      return true;
    });
  };

  const sortProducts = (products) => {
    switch (sortBy) {
      case "price-low":
        return [...products].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...products].sort((a, b) => b.price - a.price);
      case "rating":
        return [...products].sort((a, b) => b.rating - a.rating);
      default:
        return products;
    }
  };

  const displayProducts = sortProducts(filterProducts(productList));

  useEffect(() => {
    if (selectedCategory !== "all") {
      setFilters((prev) => ({
        ...prev,
        category: selectedCategory,
      }));
    }
  }, [selectedCategory]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Products</h1>
        <div className="flex items-center space-x-4">
          <ProductSort sortBy={sortBy} setSortBy={setSortBy} />
          <button
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden px-4 py-2 bg-gray-100 rounded-md"
          >
            Filters
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <ProductFilters filters={filters} setFilters={setFilters} />
        </div>

        {/* Products Grid */}
        <div className="flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (product.id % 4) }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          {displayProducts.length === 0 && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-600">
                No products found
              </h2>
              <p className="text-gray-500 mt-2">
                Try adjusting your filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters */}
      <ProductFilters
        filters={filters}
        setFilters={setFilters}
        isMobile
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </div>
  );
};

export default Products;
