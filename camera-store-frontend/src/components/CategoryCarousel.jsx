import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay, Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import '../styles/CategoryCarousel.css';

// Import your JSON data (assuming it's in a file called categories.json)
import categoriesData from '../data/CategoryProduct.json';

const CategoryCarousel = () => {
    return (
        <div className="products woocommerce wd-carousel-container wd-cats-element wd-cats">
            <h2 className="text-[26px] text-[#242424] font-bold mb-6 relative
               after:content-[''] after:absolute after:bottom-0 after:left-0
               after:w-20 after:h-0.5 after:bg-orange-500
               transition-all duration-300 hover:translate-x-1">
                Popular Categories
            </h2>
            <div className="wd-carousel-inner">
                <Swiper
                    modules={[Navigation, Autoplay]} // أضفنا Autoplay هنا
                    spaceBetween={20}
                    slidesPerView={7}
                    navigation={{
                        prevEl: '.wd-prev',
                        nextEl: '.wd-next',
                    }}
                    autoplay={{
                        delay: 5000, // تأخير 3 ثواني بين كل لفة
                        disableOnInteraction: false, // يستمر في التشغيل حتى عند التفاعل
                    }}
                    loop={true} // يعيد التشغيل من البداية بعد النهاية
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 10
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 15
                        },
                        1024: {
                            slidesPerView: 7,
                            spaceBetween: 20
                        }
                    }}
                >
                    {categoriesData.categories.map((category) => (
                        <SwiperSlide key={category.id}>
                            <div className="category-grid-item wd-cat cat-design-default wd-with-subcat color-scheme-light product-category product group">
                                <div className="wd-cat-inner wrapp-category">
                                    <div
                                        className="wd-cat-thumb category-image-wrapp relative w-full h-[160px] bg-cover bg-no-repeat bg-center rounded-lg overflow-hidden"
                                        style={{
                                            backgroundImage: `url(${category.image})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat'
                                        }}
                                    >
                                        {/* Overlay في المنتصف تماماً */}
                                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end justify-start p-2 transition-all duration-300 group-hover:bg-opacity-40">
                                            <div className="text-white text-left overflow-hidden">
                                                <h3 className="text-base font-bold mb-2 transition-all duration-300 group-hover:translate-y-[-5px]">
                                                    {category.name}
                                                </h3>
                                                {/* عدد المنتجات مع أنيميشن يظهر من الأسفل */}
                                                <div className="h-6 overflow-hidden">
                                                    <a
                                                        href={`/product-category/${category.name.toLowerCase()}`}
                                                        className="block text-sm underline transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                                                    >
                                                        {category.product_count} products
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <a
                                        className="wd-fill category-link"
                                        href={`/product-category/${category.name.toLowerCase()}`}
                                        aria-label={`Product category ${category.name}`}
                                    ></a>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="wd-nav-arrows wd-pos-sep wd-hover-1 wd-icon-2">
                    <div className="wd-btn-arrow wd-prev" tabIndex="0" role="button" aria-label="Previous slide">
                        <div className="wd-arrow-inner"></div>
                    </div>
                    <div className="wd-btn-arrow wd-next" tabIndex="0" role="button" aria-label="Next slide">
                        <div className="wd-arrow-inner"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CategoryCarousel;