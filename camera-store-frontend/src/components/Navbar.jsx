import { useState } from "react";
import { FaCamera, FaSearch } from "react-icons/fa";
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
    <div className="w-full bg-white shadow relative z-0 flex flex-col md:flex-row justify-between items-center px-4 py-2 gap-3 md:gap-0 overflow-visible">
      <div className="hidden md:block w-[60px]"></div>

      <div className="flex-1 flex flex-col md:flex-row items-center gap-3 md:gap-4 w-full overflow-visible">
        <div className="flex items-center gap-2 text-orange-600 text-2xl font-bold whitespace-nowrap">
          <FaCamera className="text-3xl" />
          <h1>camera shop</h1>
        </div>

        {/* Search Input + Select + Button */}
        <div className="flex items-center border border-orange-300 rounded-full w-full max-w-2xl overflow-visible text-sm relative z-50 px-2 py-1 bg-white">
          <input
            type="text"
            placeholder="Search for products"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 px-3 py-2 outline-none text-sm text-gray-700 bg-transparent"
          />

          <div className="w-[180px]">
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

      <div className="flex flex-col md:flex-row items-center gap-3 text-sm">
        <div className="text-center md:text-left">
          <p className="text-gray-500">Your Support</p>
          <p className="text-orange-600 font-semibold text-sm">+20023924362</p>
        </div>
        <div className="text-center md:text-left">
          <p className="text-gray-500">Worldwide</p>
          <p className="text-orange-600 underline">Shipping</p>
        </div>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default Navbar;