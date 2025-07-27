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
                            slidesPerGroup: 2,
                            spaceBetween: 10
                        },
                        768: {
                            slidesPerView: 4,
                            slidesPerGroup: 4,
                            spaceBetween: 15
                        },
                        1024: {
                            slidesPerView: 7,
                            slidesPerGroup: 7,
                            spaceBetween: 20
                        }
                    }}
                >
                    {categoriesData.categories.map((category) => (
                        <SwiperSlide key={category.id}>
                            <div className="category-grid-item wd-cat cat-design-default wd-with-subcat color-scheme-light product-category product">
                                <div className="wd-cat-inner wrapp-category">
                                    <div
                                        className="wd-cat-thumb category-image-wrapp relative w-[200px] h-[160px] bg-cover bg-center rounded-lg overflow-hidden"
                                        style={{ backgroundImage: `url(${category.image})` }}
                                    >
                                        {/* تغطية + توسيط كامل */}
                                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                                            <div className="text-white text-center">
                                                <h3 className="text-base font-bold mb-1">{category.name}</h3>
                                                <a
                                                    href={`/product-category/${category.name.toLowerCase()}`}
                                                    className="text-sm underline"
                                                >
                                                    {category.product_count} products
                                                </a>
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