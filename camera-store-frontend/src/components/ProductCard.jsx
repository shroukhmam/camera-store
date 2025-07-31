import React, { useState } from "react";
import { FaCheck, FaShoppingCart } from "react-icons/fa";
import { MdCompareArrows } from "react-icons/md";
import { AiOutlineEye, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useCompare } from "../context/CompareContext";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const hasPriceRange = product.price_range;
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toggleCompare, isInCompare } = useCompare();
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const productOptions = [
    { label: "Body Only", price: 99000, sku: "01642" },
    { label: "With 24-105mm Lens", price: 123000, sku: "01643" },
  ];

  const handleAddToCart = () => {
    if (hasPriceRange && !selectedOption) {
      setShowOptions(!showOptions);
    } else if (hasPriceRange && selectedOption) {
      addToCart({
        id: product.id,
        name: `${product.name} - ${selectedOption.label}`,
        price: selectedOption.price,
        image: Array.isArray(product.images) ? product.images[0] : product.images,
        sku: selectedOption.sku,
        quantity: 1,
        link: `/product/${product.id}`,
        selectedOption: selectedOption.label,
      });
    } else {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.sale_price || product.price,
        image: Array.isArray(product.images) ? product.images[0] : product.images,
        sku: product.sku,
        quantity: 1,
        link: `/product/${product.id}`,
      });
    }
  };

  const inWishlist = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);

  return (
    <div className="relative group bg-white p-6 rounded-2xl shadow-lg h-full flex flex-col transition-transform duration-300 transform hover:-translate-y-3 hover:scale-105 hover:shadow-2xl">
      <div className="relative flex-grow">
        {/* NEW Badge */}

        {(product?.new === "1" || product?.new === 1 || product?.isNew) && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              backgroundColor: "#16a34a", // Tailwind green-600
              color: "white",
              fontSize: "11px",
              fontWeight: "bold",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              animation: "pulse 2s infinite",
            }}
          >
            NEW
          </div>
        )}
        <img
          src={Array.isArray(product.images) ? product.images[0] : product.images}
          alt={product.name}
          className="w-full h-52 object-cover mx-auto duration-300"
        />

        {product.discount && (
          <span className="absolute top-3 left-3 bg-orange-400 text-white px-3 py-1 text-xs font-semibold rounded-lg shadow-sm animate-pulse">
            {product.discount}
          </span>
        )}

        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-lg shadow-lg p-2 flex flex-col space-y-1">
          {/* Compare Button */}
          <div className="relative group/compare">
            <button
              className={`bg-white p-3 w-full text-orange-500 hover:bg-orange-100 hover:scale-110 transform transition-transform duration-300 ${
                inCompare ? "text-orange-600" : ""
              }`}
              onClick={() => toggleCompare(product)}
              aria-label={inCompare ? "Remove from Compare" : "Add to Compare"}
            >
              <MdCompareArrows />
            </button>
            <span className="absolute right-full top-1/2 transform -translate-y-1/2 mr-1.5 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover/compare:opacity-100 transition-opacity pointer-events-none z-20">
              {inCompare ? "Remove from Compare" : "Add to Compare"}
            </span>
          </div>

          {/* Quick View Button */}
          <div className="relative group/quickview">
            <button className="bg-white p-3 w-full text-orange-500 hover:bg-orange-100 hover:scale-110 transform transition-transform duration-300">
              <Link to={`product/${product.id}`}><AiOutlineEye /></Link>
            </button>
            <span className="absolute right-full top-1/2 transform -translate-y-1/2 mr-1.5 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover/quickview:opacity-100 transition-opacity pointer-events-none z-20">
              Quick View
            </span>
          </div>

          {/* Wishlist Button */}
          <div className="relative group/wishlist">
            <button
              className={`bg-white p-3 w-full text-orange-500 hover:bg-orange-100 hover:scale-110 transform transition-transform duration-300 ${
                inWishlist ? "text-orange-600" : ""
              }`}
              onClick={() => toggleWishlist(product)}
              aria-label={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              {inWishlist ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
            <span className="absolute right-full top-1/2 transform -translate-y-1/2 mr-1.5 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover/wishlist:opacity-100 transition-opacity pointer-events-none z-20">
              {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold line-clamp-2 text-gray-900">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        {(product.category || product.subcategory || product.brand) && (
          <p className="text-sm text-gray-600 line-clamp-1 mt-1">
            {[product.category, product.subcategory, product.brand].filter(Boolean).join(" / ")}
          </p>
        )}
        {product.stock && (
          <div className="flex items-center text-orange-600 text-sm mt-1 font-medium">
            <FaCheck className="mr-1" />{" "}
            {product.stock.includes("Out of Stock") ? "Out of Stock" : "In Stock"}
          </div>
        )}

        {hasPriceRange ? (
          <p className="text-orange-600 text-lg font-semibold mt-2">
            Range <br />
            {product.price_range.min} EGP – {product.price_range.max} EGP
          </p>
        ) : (
          <>
            {product.original_price && (
              <p className="text-gray-400 line-through text-sm mt-1">{product.original_price}</p>
            )}
            <p className="text-orange-600 text-lg font-bold">{product.sale_price || product.price} EGP</p>
          </>
        )}

        <div className="relative">
          <button
            className={`mt-4 w-full py-3 rounded-lg flex items-center justify-center ${
              selectedOption ? "bg-orange-600 hover:bg-orange-700" : "bg-black hover:bg-orange-600"
            } text-white font-semibold transition-colors duration-300 group/cart shadow-md`}
            onClick={handleAddToCart}
          >
            <span className="group-hover/cart:hidden">
              {selectedOption ? "Add To Cart" : hasPriceRange ? "Select Options" : "Add To Cart"}
            </span>
            <FaShoppingCart className="hidden group-hover/cart:block mx-auto" />
          </button>

          {showOptions && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg z-10 border">
              <div className="p-3 space-y-2">
                {productOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`p-3 cursor-pointer rounded-lg transition-colors duration-200 ${
                      selectedOption?.label === option.label
                        ? "bg-orange-100 text-orange-700 font-semibold"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      setSelectedOption(option);
                      setShowOptions(false);
                    }}
                  >
                    <div className="flex justify-between">
                      <span>{option.label}</span>
                      <span>{option.price.toLocaleString()} EGP</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {selectedOption && (
          <p className="text-xs text-gray-500 mt-1">Selected: {selectedOption.label}</p>
        )}
        {product.sku && (
          <p className="text-xs text-gray-500 mt-1">SKU: {product.sku}</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;