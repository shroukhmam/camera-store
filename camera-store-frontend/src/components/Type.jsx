import React, { useState, useEffect } from 'react';
import productsData from '../data/type.json';

const Type = () => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [showHeart, setShowHeart] = useState(false);
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [showCartConfirm, setShowCartConfirm] = useState(false);
  const [showArrows, setShowArrows] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredFirstCard, setHoveredFirstCard] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [currentFirstCardImageIndex, setCurrentFirstCardImageIndex] = useState(0);
  const { products } = productsData;

  const firstCardImages = [
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80",
    "https://images.unsplash.com/photo-1564466809058-bf4114d55352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTextVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const nextProduct = () => {
    setCurrentProductIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentProductIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const nextFirstCardImage = () => {
    setCurrentFirstCardImageIndex((prev) => (prev + 1) % firstCardImages.length);
  };

  const prevFirstCardImage = () => {
    setCurrentFirstCardImageIndex((prev) => (prev - 1 + firstCardImages.length) % firstCardImages.length);
  };

  const handleAddToCart = () => {
    setShowCartConfirm(true);
  };

  const toggleHeart = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  useEffect(() => {
    if (showCartConfirm) {
      const timer = setTimeout(() => setShowCartConfirm(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showCartConfirm]);

  return (
    <section className="max-w-[1440px] mx-auto px-4 py-12 font-sans">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* LEFT SECTION */}
        <div className="flex flex-col lg:flex-row w-full lg:w-3/4 gap-8 bg-white rounded-xl shadow-xl p-8 relative">
          <div className="w-full lg:w-1/2 rounded-xl overflow-hidden relative group">
            <img
              src="https://camerashop.com.eg/wp-content/uploads/revslider/cinematic-wildlife-slider/africa-bg3-1.jpg"
              alt="DJI Products"
              className="w-full h-full min-h-[300px] object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4 transition-opacity duration-700 group-hover:opacity-100 opacity-100 rounded-lg">
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <div className={`relative h-28 w-28 transform transition-all duration-1000 delay-100 ${isTextVisible ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}>
                  <img 
                    src="https://camerashop.com.eg/wp-content/uploads/2025/03/1740037543_1874871.png" 
                    alt="Product" 
                    className="h-full w-full object-contain absolute top-0 left-0 animate-spin-slow hover:animate-pulse" 
                  />
                </div>
                <div className={`absolute inset-0 flex flex-col items-center justify-center text-white space-y-4 transform transition-all duration-1000 ${isTextVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                  <h2 className="text-3xl md:text-4xl font-bold leading-snug drop-shadow-lg">
                    Capture Your<br />Next Adventure
                  </h2>
                  <p className="text-base md:text-lg drop-shadow-md">
                    Discover high-quality DJI gear to level up your shooting experience.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center p-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">DJI Products</h1>
            <p className="text-gray-600 text-lg mb-6">
              Make your setup different with DJI with our full RANGE solutions
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition-all duration-300 w-fit text-lg hover:shadow-xl hover:-translate-y-1">
              Go Shopping →
            </button>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div 
          className="w-full lg:w-1/4 mt-8 lg:mt-0 relative"
          onMouseEnter={() => {
            setShowHeart(true);
            setShowArrows(true);
          }}
          onMouseLeave={() => {
            setShowHeart(false);
            setShowArrows(false);
          }}
        >
          {showHeart && (
            <div 
              className="absolute -top-3 -right-3 z-10 bg-white p-2 rounded-full shadow-md hover:scale-110 transition-transform cursor-pointer"
              onClick={toggleHeart}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill={isHeartFilled ? "red" : "none"} 
                viewBox="0 0 24 24" 
                stroke={isHeartFilled ? "red" : "currentColor"}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                />
              </svg>
            </div>
          )}

          {showArrows && (
            <div className="absolute inset-0 flex items-center justify-between px-2 z-10">
              <button 
                className="bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  prevProduct();
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button 
                className="bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  nextProduct();
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}

          <div className="relative bg-white rounded-xl border border-gray-200 shadow-md p-4 hover:shadow-lg transition-shadow">
            <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
              NEW
            </span>

            <div className="flex justify-center mt-4 mb-3 h-32">
              <img
                src={products[currentProductIndex].image}
                alt={products[currentProductIndex].name}
                className="h-full object-contain transition-all duration-300 hover:scale-105"
              />
            </div>

            <div className="text-center">
              <h3 className="text-base font-semibold text-gray-800 mb-1">
                {products[currentProductIndex].name}
              </h3>
              <p className="text-xs text-gray-500 mb-2">{products[currentProductIndex].category}</p>
              
              <div className="flex justify-center items-center text-green-600 text-xs mb-2">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                In stock
              </div>

              <p className="text-xl font-bold text-gray-900 mb-3">{products[currentProductIndex].price}</p>

              <button 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-1.5 rounded-md shadow transition mb-2 flex items-center justify-center gap-2"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {isHovered ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </>
                ) : (
                  "Add to Cart"
                )}
              </button>

              <p className="text-xs text-gray-400">SKU: {products[currentProductIndex].sku}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ADDITIONAL CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {/* Card 1 - مع سهمي التنقل */}
        <div 
          className="relative group overflow-hidden rounded-xl h-80"
          onMouseEnter={() => setHoveredFirstCard(true)}
          onMouseLeave={() => setHoveredFirstCard(false)}
        >
          <img
            src={firstCardImages[currentFirstCardImageIndex]}
            alt="Professional Camera"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {hoveredFirstCard && (
            <div className="absolute inset-0 flex items-center justify-between px-2 z-10">
              <button 
                className="bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  prevFirstCardImage();
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button 
                className="bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  nextFirstCardImage();
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-white font-bold text-xl mb-1">Professional Cameras</h3>
            <p className="text-gray-300 text-sm mb-3">High-end photography equipment</p>
            <div className="flex justify-between items-center">
              <p className="text-orange-400 font-bold text-2xl">9,500 EGP</p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="relative group overflow-hidden rounded-xl h-80">
          <img
            src="https://camerashop.com.eg/wp-content/uploads/2025/03/gk-panel-700b-bi-color-light-panel-866084-1.png"
            alt="GK Panel 700B"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-white font-bold text-xl mb-1">GK Panel 700B</h3>
            <p className="text-gray-300 text-sm mb-3">Bi-color LED Light Panel</p>
            <div className="flex justify-between items-center">
              <p className="text-orange-400 font-bold text-2xl">12,000 EGP</p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="relative group overflow-hidden rounded-xl h-80">
          <img
            src="https://images.unsplash.com/photo-1512790182412-b19e6d62bc39"
            alt="Camera and Audio Gear"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-white font-bold text-xl mb-1">Camera & Audio</h3>
            <p className="text-gray-300 text-sm mb-3">Professional Recording Kit</p>
            <div className="flex justify-between items-center">
              <p className="text-orange-400 font-bold text-2xl">15,000 EGP</p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Type;