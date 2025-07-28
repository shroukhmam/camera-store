import { useState } from "react";
import { FaCamera, FaSearch, FaUser, FaCog, FaBars } from "react-icons/fa"; // تأكدي إنك مستخدمة FaBars أو الأيقونة اللي تقصديها
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
        {/* Settings Icon (show only on small screens) */}
        <button className="text-gray-600 hover:text-orange-600 transition-colors md:hidden">
          {/*<FaCog className="text-xl" />*/}

        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 text-orange-600 text-2xl font-bold whitespace-nowrap">
          <FaCamera className="text-3xl" />
          <h1>camera shop</h1>
        </div>

      
        {/* User Icon (show only on small screens) */}
        <button className="text-gray-600 hover:text-orange-600 transition-colors md:hidden">
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

          <div className="w-full max-w-[150px] md:max-w-[180px] hidden md:block">
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
      <div className="hidden md:block ">
          <div className="flex flex-col md:flex-row items-center  text-black">
            <div className="flex-1 text-center md:text-left mb-4 md:mb-0">
              <p className="text-sm">Your Support</p>
              <p className="text-sm text-orange-500">+20023924362</p>
            </div>

            <div className="hidden md:block w-px h-8 bg-orange-400 mx-4"></div>

            <div className="flex-1 text-center md:text-left">
              <p className="text-sm">Worldwide</p>
              <p className="text-sm text-orange-500">Shipping</p>
            </div>
          </div>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default Navbar;
