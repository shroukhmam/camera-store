import React, { useRef, useState } from 'react';

const CameraShopFooter = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);
  const itemsPerView = 4; // Number of brands to show at once

  const brands = [
    { name: "7RYMS", image: "7ryms-1.png", url: "7ryms/" },
    { name: "Atomos", image: "atomos.png", url: "atomos/" },
    { name: "B+W", image: "bw-1.png", url: "bw/" },
    { name: "BlackMagic", image: "blackmagic-1.png", url: "blackmagic/" },
    { name: "Boya", image: "boya-1.png", url: "boya/" },
    { name: "Brother", image: "brother-1.png", url: "brother/" },
    { name: "Canon", image: "canon-1.png", url: "canon/" },
    { name: "COLBOR", image: "colbor-1.png", url: "colbor/" },
    { name: "Comica", image: "comica-1.png", url: "comica/" },
    { name: "delkin devices", image: "delikn-devices.png", url: "delkin-devices/" },
    { name: "DJI", image: "dji.png", url: "dji/" },
    { name: "Exascend", image: "exascend.png", url: "exascend/" },
    // Add more brands as needed
  ];

  const nextSlide = () => {
    if (activeSlide < brands.length - itemsPerView) {
      setActiveSlide(activeSlide + 1);
    }
  };

  const prevSlide = () => {
    if (activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
    }
  };

  return (
    <footer className="bg-gray-50 text-gray-800">
      <div className="container mx-auto px-4 py-10">
        {/* Locations Section */}
        <div className="flex flex-wrap border-b border-gray-200 pb-10 mb-10">
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-6">
            <div className="flex items-start group">
              <div className="flex-1">
                <h3 className="text-lg font-semibold group-hover:text-orange-600 transition-colors">
                  <a href="https://camerashop.com.eg/downtown-cairo/">DownTown Cairo</a>
                </h3>
                <p className="text-gray-600 mt-1">
                  2 Sherif Basha, As Sahah, Abdeen, Cairo Governorate 4280141
                </p>
              </div>
              <div className="w-6 h-6 ml-3 mt-1">
                <img 
                  loading="lazy" 
                  src="https://camerashop.com.eg/wp-content/uploads/2024/07/arrow-on-primary-circle.png" 
                  alt="" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-6">
            <div className="flex items-start group">
              <div className="flex-1">
                <h3 className="text-lg font-semibold group-hover:text-orange-600 transition-colors">
                  Downtown Cairo 2
                </h3>
                <p className="text-gray-600 mt-1">
                  Mohammed Sabri Abou Alam, Abdeen, Cairo Governorate
                </p>
              </div>
              <div className="w-6 h-6 ml-3 mt-1">
                <img 
                  loading="lazy" 
                  src="https://camerashop.com.eg/wp-content/uploads/2024/07/arrow-on-primary-circle.png" 
                  alt="" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="flex flex-wrap -mx-4">
          {/* Logo and Info Column */}
          <div className="w-full lg:w-1/4 px-4 mb-8">
            <div className="max-w-[220px] mb-4">
              <a href="https://camerashop.com.eg/">
                <img 
                  loading="lazy" 
                  src="https://camerashop.com.eg/wp-content/uploads/2024/11/camera-shop.png" 
                  alt="Camera Shop" 
                  className="w-full h-auto"
                />
              </a>
            </div>
            <p className="text-gray-600 mb-6">
              © 2024 Camera Shop Egypt - Your trusted destination for photography gear and expertise.
            </p>
            <div>
              <img 
                loading="lazy" 
                src="https://camerashop.com.eg/wp-content/uploads/2024/07/accepted-payments-1.png" 
                alt="Accepted payments" 
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Categories Column 1 */}
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><a href="https://camerashop.com.eg/product-category/camera/" className="text-gray-600 hover:text-orange-600 transition-colors">Camera</a></li>
                <li><a href="https://camerashop.com.eg/product-category/lens/" className="text-gray-600 hover:text-orange-600 transition-colors">Lens</a></li>
                <li><a href="https://camerashop.com.eg/product-category/professional-video-camera/" className="text-gray-600 hover:text-orange-600 transition-colors">Professional Video Camera</a></li>
                <li><a href="https://camerashop.com.eg/product-category/printer/" className="text-gray-600 hover:text-orange-600 transition-colors">Printer</a></li>
                <li><a href="https://camerashop.com.eg/product-category/accessories/" className="text-gray-600 hover:text-orange-600 transition-colors">Accessories</a></li>
              </ul>
            </div>
          </div>

          {/* Categories Column 2 */}
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><a href="https://camerashop.com.eg/product-category/video-mixers/" className="text-gray-600 hover:text-orange-600 transition-colors">Video Mixers</a></li>
                <li><a href="https://camerashop.com.eg/product-category/tripods/" className="text-gray-600 hover:text-orange-600 transition-colors">Tripods</a></li>
                <li><a href="https://camerashop.com.eg/product-category/memory/" className="text-gray-600 hover:text-orange-600 transition-colors">Memory</a></li>
                <li><a href="https://camerashop.com.eg/product-category/stabilizer/" className="text-gray-600 hover:text-orange-600 transition-colors">Stabilizer</a></li>
                <li><a href="https://camerashop.com.eg/product-category/lights/" className="text-gray-600 hover:text-orange-600 transition-colors">Lights</a></li>
                <li><a href="https://camerashop.com.eg/product-category/microphone/" className="text-gray-600 hover:text-orange-600 transition-colors">Microphone</a></li>
              </ul>
            </div>
          </div>

          {/* Brands Carousel Column */}
          <div className="w-full lg:w-1/4 px-4 mb-8">
            <h3 className="text-lg font-semibold text-orange-600 mb-4">TAKE YOUR SHOT</h3>
            <div className="relative group">
              <div className="flex items-center">
                {/* Left Arrow - appears on hover */}
                <button 
                  onClick={prevSlide}
                  disabled={activeSlide === 0}
                  className={`absolute left-0 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-opacity duration-200 opacity-0 group-hover:opacity-100 ${activeSlide === 0 ? 'cursor-not-allowed text-gray-400' : 'text-gray-700 hover:text-orange-600 hover:bg-gray-100'}`}
                  style={{ top: '50%', transform: 'translateY(-50%)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>

                {/* Carousel Content */}
                <div className="flex-1 overflow-hidden">
                  <div 
                    className="flex transition-transform duration-300 ease-in-out" 
                    ref={carouselRef}
                    style={{ 
                      transform: `translateX(-${activeSlide * (100 / 3)}%)`,
                      width: `${brands.length * (100 / 3)}%`
                    }}
                  >
                    {brands.map((brand, index) => (
                      <div 
                        key={index} 
                        className="w-full"
                        style={{ flex: `0 0 ${100 / 3}%` }}
                      >
                        <div className="flex flex-col items-center p-2">
                          <a 
                            href={`https://camerashop.com.eg/brand/${brand.url}`} 
                            title={brand.name}
                            className="block hover:opacity-80 transition-opacity"
                          >
                            <img 
                              src={`https://camerashop.com.eg/wp-content/uploads/2025/02/${brand.image}`} 
                              alt={brand.name}
                              className="w-full h-16 object-contain"
                              loading="lazy"
                            />
                          </a>
                          <span className="mt-2 text-sm text-gray-600 hover:text-orange-600 transition-colors">{brand.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Arrow - appears on hover */}
                <button 
                  onClick={nextSlide}
                  disabled={activeSlide >= brands.length - 3}
                  className={`absolute right-0 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-opacity duration-200 opacity-0 group-hover:opacity-100 ${activeSlide >= brands.length - 3 ? 'cursor-not-allowed text-gray-400' : 'text-gray-700 hover:text-orange-600 hover:bg-gray-100'}`}
                  style={{ top: '50%', transform: 'translateY(-50%)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-200 pt-6">
          <div className="text-center text-gray-600">
            all rights reserved for <a href="https://camerashop.com.eg" className="font-semibold hover:text-orange-600 transition-colors">Camera Shop</a> © 2025
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CameraShopFooter;