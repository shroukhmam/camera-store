import React, {useEffect, useState} from "react";
import slider1 from '../../public/assets/images/slider1.png';
import slider2 from '../../public/assets/images/slider2.jpeg';
import slider3 from '../../public/assets/images/slider3.png';

export default function DJIOfferBanner() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);

    }, [])
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {/* Left side - Updated design with slider effect */}
            <div className="md:col-span-2 relative bg-gray-900 text-white rounded-lg overflow-hidden h-[543px]">
                {/* Background image */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-50"
                    style={{
                        backgroundImage: "url('//camerashop.com.eg/wp-content/uploads/revslider/video-media/for-webiste_200.jpeg')"
                    }}
                ></div>

                {/* Video background (autoplay muted) */}
                <video
                    autoPlay
                    muted
                    loop
                    className="absolute inset-0 w-full h-full object-cover opacity-70"
                >
                    <source src="//camerashop.com.eg/wp-content/uploads/2025/06/for-webiste.mov" type="video/mp4" />
                </video>

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    {/* DJI MIC MINI title with text shadow */}
                    <h2
                        className="text-5xl md:text-6xl font-extrabold mb-4 uppercase"
                        style={{
                            fontFamily: "'Lilita One', sans-serif",
                            textShadow: '0 0 30px rgba(0,0,0,0.5)',
                            lineHeight: '1.2'
                        }}
                    >
                        DJI MIC MINI
                    </h2>

                    {/* Special offer text with yellow color */}
                    <p
                        className="text-yellow-300 text-xl md:text-2xl font-semibold mb-4 uppercase"
                        style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            textShadow: '0 0 30px #000',
                            letterSpacing: '1px'
                        }}
                    >
                        SPECIAL OFFER ONLY FOR 7000EGP
                    </p>
                </div>
            </div>

            {/* Right side - Grid of 3 products */}
            <div className="flex flex-col gap-4">
                {/* Top product */}
                <div className="group relative bg-black text-white rounded-lg overflow-hidden h-64">
                    <img
                        src={slider1}
                        alt="Product Name"
                        className="w-full h-full object-cover opacity-40 group-hover:opacity-30 transition-opacity duration-300"
                    />

                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <h1
                            className={`
                            text-5xl md:text-6xl font-bold mb-4 transition-all duration-1000 ease-out
                            ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                          `}
                        >
                            PL-100B
                        </h1>

                        <a
                            href="/product-link"
                            className="
                            bg-red-600 hover:bg-red-700
                            px-6 py-3 rounded-lg
                            font-medium transition-all
                            opacity-0 group-hover:opacity-100
                            transform translate-y-4 group-hover:translate-y-0
                            duration-300
                          "
                        >
                            EXPLORE MORE
                        </a>
                    </div>
                </div>

                {/* Bottom two products side by side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* First small product */}
                    <div className="group relative bg-black text-white rounded-lg overflow-hidden h-64">
                        <img
                            src={slider2}
                            alt="COLBOR"
                            className="w-full h-full object-cover opacity-40 group-hover:opacity-30 transition-opacity duration-300"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                            <h1
                                className={`
                                    text-xl md:text-2xl font-bold mb-4 transition-all duration-700 ease-out
                                    ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}
                                  `}
                            >
                                COLBOR
                            </h1>                            <a
                                href="/product-link"
                                className="
                                bg-red-600 hover:bg-red-700
                                px-4 py-2 rounded-lg
                              text-sm font-medium transition-all
                              opacity-0 group-hover:opacity-100
                              transform translate-y-4 group-hover:translate-y-0
                              duration-300
                              "
                            >
                                EXPLORE MORE
                            </a>
                        </div>
                    </div>

                    {/* Second small product */}
                    <div className="group relative bg-black text-white rounded-lg overflow-hidden h-64">
                        <img
                            src={slider3}
                            alt="WiTalk"
                            className="w-full h-full object-cover opacity-40 group-hover:opacity-30 transition-opacity duration-300"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                            <h1
                                className={`
                                text-xl md:text-2xl font-bold mb-4 transition-all duration-700 ease-out
                                ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
                              `}
                            >
                                WiTalk
                            </h1>                            <a
                                href="/product-link"
                                className="
                                bg-red-600 hover:bg-red-700
                                  px-4 py-2 rounded-lg
                                  text-sm font-medium transition-all
                                  opacity-0 group-hover:opacity-100
                                  transform translate-y-4 group-hover:translate-y-0
                                  duration-300
                              "
                            >
                                EXPLORE MORE
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}