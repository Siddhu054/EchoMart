import { useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="relative flex-1 max-w-xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search for products..."
          className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-800"
        />
        <SearchIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
      </div>
    </div>
  );
};

export default SearchBar;
