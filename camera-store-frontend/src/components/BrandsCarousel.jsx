import React, { useState, useEffect, useRef } from 'react';
import '../styles/BrandsCarousel.css';

const BrandsCarousel = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [visibleItemsCount, setVisibleItemsCount] = useState(10);
    const carouselRef = useRef(null);
    const intervalRef = useRef(null);

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

    // Auto-rotation with visible items count
    useEffect(() => {
        if (!isPaused && items.length > 0) {
            intervalRef.current = setInterval(() => {
                setCurrentIndex(prev => (prev + visibleItemsCount) % items.length);
            }, 3000);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [items.length, isPaused, visibleItemsCount]);

    // Navigation handlers
    const nextSlide = () => {
        setCurrentIndex(prev => (prev + visibleItemsCount) % items.length);
        resetInterval();
    };

    const prevSlide = () => {
        setCurrentIndex(prev => (prev - visibleItemsCount + items.length) % items.length);
        resetInterval();
    };

    const resetInterval = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setCurrentIndex(prev => (prev + visibleItemsCount) % items.length);
        }, 3000);
    };

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

    // Calculate visible items
    const getVisibleItems = () => {
        if (!items || items.length === 0) return [];

        const result = [];
        for (let i = 0; i < Math.min(visibleItemsCount, items.length); i++) {
            const index = (currentIndex + i) % items.length;
            result.push(items[index]);
        }
        return result;
    };

    return (
        <div className="carousel-container">
            <div
                className="carousel-wrapper"
                ref={carouselRef}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <button
                    className="carousel-arrow prev"
                    onClick={prevSlide}
                    aria-label="Previous items"
                >
                    <ArrowIcon direction="left" />
                </button>

                <div className="carousel-track">
                    {getVisibleItems().map((item, index) => (
                        <div key={`${item.id}-${index}`} className="carousel-item">
                            <img
                                src={item.img}
                                alt={item.name}
                                loading="lazy"
                            />
                            <div className="brand-name">{item.name}</div>
                        </div>
                    ))}
                </div>

                <button
                    className="carousel-arrow next"
                    onClick={nextSlide}
                    aria-label="Next items"
                >
                    <ArrowIcon direction="right" />
                </button>
            </div>
        </div>
    );
};

export default BrandsCarousel;