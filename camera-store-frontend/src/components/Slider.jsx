import React, { useState, useEffect } from 'react';
import productsData from '../data/products.json';

const SaramonicSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const products = productsData.products;

  useEffect(() => {
    document.title = "Camera Store";
  }, []);

  useEffect(() => {
    setDisplayedProducts(products.slice(0, 4));
  }, [products]);

  const goToNextSlide = () => {
    const newIndex = activeSlide === products.length - 1 ? 0 : activeSlide + 1;
    setActiveSlide(newIndex);
    updateDisplayedProducts(newIndex);
  };

  const goToPrevSlide = () => {
    const newIndex = activeSlide === 0 ? products.length - 1 : activeSlide - 1;
    setActiveSlide(newIndex);
    updateDisplayedProducts(newIndex);
  };

  const updateDisplayedProducts = (centerIndex) => {
    let startIndex = centerIndex - 2;
    if (startIndex < 0) {
      startIndex = products.length + startIndex;
    }

    const newDisplayedProducts = [];
    for (let i = 0; i < 4; i++) {
      const productIndex = (startIndex + i) % products.length;
      newDisplayedProducts.push(products[productIndex]);
    }

    setDisplayedProducts(newDisplayedProducts);
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 5000);
    return () => clearInterval(interval);
  }, [activeSlide, products.length]);

  return (
    <div className="bg-white mt-20">
      <div className="bg-black px-4 pt-8">
        <div className="max-w-6xl mx-auto">
          {/* Upper Section */}
          <div className="flex flex-col md:flex-row items-center mb-12 gap-8">
            {/* Image with Explore Button */}
            <div className="w-full md:w-1/2 relative">
              <div className="relative rounded-lg overflow-hidden">
                <img 
                  src="https://camerashop.com.eg/wp-content/uploads/2024/12/600b23fafaf7ea1f930e41b3.png"
                  alt="Saramonic Product"
                  className="w-full h-auto object-contain max-w-full"
                  style={{ maxHeight: '280px' }}
                />
                <button className="absolute top-6 left-6 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-8 rounded-lg uppercase shadow-lg">
                  Explore More
                </button>
              </div>
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">SARAMONIC DEMO EVENT</h1>
              <p className="text-gray-300 text-lg mb-8">Hurry and get discounts on all Saramonic products</p>
              <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-10 rounded-lg shadow-lg transition-colors duration-300">
                Go Shopping
              </button>
            </div>
          </div>

          {/* Products Section */}
          <div className="relative py-8">
            {/* Arrows with proper spacing */}
            <button 
              onClick={goToPrevSlide}
              className="absolute left-2 sm:left-0 top-1/2 transform -translate-y-1/2 sm:-translate-x-1/2 bg-white text-black p-3 rounded-full shadow-xl z-10 hover:bg-gray-100"
              style={{
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button 
              onClick={goToNextSlide}
              className="absolute right-2 sm:right-0 top-1/2 transform -translate-y-1/2 sm:translate-x-1/2 bg-white text-black p-3 rounded-full shadow-xl z-10 hover:bg-gray-100"
              style={{
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Product Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4 sm:px-6 md:px-8">
              {displayedProducts.map((product, index) => (
                <div 
                  key={`${product.id}-${index}`}
                  className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-all"
                >
                  <div className="h-20 mb-3 flex items-center justify-center">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-2">
                    {product.title}
                  </h3>
                  <div className="text-orange-600 font-bold text-lg">
                    {product.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaramonicSlider;
