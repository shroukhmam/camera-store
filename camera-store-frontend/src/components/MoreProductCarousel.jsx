import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import SideCart from "./SideCart";

const MoreProductCarousel = ({ products = [] }) => {
    const [activeMode, setActiveMode] = useState("horizontal");
    const [priceRange, setPriceRange] = useState([0, 420000]);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [maxPrice, setMaxPrice] = useState(420000);
    const [isMobile, setIsMobile] = useState(false);

    // Check for mobile viewport
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Helper function to parse price strings into numbers
    const parsePrice = (priceStr) => {
        if (!priceStr) return 0;
        const cleaned = String(priceStr)
            .replace(/\./g, '')
            .replace(',', '.');
        return parseFloat(cleaned) || 0;
    };

    // Get the effective price for a product
    const getProductPrice = (product) => {
        if (product.sale_price) return parsePrice(product.sale_price);
        if (product.price) return parsePrice(product.price);
        if (product.price_range?.max) return parsePrice(product.price_range.max);
        if (product.original_price) return parsePrice(product.original_price);
        return 0;
    };

    useEffect(() => {
        if (products.length > 0) {
            const prices = products.map(getProductPrice);
            const calculatedMax = Math.max(...prices);
            setMaxPrice(calculatedMax);
            setPriceRange([0, calculatedMax]);
        }
        setFilteredProducts(products);
    }, [products]);

    const handleMinPriceChange = (e) => {
        const newMin = Math.min(Number(e.target.value), priceRange[1]);
        setPriceRange([newMin, priceRange[1]]);
    };

    const handleMaxPriceChange = (e) => {
        const newMax = Math.max(Number(e.target.value), priceRange[0]);
        setPriceRange([priceRange[0], newMax]);
    };

    const handleFilter = () => {
        const filtered = products.filter(product => {
            if (!product) return false;
            const price = getProductPrice(product);
            return price >= priceRange[0] && price <= priceRange[1];
        });
        setFilteredProducts(filtered);
    };

    const resetFilters = () => {
        setPriceRange([0, maxPrice]);
        setFilteredProducts(products);
    };

    // Safe products array with validation
    const safeProducts = Array.isArray(filteredProducts)
        ? filteredProducts.filter(product => product?.id && product?.name)
        : [];

    // Responsive slider settings
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: activeMode === "vertical" && !isMobile,
        verticalSwiping: activeMode === "vertical" && !isMobile,
        arrows: !isMobile,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: false,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    vertical: false,
                    verticalSwiping: false,
                    arrows: false
                }
            }
        ]
    };

    // Group products based on active mode and screen size
    const groupSize = isMobile ? 3 : (activeMode === "vertical" ? 3 : 9);
    const productGroups = [];

    for (let i = 0; i < safeProducts.length; i += groupSize) {
        const group = safeProducts.slice(i, i + groupSize);
        if (group.length > 0) {
            productGroups.push(group);
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mx-auto max-w-[98%]">
            {/* Filter sidebar - hidden on mobile, shown on desktop */}
            <div className="hidden md:block md:col-span-4 p-4 relative">
                <div className={`sticky top-4 ${isMobile ? 'h-auto' : 'h-[300px]'} w-full bg-white shadow-lg rounded-lg p-4`}>
                    <h2 className="text-lg font-semibold mb-4">Filter By Price</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                            Min Price: {priceRange[0].toLocaleString()} EGP
                        </label>
                        <input
                            type="range"
                            min="0"
                            max={maxPrice}
                            value={priceRange[0]}
                            onChange={handleMinPriceChange}
                            className="w-full accent-red-500 mb-4"
                        />
                        <label className="block text-sm font-medium mb-1">
                            Max Price: {priceRange[1].toLocaleString()} EGP
                        </label>
                        <input
                            type="range"
                            min="0"
                            max={maxPrice}
                            value={priceRange[1]}
                            onChange={handleMaxPriceChange}
                            className="w-full accent-red-500"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleFilter}
                            className="mt-4 flex-1 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded transition-colors"
                        >
                            Filter
                        </button>
                        <button
                            onClick={resetFilters}
                            className="mt-4 flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded transition-colors"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile filter button */}
            {isMobile && (
                <div className="md:hidden p-2">
                    <button
                        className="w-full bg-orange-500 text-white py-2 rounded-lg"
                        onClick={() => {
                            // Implement mobile filter drawer toggle here
                            // You might want to use a state to control a drawer component
                        }}
                    >
                        Show Filters
                    </button>
                </div>
            )}

            {/* Main content area */}
            <div className="col-span-1 md:col-span-8 bg-gray-100 p-4">
                {safeProducts.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-500 text-lg mb-4">
                            No products found in this price range
                        </div>
                        <button
                            onClick={resetFilters}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                            <div className="flex gap-2">
                                {!isMobile && (
                                    <>
                                        <button
                                            onClick={() => setActiveMode("vertical")}
                                            className={`flex items-center justify-center p-2 rounded-md transition-all ${
                                                activeMode === "vertical"
                                                    ? "bg-orange-500 text-white shadow-md hover:bg-orange-600"
                                                    : "bg-gray-100 hover:bg-gray-200"
                                            }`}
                                            title="Vertical View"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4 6h16M4 12h16M4 18h16"
                                                />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => setActiveMode("horizontal")}
                                            className={`flex items-center justify-center p-2 rounded-md transition-all ${
                                                activeMode === "horizontal"
                                                    ? "bg-orange-500 text-white shadow-md hover:bg-orange-600"
                                                    : "bg-gray-100 hover:bg-gray-200"
                                            }`}
                                            title="Horizontal View"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                                                />
                                            </svg>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        <div>
                            <Slider {...settings}>
                                {productGroups.map((group, groupIndex) => (
                                    <div key={`group-${groupIndex}`} className="px-2">
                                        <div className={
                                            activeMode === "vertical" && !isMobile
                                                ? "space-y-4"
                                                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                                        }>
                                            {group.map(product => (
                                                <ProductCard
                                                    key={`product-${product.id}`}
                                                    product={product}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </>
                )}
                <SideCart />
            </div>
        </div>
    );
};

export default MoreProductCarousel;