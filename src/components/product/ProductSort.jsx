const ProductSort = ({ sortBy, setSortBy }) => {
  return (
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="p-2 border rounded-md"
    >
      <option value="featured">Featured</option>
      <option value="price-low">Price: Low to High</option>
      <option value="price-high">Price: High to Low</option>
      <option value="rating">Highest Rated</option>
    </select>
  );
};

export default ProductSort;
