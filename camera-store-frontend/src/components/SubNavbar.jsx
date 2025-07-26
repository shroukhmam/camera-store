import { FaShoppingCart, FaUser, FaSyncAlt, FaHeart } from "react-icons/fa";

const SubNavbar = () => {
  return (
    <div className="w-full bg-orange-500 text-white px-4 py-2 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
      {/* فاضيه */}
      <div className="hidden md:block w-[60px]"></div>

      {/* اللينكات */}
      <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-sm font-medium">
        <button className="bg-white text-orange-600 rounded-full px-4 py-1">
          All Categories
        </button>

        {/* عناصر الروابط مع خط أورنج خفيف عند hover */}
        {[
          "Store",
          "Brands",
          "Outlet",
          "EXCLUSIVES",
          "Promotions",
          "Our Contacts",
        ].map((item, index) => (
          <span
            key={index}
            className="pb-[2px] border-b-2 border-transparent hover:border-orange-300 transition duration-200 cursor-pointer"
          >
            {item}
          </span>
        ))}
      </div>

      {/* الأيقونات */}
      <div className="flex items-center gap-5">
        {/* Login/Register بتأثير لوني بدون خط وتحويل لـ My Account عند التثبيت */}
        <div
          className="flex items-center gap-1 cursor-pointer text-white hover:text-orange-200 transition"
          title="My Account"
        >
          <FaUser />
          <span className="text-sm">Login / Register</span>
        </div>

        <div className="relative cursor-pointer">
          <FaSyncAlt />
          <span className="absolute -top-2 -right-2 bg-white text-orange-600 rounded-full text-xs px-1">
            0
          </span>
        </div>

        <div className="relative cursor-pointer">
          <FaHeart />
          <span className="absolute -top-2 -right-2 bg-white text-orange-600 rounded-full text-xs px-1">
            1
          </span>
        </div>

        <div className="relative flex items-center gap-1 cursor-pointer">
          <FaShoppingCart />
          <span className="absolute -top-2 -right-2 bg-white text-orange-600 rounded-full text-xs px-1">
            0
          </span>
          <span className="ml-2">0 EGP</span>
        </div>
      </div>
    </div>
  );
};

export default SubNavbar;