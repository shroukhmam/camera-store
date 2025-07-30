import React, { useState } from "react";
import { FaCheck, FaHeart, FaSearch, FaBalanceScale, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const hasPriceRange = product.price_range;
  const { addToCart } = useCart();
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

  return (
    <div className="relative group bg-white p-4 rounded-xl shadow-md h-full flex flex-col hover:shadow-lg transition-all duration-300">
      <div className="relative flex-grow">
        {/* NEW Badge */}
      


{(product?.new === "1" || product?.new === 1 || product?.isNew) && (
  <div
    style={{
      position: "absolute",
      top: "10px",
      left: "10px",
      backgroundColor: "#16a34a", // لون أخضر داكن
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
    }}
  >
    NEW
  </div>
)}

        <img
          src={Array.isArray(product.images) ? product.images[0] : product.images}
          alt={product.name}
          className="w-full h-48 object-contain mx-auto"
        />

        {product.discount && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 text-sm rounded-full">
            {product.discount}
          </span>
        )}

        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
          {/* Compare Button */}
          <div className="relative group/compare">
            <button className="bg-white p-2 rounded-full shadow text-orange-500 hover:bg-orange-100">
              <FaBalanceScale />
            </button>
            <span className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover/compare:opacity-100 transition-opacity pointer-events-none z-20">
              Add to Compare
            </span>
          </div>

          {/* Quick View Button */}
          <div className="relative group/quickview">
            <button className="bg-white p-2 rounded-full shadow text-orange-500 hover:bg-orange-100">
              <FaSearch />
            </button>
            <span className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover/quickview:opacity-100 transition-opacity pointer-events-none z-20">
              Quick View
            </span>
          </div>

          {/* Wishlist Button */}
          <div className="relative group/wishlist">
            <button className="bg-white p-2 rounded-full shadow text-orange-500 hover:bg-orange-100">
              <FaHeart />
            </button>
            <span className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover/wishlist:opacity-100 transition-opacity pointer-events-none z-20">
              Add to Wishlist
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-md font-bold line-clamp-2">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        {(product.category || product.subcategory || product.brand) && (
          <p className="text-sm text-gray-500 line-clamp-1">
            {[product.category, product.subcategory, product.brand].filter(Boolean).join(" / ")}
          </p>
        )}
        {product.stock && (
          <div className="flex items-center text-orange-500 text-sm mt-1">
            <FaCheck className="mr-1" />{" "}
            {product.stock.includes("Out of Stock") ? "Out of Stock" : "In Stock"}
          </div>
        )}

        {hasPriceRange ? (
          <p className="text-orange-500 text-md mt-1">
            Range <br />
            {product.price_range.min} EGP – {product.price_range.max} EGP
          </p>
        ) : (
          <>
            {product.original_price && (
              <p className="text-gray-400 line-through text-sm mt-1">{product.original_price}</p>
            )}
            <p className="text-orange-500 text-md">{product.sale_price || product.price} EGP</p>
          </>
        )}

        <div className="relative">
          <button
            className={`mt-3 w-full py-2 rounded flex items-center justify-center ${
              selectedOption ? "bg-orange-500 hover:bg-orange-600" : "bg-black hover:bg-orange-500"
            } text-white transition-all duration-300 group/cart`}
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
                    className={`p-2 cursor-pointer rounded ${
                      selectedOption?.label === option.label
                        ? "bg-orange-50 text-orange-600"
                        : "hover:bg-gray-50"
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
