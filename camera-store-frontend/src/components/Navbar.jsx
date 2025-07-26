import { useState } from "react";
import { FaCamera, FaSearch, FaUser, FaCog } from "react-icons/fa";
import SelectCategory from "./SelectCategory";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearch = () => {
    if (!searchText.trim()) {
      toast.error("Please fill out the search field");
      return;
    }
    if (!selectedCategory || selectedCategory === "SELECT CATEGORY") {
      toast.error("Please select a category");
      return;
    }
    toast.success(`Searching for "${searchText}" in "${selectedCategory}"...`);
  };

  return (
    <div className="w-full bg-white shadow relative z-0 flex flex-col md:flex-row justify-between items-center px-4 py-3 md:gap-5 gap-3">
      {/* Logo Section with Icons */}
      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-normal">
        {/* Settings Icon - Left of Logo */}
        <button className="text-gray-600 hover:text-orange-600 transition-colors">
          <FaCog className="text-xl" />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 text-orange-600 text-2xl font-bold whitespace-nowrap">
          <FaCamera className="text-3xl" />
          <h1>camera shop</h1>
        </div>

        {/* User Icon - Right of Logo */}
        <button className="text-gray-600 hover:text-orange-600 transition-colors">
          <FaUser className="text-xl" />
        </button>
      </div>

      {/* Search Section */}
      <div className="flex-1 flex items-center w-full md:max-w-2xl">
        <div className="flex items-center border border-orange-300 rounded-full w-full overflow-visible text-sm px-2 py-1 bg-white">
          <input
            type="text"
            placeholder="Search for products"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 px-3 py-2 outline-none text-sm text-gray-700 bg-transparent"
          />

          <div className="w-[150px] md:w-[180px]">
            <SelectCategory
              selected={selectedCategory}
              setSelected={setSelectedCategory}
            />
          </div>

          <button
            onClick={handleSearch}
            className="ml-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 transition-all duration-200"
          >
            <FaSearch className="text-base" />
          </button>
        </div>
      </div>

      {/* Empty div for spacing on desktop */}
      <div className="hidden md:block w-[60px]"></div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default Navbar;