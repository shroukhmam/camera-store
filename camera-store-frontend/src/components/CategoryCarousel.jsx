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
                            <div className="category-grid-item wd-cat cat-design-default wd-with-subcat color-scheme-light product-category product">
                                <div className="wd-cat-inner wrapp-category">
                                    <div className="wd-cat-thumb category-image-wrapp">
                                        <a className="wd-cat-image category-image" href={`/product-category/${category.name.toLowerCase()}`} aria-label="Category image">
                                            <img
                                                loading="lazy"
                                                decoding="async"
                                                width="150"
                                                height="150"
                                                src={category.image}
                                                className="attachment-thumbnail size-thumbnail"
                                                alt={category.name}
                                            />
                                        </a>
                                    </div>
                                    <div className="wd-cat-content hover-mask">
                                        <h3 className="wd-entities-title">{category.name}</h3>
                                        <div className="wd-cat-count more-products">
                                            <a href={`/product-category/${category.name.toLowerCase()}`}>
                                                {category.product_count} products
                                            </a>
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