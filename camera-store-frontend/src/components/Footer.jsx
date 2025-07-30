import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import brandsData from '../data/brands.json'; // Adjust the path to your JSON file
import categoriesData from  '../data/CategoryProduct.json';
import {Link} from "react-router-dom";
const Footer = () => {
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
                  {categoriesData.categories.slice(0, 5).map((category, index) => (
                      <li key={index}>
                        <Link
                            className="text-gray-600 hover:text-orange-600 transition-colors"
                            to={`/category/${category.id}`}
                            aria-label={`Product category ${category.name}`}
                        >
                          {category.name}
                        </Link>
                      </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Categories Column 2 */}
            <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categoriesData.categories.slice(5).map((category, index) => (
                      <li key={index}>
                        <Link
                            className="text-gray-600 hover:text-orange-600 transition-colors"
                            to={`/category/${category.id}`}
                            aria-label={`Product category ${category.name}`}
                        >
                          {category.name}
                        </Link>
                      </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Brands Carousel Column */}
            <div className="w-full lg:w-1/4 px-4 mb-8">
              <h3 className="text-lg font-semibold text-orange-600 mb-4">TAKE YOUR SHOT</h3>

              <div className="relative group">
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={3}
                    navigation={{
                      nextEl: '.brand-swiper-button-next',
                      prevEl: '.brand-swiper-button-prev',
                    }}
                    breakpoints={{
                      640: {
                        slidesPerView: 3,
                        spaceBetween: 5,

                      },
                      768: {
                        slidesPerView: 3,
                      },
                      1024: {
                        slidesPerView: 3,
                        spaceBetween: 5,

                      },
                    }}
                >
                  {brandsData.map((brand) => (
                      <SwiperSlide key={brand.id}>
                        <div className="flex flex-col items-center p-2">
                          <a
                              href='#'
                              title={brand.name}
                              className="block hover:opacity-80 transition-opacity"
                          >
                            <img
                                src={brand.img}
                                alt={brand.name}
                                className="w-full h-16 object-contain"
                                loading="lazy"
                            />
                          </a>
                          <span className="mt-2 text-sm text-gray-600 hover:text-orange-600 transition-colors">
                        {brand.name}
                      </span>
                        </div>
                      </SwiperSlide>
                  ))}
                </Swiper>

                {/* Custom Navigation Buttons */}
                <button className="brand-swiper-button-prev absolute left-0 top-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:text-orange-600 hover:bg-gray-100 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"   style={{ left: '-20px', top: '45%' }}
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="relative -left-0.5" // Adjust arrow position inside button
                  >
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>

                <button
                    className="brand-swiper-button-next absolute z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:text-orange-600 hover:bg-gray-100 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ right: '-20px', top: '45%' }}
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="relative left-0.5" // Adjust arrow position inside button
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
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

export default Footer;