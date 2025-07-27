import React, { useState } from "react";
import Slider from "react-slick";
import { FaCheck, FaHeart, FaSearch, FaBalanceScale, FaShoppingCart, FaTimes } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// مكون سلة التسوق الجانبية
const SideCart = ({ isOpen, onClose, cartItems, updateQuantity, removeItem }) => {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-white z-50 shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b bg-gray-50">
        <h2 className="text-lg font-semibold text-orange-600">Shopping Cart</h2>
        <button onClick={onClose}>
          <FaTimes className="text-gray-600 hover:text-red-500" />
        </button>
      </div>

      {/* Body */}
      <div className="overflow-y-auto h-[calc(100%-220px)] p-4">
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item, idx) => (
              <li key={idx} className="flex space-x-4 border-b pb-4">
                <a href={item.link}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                </a>
                <div className="flex-1">
                  <a
                    href={item.link}
                    className="text-sm font-semibold text-gray-700 hover:text-orange-500 block"
                  >
                    {item.name}
                  </a>
                  {item.selectedOption && (
                    <div className="text-xs text-gray-500">Option: {item.selectedOption}</div>
                  )}
                  <div className="text-xs text-gray-500">SKU: {item.sku}</div>
                  <div className="flex items-center mt-1 space-x-2">
                    <button 
                      className="px-2 text-lg"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >−</button>
                    <input
                      type="number"
                      value={item.quantity}
                      min={1}
                      readOnly
                      className="w-12 border text-center text-sm rounded"
                    />
                    <button 
                      className="px-2 text-lg"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >+</button>
                  </div>
                  <div className="text-sm mt-1 text-gray-700">
                    {item.quantity} ×{" "}
                    <span className="font-bold">{item.price.toLocaleString()} EGP</span>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-red-500 mt-1 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t bg-gray-50">
        <p className="text-sm mb-2">
          <strong>Subtotal:</strong>{" "}
          <span className="text-orange-600 font-semibold">
            {subtotal.toLocaleString()} EGP
          </span>
        </p>

        {subtotal > 0 && (
          <div className="bg-orange-100 p-2 rounded mb-3">
            <div className="text-xs text-orange-700 mb-1">
              Your order qualifies for free shipping!
            </div>
            <div className="h-2 bg-orange-300 rounded">
              <div className="h-2 bg-orange-600 rounded" style={{ width: "100%" }} />
            </div>
          </div>
        )}

        <div className="flex space-x-2">
          <a
            href="/cart"
            className="flex-1 text-center bg-gray-200 text-gray-700 text-sm py-2 rounded hover:bg-gray-300"
          >
            View cart
          </a>
          <a
            href="/checkout"
            className="flex-1 text-center bg-orange-500 text-white text-sm py-2 rounded hover:bg-orange-600"
          >
            Checkout
          </a>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, addToCart }) => {
  const hasPriceRange = product.price_range;
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // خيارات المنتج
  const productOptions = [
    {
      label: "Body Only",
      price: 99000,
      sku: "01642"
    },
    {
      label: "With 24-105mm Lens",
      price: 123000,
      sku: "01643"
    }
  ];

  const handleAddToCart = () => {
    if (hasPriceRange && !selectedOption) {
      setShowOptions(!showOptions);
    } else if (hasPriceRange && selectedOption) {
      addToCart({
        id: product.id,
        name: `${product.name} - ${selectedOption.label}`,
        price: selectedOption.price,
        image: product.image,
        sku: selectedOption.sku,
        quantity: 1,
        link: `/product/${product.id}`,
        selectedOption: selectedOption.label
      });
    } else {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.sale_price || product.price,
        image: product.image,
        sku: product.sku,
        quantity: 1,
        link: `/product/${product.id}`
      });
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
  };

  return (
    <div className="relative group bg-white p-4 rounded-xl shadow-md h-full flex flex-col hover:shadow-lg transition-all duration-300">
      <div className="relative flex-grow">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-contain mx-auto"
        />
        
        {product.discount && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 text-sm rounded-full">
            {product.discount}
          </span>
        )}

        {/* الأيقونات - تظهر فقط عند الهوفر على الكارت */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {/* أيقونة المقارنة */}
          <div className="relative group/compare">
            <button className="bg-white p-2 rounded-full shadow text-gray-500 hover:text-orange-500 hover:bg-orange-50 transition-colors duration-300">
              <FaBalanceScale />
            </button>
            <span className="absolute right-full top-1/2 mr-2 transform -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover/compare:opacity-100 transition-opacity duration-300">
              Add to Compare
            </span>
          </div>

          {/* أيقونة البحث */}
          <div className="relative group/search">
            <button className="bg-white p-2 rounded-full shadow text-gray-500 hover:text-orange-500 hover:bg-orange-50 transition-colors duration-300">
              <FaSearch />
            </button>
            <span className="absolute right-full top-1/2 mr-2 transform -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover/search:opacity-100 transition-opacity duration-300">
              Quick View
            </span>
          </div>

          {/* أيقونة المفضلة */}
          <div className="relative group/wishlist">
            <button className="bg-white p-2 rounded-full shadow text-gray-500 hover:text-orange-500 hover:bg-orange-50 transition-colors duration-300">
              <FaHeart />
            </button>
            <span className="absolute right-full top-1/2 mr-2 transform -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover/wishlist:opacity-100 transition-opacity duration-300">
              Add to Wishlist
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col flex-grow-0">
        <h3 className="text-md font-bold line-clamp-2">{product.name}</h3>
        {product.category && (
          <p className="text-sm text-gray-500 line-clamp-1">{product.category.join(", ")}</p>
        )}

        {product.stock && (
          <div className="flex items-center text-green-600 text-sm mt-1">
            <FaCheck className="mr-1" /> {product.stock}
          </div>
        )}

        {hasPriceRange ? (
          <p className="text-orange-500 text-md mt-1">
            {product.price_range.min} – {product.price_range.max}
          </p>
        ) : (
          <>
            {product.original_price && (
              <p className="text-gray-400 line-through text-sm mt-1">
                {product.original_price}
              </p>
            )}
            <p className="text-orange-500 text-md">
              {product.sale_price || product.price}
            </p>
          </>
        )}

        <div className="relative">
          <button 
            className={`mt-3 w-full py-2 rounded transition-all duration-300 flex items-center justify-center relative overflow-hidden ${
              selectedOption ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-black text-white hover:bg-orange-600'
            }`}
            onClick={handleAddToCart}
          >
            <span className="group-hover/button:-translate-y-6 transition-all duration-300">
              {selectedOption ? "Add To Cart" : hasPriceRange ? "Select Options" : "Add To Cart"}
            </span>
            <FaShoppingCart className="absolute text-xl translate-y-6 group-hover/button:translate-y-0 transition-all duration-300" />
          </button>

          {showOptions && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <div className="p-3 space-y-2">
                {productOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`p-2 cursor-pointer rounded ${
                      selectedOption?.label === option.label ? 'bg-orange-50 text-orange-600' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleOptionSelect(option)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{option.label}</span>
                      <span className="text-sm font-medium">{option.price.toLocaleString()} EGP</span>
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

const ProductCarousel = ({ products }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => 
        item.id === product.id && 
        (!item.selectedOption || item.selectedOption === product.selectedOption)
      );
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id && 
          (!item.selectedOption || item.selectedOption === product.selectedOption)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, product];
      }
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeItem = (productId) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.id !== productId)
    );
  };

  const duplicatedProducts = products.length < 12 ? [...products, ...products] : products;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(duplicatedProducts.length, 6),
    slidesToScroll: 6,
    arrows: true,
    autoplay: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: Math.min(duplicatedProducts.length, 5),
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: Math.min(duplicatedProducts.length, 4),
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: Math.min(duplicatedProducts.length, 3),
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(duplicatedProducts.length, 2),
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <>
      <div className="mx-auto max-w-[95%] px-4 relative">
        <Slider {...settings} className="product-carousel">
          {duplicatedProducts.map((product, index) => (
            <div key={`${product.id}-${index}`} className="px-2 h-full">
              <div className="h-full">
                <ProductCard product={product} addToCart={addToCart} />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <SideCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />
    </>
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} before:content-none`}
      style={{
        ...style,
        display: "block",
        right: "-30px",
        zIndex: 1,
      }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-gray-700 bg-white rounded-full shadow-md p-1 hover:text-orange-500 hover:bg-orange-50 transition-colors duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} before:content-none`}
      style={{
        ...style,
        display: "block",
        left: "-30px",
        zIndex: 1,
      }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-gray-700 bg-white rounded-full shadow-md p-1 hover:text-orange-500 hover:bg-orange-50 transition-colors duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </div>
  );
};

export default ProductCarousel;