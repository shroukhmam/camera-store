import { FaShoppingCart, FaUser, FaSyncAlt, FaHeart, FaHome } from "react-icons/fa";
import { MdCompareArrows } from "react-icons/md";
import { Link } from "react-router-dom";
import menuItems from "../data/menuItems.json";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";
import { useCompare } from "../context/CompareContext.jsx";
import SideCart from "./SideCart.jsx";

const SubNavbar = () => {
    const { cartItems, isCartOpen, setIsCartOpen } = useCart();
    const { wishlistItems } = useWishlist();
    const { compareItems } = useCompare();

    // Calculate total quantity and total price
    const totalQuantity = cartItems?.reduce((total, item) => total + (item.quantity || 0), 0) || 0;
    const totalPrice = cartItems?.reduce((total, item) => {
        const price = Number(item.price) || 0;
        const quantity = item.quantity || 0;
        return total + (price * quantity);
    }, 0) || 0;

    const wishlistCount = wishlistItems.length;
    const compareCount = compareItems.length;

    return (
        <>
            {/* Desktop Navigation (lg and up) */}
            <div className="hidden lg:flex w-full bg-orange-500 text-white px-4 py-3 flex-row justify-between items-center gap-6">
                {/* Empty space for alignment */}
                <div className="w-[60px]"></div>

                {/* Categories Section */}
                <div className="flex justify-start items-center gap-4 text-sm font-medium">
                    <button className="bg-white text-orange-600 rounded-full px-4 py-1">
                        All Categories
                    </button>

                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.to}
                            className="pb-[2px] border-b-2 border-transparent hover:border-orange-300 transition duration-200 cursor-pointer"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* User Actions Section */}
                <div className="flex items-center gap-5 text-sm">
                    <div
                        className="flex items-center gap-1 cursor-pointer text-white hover:text-orange-200 transition"
                        title="My Account"
                    >
                        <FaUser />
                        <span><Link to="/login"> Login / Register </Link></span>
                    </div>

                    <div className="relative cursor-pointer">
                        <Link to="/wishlist" className="flex items-center">
                            <FaHeart />
                            <span className="absolute -top-2 -right-2 bg-white text-orange-600 rounded-full text-xs px-1">
                {wishlistCount}
              </span>
                        </Link>
                    </div>

                    <div className="relative cursor-pointer">
                        <Link to="/compare" className="flex items-center">
                            <MdCompareArrows />
                            <span className="absolute -top-2 -right-2 bg-white text-orange-600 rounded-full text-xs px-1">
                {compareCount}
              </span>
                        </Link>
                    </div>

                    <div
                        className="relative flex items-center gap-1 cursor-pointer"
                        onClick={() => setIsCartOpen(!isCartOpen)}
                    >
                        <FaShoppingCart />
                        {totalQuantity > 0 && (
                            <span className="absolute -top-2 -left-0 ml-2 bg-white text-orange-600 rounded-full text-xs px-1">
                {totalQuantity}
              </span>
                        )}
                        <span className="ml-2">{totalPrice.toFixed(2)} EGP</span>
                    </div>
                </div>
                <SideCart />
            </div>

            {/* Mobile & Tablet Navigation (lg down) */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 w-full bg-white shadow-lg border-t border-gray-200 z-50">
                <div className="flex justify-around items-center py-3">
                    <Link to="/wishlist" className="flex flex-col items-center text-gray-700 relative">
                        <FaHeart className="text-lg" />
                        {wishlistCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                {wishlistCount}
              </span>
                        )}
                        <span className="text-xs mt-1">Wishlist</span>
                    </Link>

                    <Link to="/compare" className="flex flex-col items-center text-gray-700 relative">
                        <MdCompareArrows className="text-lg" />
                        {compareCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                {compareCount}
              </span>
                        )}
                        <span className="text-xs mt-1">Compare</span>
                    </Link>

                    <div
                        className="flex flex-col items-center text-gray-700 relative cursor-pointer"
                        onClick={() => setIsCartOpen(!isCartOpen)}
                    >
                        <FaShoppingCart className="text-lg" />
                        {totalQuantity > 0 && (
                            <span className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                {totalQuantity}
              </span>
                        )}
                        <span className="text-xs mt-1">Cart</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubNavbar;