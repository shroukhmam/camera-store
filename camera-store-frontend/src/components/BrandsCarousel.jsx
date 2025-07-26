import React, { useState, useEffect, useRef } from 'react';
import '../styles/BrandsCarousel.css'; // We'll create this CSS file next

const BrandsCarousel = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const carouselRef = useRef(null);
    const intervalRef = useRef(null);

    // Number of visible items
    const visibleItems = 7;

    // Set up auto-rotation
    useEffect(() => {
        if (!isPaused) {
            intervalRef.current = setInterval(() => {
                setCurrentIndex(prev => (prev + 1) % items.length);
            }, 3000); // Rotate every 3 seconds
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [items.length, isPaused]);

    // Handle navigation
    const nextSlide = () => {
        setCurrentIndex(prev => (prev + 1) % items.length);
        resetInterval();
    };

    const prevSlide = () => {
        setCurrentIndex(prev => (prev - 1 + items.length) % items.length);
        resetInterval();
    };

    const resetInterval = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % items.length);
        }, 3000);
    };

    // Calculate which items to display
    const getVisibleItems = () => {
        const result = [];
        for (let i = 0; i < visibleItems; i++) {
            const index = (currentIndex + i) % items.length;
            result.push(items[index]);
        }
        return result;
    };

    return (
        <div
            className="carousel-container"
            ref={carouselRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <button className="carousel-arrow prev" onClick={prevSlide}>
                &lt;
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

            <button className="carousel-arrow next" onClick={nextSlide}>
                &gt;
            </button>

            <div className="pagination-dots">
                {items.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => {
                            setCurrentIndex(index);
                            resetInterval();
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default BrandsCarousel;