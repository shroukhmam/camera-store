import React, {useEffect, useState} from "react";
import slider1 from '../../public/assets/images/slider1.png';
import slider2 from '../../public/assets/images/slider2.jpeg';
import slider3 from '../../public/assets/images/slider3.png';
import {Link} from "react-router-dom";

export default function DJIOfferBanner() {
    const [loaded, setLoaded] = useState(false);
    const [hoveredItems, setHoveredItems] = useState({
        main: false,
        pl100b: false,
        colbor: false,
        wiTalk: false
    });

    useEffect(() => {
        setLoaded(true);
    }, []);

    const handleHover = (item, isHovering) => {
        setHoveredItems(prev => ({
            ...prev,
            [item]: isHovering
        }));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {/* Left side - Updated design with slider effect */}
            <div
                className="md:col-span-2 relative bg-gray-900 text-white rounded-lg overflow-hidden h-[543px]"
                onMouseEnter={() => handleHover('main', true)}
                onMouseLeave={() => handleHover('main', false)}
            >
                {/* Background image */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
                    style={{
                        backgroundImage: "url('//camerashop.com.eg/wp-content/uploads/revslider/video-media/for-webiste_200.jpeg')",
                        opacity: hoveredItems.main ? 0.3 : 0.5
                    }}
                ></div>

                {/* Video background (autoplay muted) */}
                <video
                    autoPlay
                    muted
                    loop
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                    style={{ opacity: hoveredItems.main ? 0.5 : 0.7 }}
                >
                    <source src="//camerashop.com.eg/wp-content/uploads/2025/06/for-webiste.mov" type="video/mp4" />
                </video>

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    {/* DJI MIC MINI title with text shadow */}
                    <h2
                        className="text-5xl md:text-6xl font-extrabold mb-4 uppercase transition-transform duration-500"
                        style={{
                            fontFamily: "'Lilita One', sans-serif",
                            textShadow: '0 0 30px rgba(0,0,0,0.5)',
                            lineHeight: '1.2',
                            transform: hoveredItems.main ? 'scale(1.05)' : 'scale(1)'
                        }}
                    >
                        DJI MIC MINI
                    </h2>

                    {/* Special offer text with yellow color */}
                    <p
                        className="text-yellow-300 text-xl md:text-2xl font-semibold mb-4 uppercase transition-all duration-500"
                        style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            textShadow: '0 0 30px #000',
                            letterSpacing: '1px',
                            opacity: hoveredItems.main ? 1 : 0.8
                        }}
                    >
                        SPECIAL OFFER ONLY FOR 7000EGP
                    </p>

                    {/* Explore button - appears on hover */}
                    <Link
                        to="/store"
                        className={`
                            bg-orange-500 hover:bg-orange-600
                            px-8 py-3 rounded-lg font-bold
                            transition-all duration-300
                            ${hoveredItems.main ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                        `}
                    >
                        SHOP NOW
                    </Link>
                </div>
            </div>

            {/* Right side - Grid of 3 products */}
            <div className="flex flex-col gap-4">
                {/* Top product */}
                <div
                    className="group relative bg-black text-white rounded-lg overflow-hidden h-64"
                    onMouseEnter={() => handleHover('pl100b', true)}
                    onMouseLeave={() => handleHover('pl100b', false)}
                >
                    <img
                        src={slider1}
                        alt="Product Name"
                        className="w-full h-full object-cover transition-all duration-500"
                        style={{
                            opacity: hoveredItems.pl100b ? 0.3 : 0.4,
                            transform: hoveredItems.pl100b ? 'scale(1.05)' : 'scale(1)'
                        }}
                    />

                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <h1
                            className={`
                            text-5xl md:text-6xl font-bold mb-4 transition-all duration-700 ease-out
                            ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                          `}
                        >
                            PL-100B
                        </h1>

                        <Link
                            to="/store"
                            className={`
                            bg-red-600 hover:bg-red-500
                            px-6 py-3 rounded-lg
                            font-medium transition-all
                            ${hoveredItems.pl100b ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                            duration-300
                          `}
                        >
                            EXPLORE MORE
                        </Link>
                    </div>
                </div>

                {/* Bottom two products side by side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* First small product */}
                    <div
                        className="group relative bg-black text-white rounded-lg overflow-hidden h-64"
                        onMouseEnter={() => handleHover('colbor', true)}
                        onMouseLeave={() => handleHover('colbor', false)}
                    >
                        <img
                            src={slider2}
                            alt="COLBOR"
                            className="w-full h-full object-cover transition-all duration-500"
                            style={{
                                opacity: hoveredItems.colbor ? 0.3 : 0.4,
                                transform: hoveredItems.colbor ? 'scale(1.05)' : 'scale(1)'
                            }}
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                            <h1
                                className={`
                                text-xl md:text-2xl font-bold mb-4 transition-all duration-700 ease-out
                                ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}
                              `}
                            >
                                COLBOR
                            </h1>
                            <Link
                                to="/store"
                                className={`
                                bg-red-600 hover:bg-red-500
                                px-4 py-2 rounded-lg
                                text-sm font-medium transition-all
                                ${hoveredItems.colbor ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                                duration-300
                              `}
                            >
                                EXPLORE MORE
                            </Link>
                        </div>
                    </div>

                    {/* Second small product */}
                    <div
                        className="group relative bg-black text-white rounded-lg overflow-hidden h-64"
                        onMouseEnter={() => handleHover('wiTalk', true)}
                        onMouseLeave={() => handleHover('wiTalk', false)}
                    >
                        <img
                            src={slider3}
                            alt="WiTalk"
                            className="w-full h-full object-cover transition-all duration-500"
                            style={{
                                opacity: hoveredItems.wiTalk ? 0.3 : 0.4,
                                transform: hoveredItems.wiTalk ? 'scale(1.05)' : 'scale(1)'
                            }}
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                            <h1
                                className={`
                                text-xl md:text-2xl font-bold mb-4 transition-all duration-700 ease-out
                                ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
                              `}
                            >
                                WiTalk
                            </h1>
                            <Link
                                to="/store"
                                className={`
                                bg-red-600 hover:bg-red-500
                                px-4 py-2 rounded-lg
                                text-sm font-medium transition-all
                                ${hoveredItems.wiTalk ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                                duration-300
                              `}
                            >
                                EXPLORE MORE
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}