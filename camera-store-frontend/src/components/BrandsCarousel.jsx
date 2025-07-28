import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import '../styles/BrandsCarousel.css';

const BrandsCarousel = ({ items }) => {
    const [visibleItemsCount, setVisibleItemsCount] = useState(10);
    const [isPaused, setIsPaused] = useState(false);

    // Handle responsive visibility
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1200) {
                setVisibleItemsCount(10);
            } else if (window.innerWidth >= 768) {
                setVisibleItemsCount(7);
            } else {
                setVisibleItemsCount(4);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Arrow icon component
    const ArrowIcon = ({ direction = 'left' }) => (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {direction === 'left' ? (
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
        </svg>
    );

    return (
        <div className="carousel-container">
            <div
                className="carousel-wrapper"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={15}
                    slidesPerView={visibleItemsCount}
                    navigation={{
                        prevEl: '.carousel-arrow.prev',
                        nextEl: '.carousel-arrow.next',
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    breakpoints={{
                        320: {
                            slidesPerView: 4,
                            slidesPerGroup: 4,
                            spaceBetween: 10
                        },
                        768: {
                            slidesPerView: 7,
                            slidesPerGroup: 7,
                            spaceBetween: 15
                        },
                        1200: {
                            slidesPerView: 10,
                            slidesPerGroup: 7,
                            spaceBetween: 15
                        }
                    }}
                >
                    {items.map((item, index) => (
                        <SwiperSlide key={`${item.id}-${index}`}>
                            <div className="carousel-item">
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    loading="lazy"
                                />
                                <div className="brand-name">{item.name}</div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <button
                    className="carousel-arrow prev"
                    aria-label="Previous items"
                >
                    <ArrowIcon direction="left" />
                </button>

                <button
                    className="carousel-arrow next"
                    aria-label="Next items"
                >
                    <ArrowIcon direction="right" />
                </button>
            </div>
        </div>
    );
};

export default BrandsCarousel;