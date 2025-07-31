import { useState } from "react";
import { FaCamera, FaSearch, FaUser, FaCog, FaBars } from "react-icons/fa";
import SelectCategory from "./SelectCategory";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Link} from "react-router-dom";

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
      <div className="w-full bg-white shadow relative z-10 flex flex-col lg:flex-row justify-between items-center px-4 py-3 lg:gap-5 gap-3">
        {/* Logo Section with Icons */}
        <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-normal">
          {/* Menu Icon (show only on small/medium screens) */}
          <button className="text-gray-600 hover:text-orange-600 transition-colors lg:hidden">
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2 text-orange-600 text-2xl font-bold whitespace-nowrap">
            <FaCamera className="text-3xl" />
            <h1>camera shop</h1>
          </div>

          {/* User Icon (show only on small/medium screens) */}
          <button className="text-gray-600 hover:text-orange-600 transition-colors lg:hidden">
            <Link to="/login">  <FaUser className="text-xl" /> </Link>
          </button>
        </div>

        {/* Search Section - Hidden on small screens */}
        <div className="hidden lg:flex flex-1 items-center w-full lg:max-w-2xl">
          <div className="flex items-center border border-orange-300 rounded-full w-full overflow-visible text-sm px-2 py-1 bg-white">
            <input
                type="text"
                placeholder="Search for products"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="flex-1 px-3 py-2 outline-none text-sm text-gray-700 bg-transparent"
            />

            <div className="w-full max-w-[180px]">
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

        {/* Support Info - Hidden on small/medium screens */}
        <div className="hidden lg:flex">
          <div className="flex flex-row items-center text-black">
            <div className="text-center lg:text-left">
              <p className="text-sm">Your Support</p>
              <p className="text-sm text-orange-500">+20023924362</p>
            </div>

            <div className="hidden lg:block w-px h-8 bg-orange-400 mx-4"></div>

            <div className="text-center lg:text-left">
              <p className="text-sm">Worldwide</p>
              <p className="text-sm text-orange-500">Shipping</p>
            </div>
          </div>
        </div>

        {/* Mobile Search - Show only on small/medium screens */}
        <div className="lg:hidden w-full">
          <div className="flex items-center border border-orange-300 rounded-full w-full overflow-visible text-sm px-2 py-1 bg-white">
            <input
                type="text"
                placeholder="Search products..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="flex-1 px-3 py-2 outline-none text-sm text-gray-700 bg-transparent"
            />
            <button
                onClick={handleSearch}
                className="ml-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 transition-all duration-200"
            >
              <FaSearch className="text-base" />
            </button>
          </div>
        </div>

        <ToastContainer position="top-center" />
      </div>
  );
};

export default Navbar;