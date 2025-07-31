import React, { useState, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import {Link} from "react-router-dom";

const Exclusives = () => {
  return (
    <div className="w-full space-y-8 py-8"> {/* Added vertical spacing */}
      {/* First Row - First slider takes full width */}
      <div className="w-full">
        <Slider1 />
      </div>
      
      {/* Second Row - Two sliders side by side */}
      <div className="flex flex-col md:flex-row w-full gap-4 px-4"> {/* Added horizontal gap and padding */}
        {/* Second Slider */}
        <div className="w-full md:w-1/2">
          <Slider2 />
        </div>
        
        {/* Third Slider */}
        <div className="w-full md:w-1/2">
          <Slider3 />
        </div>
      </div>
      
      {/* Third Row - Fourth slider takes full width */}
      <div className="w-full">
        <Slider4 />
      </div>
    </div>
  );
};

// First Slider Component (unchanged)
const Slider1 = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      brand: "CANON",
      title: "R5 MARK II",
      description: "Master the moment",
      buttonText: "GET STARTED",
      buttonLink: "https://camerashop.com.eg/product/canon-eos-r5-mark-ii-mirrorless-camera/",
      image: "https://camerashop.com.eg/wp-content/uploads/2025/03/eos-r5-mark-ii_hotspot_01_fb19f9f34ed54fcfb72dc871f9275f46.webp"
    },
    {
      brand: "SENNHEISER",
      title: "Profile 2-Person",
      description: "Ultra-compact Wireless Microphone",
      buttonText: "GET STARTED",
      buttonLink: "https://camerashop.com.eg/product/sennheiser-profile-2-person-clip-on-wireless-audio-system-recorder-for-camera-smartphone-2-4-ghz-black/",
      image: "https://camerashop.com.eg/wp-content/uploads/2025/03/SennheiserFullWidth.webp"
    },
    {
      brand: "SanDisk",
      title: "Extreme PRO CFast 2.0",
      description: "SanDisk 64GB Extreme PRO CFast 2.0 Memory Card",
      buttonText: "GET STARTED",
      buttonLink: "https://camerashop.com.eg/product/sandisk-64gb-extreme-pro-cfast-2-0-memory-card/",
      image: "https://camerashop.com.eg/wp-content/uploads/2025/03/extreme-pro-cfast-2-0-64gb.png.wdthumb.1280.1280.png"
    },
    {
      brand: "RODE",
      title: "Wireless Micro 2-Person",
      description: "Ultra-compact Wireless Microphone",
      buttonText: "GET STARTED",
      buttonLink: "https://camerashop.com.eg/product/rode-wireless-micro-2-person-ultracompact-wireless-microphone-system-with-usb-c-connector-2-4-ghz-black/",
      image: "https://camerashop.com.eg/wp-content/uploads/2025/03/rode-wireless-micro-black-3Q-USB-4000x4000-rgb-2000x2000-724898e.png"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[676px] bg-[#0c0808] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="https://camerashop.com.eg/wp-content/uploads/revslider/Cosmic-Odyssey-Animated-Slider-Template/skybg333.jpg" 
          alt="background" 
          className="w-full h-full object-cover"
        />
        <img 
          src="https://camerashop.com.eg/wp-content/uploads/revslider/Cosmic-Odyssey-Animated-Slider-Template/planetsurface-reduced.webp" 
          alt="planet surface" 
          className="absolute bottom-0 w-[120%] left-1/2 transform -translate-x-1/2"
        />
      </div>

      {/* Main slider container */}
      <div className="relative w-[90%] h-[80%] max-w-[1700px] mx-auto top-[67px] left-[46px]">
        <div className="absolute inset-0 border-2 border-white"></div>

        <div className="absolute top-[30px] left-1/2 transform -translate-x-1/2 text-[145px] font-bold text-[#161c2b] text-center font-kanit leading-[150px]">
          {slides[activeSlide].brand}
        </div>

        <div className="absolute top-[135px] left-1/2 transform -translate-x-1/2 text-[150px] font-bold text-white text-center font-kanit leading-[150px]">
          {slides[activeSlide].title}
        </div>

        <div className="absolute bottom-0 w-full h-[50%] bg-gradient-to-t from-[#0d0a08] via-[#0d0a08] to-transparent"></div>

        <div className="absolute top-[172px] left-[269px] w-[600px] h-[400px]">
          <img 
            src={slides[activeSlide].image} 
            alt={slides[activeSlide].title} 
            className="w-full h-full object-contain"
          />
        </div>

        <div className="absolute top-[90px] left-[81px] w-[900px] h-[400px] bg-gradient-to-r from-[rgba(7,7,7,0.75)] via-[rgba(74,255,247,0.75)] to-[rgba(7,7,7,0.75)] opacity-50 blur-[70px]"></div>

        <div className="absolute bottom-[10px] left-[-15px] w-[35%] bg-[#0b0b11] border-t-2 border-r-2 border-white pt-[30px] px-[40px] pb-[23px] -skew-x-[7deg]">
          <p className="text-white text-[15px] font-light font-kanit leading-[20px] skew-x-[7deg]">
            {slides[activeSlide].description}
          </p>
        </div>

        <a 
          href={slides[activeSlide].buttonLink} 
          className="absolute bottom-[10px] right-[-10px] bg-[#0b0b11] text-white text-[19px] font-bold font-kanit leading-[53px] px-[30px] border-t-2 border-l-2 border-white -skew-x-[7deg] hover:text-[#35cee7] transition-all duration-300"
        >
          <span className="inline-block skew-x-[7deg]">{slides[activeSlide].buttonText}</span>
        </a>

        <button 
          onClick={prevSlide}
          className="absolute left-[-10px] top-1/2 transform -translate-y-1/2 w-[53px] h-[53px] bg-[#0b0b11] border-r-2 border-t-2 border-b-2 border-white -skew-x-[7deg] flex items-center justify-center hover:bg-[#0b0b11] transition-all duration-300"
        >
          <FaAngleLeft className="text-white skew-x-[7deg]" />
        </button>

        <button 
          onClick={nextSlide}
          className="absolute right-[-10px] top-1/2 transform -translate-y-1/2 w-[53px] h-[53px] bg-[#0b0b11] border-l-2 border-t-2 border-b-2 border-white -skew-x-[7deg] flex items-center justify-center hover:bg-[#0b0b11] transition-all duration-300"
        >
          <FaAngleRight className="text-white skew-x-[7deg]" />
        </button>

        <div className="absolute top-[152px] right-[729px] w-[188px] h-[188px]">
          <img 
            src="https://camerashop.com.eg/wp-content/uploads/revslider/Cosmic-Odyssey-Animated-Slider-Template/probe33-reduced.webp" 
            alt="probe" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

// Second Slider Component (updated height)
const Slider2 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "WiTalk",
      subtitle: "SARAMONIC",
      description: "The WiTalk-WT3D & WT5D is a 3&5-person full-duplex wireless intercom with dual-ear headsets, a 1312-ft range, long battery life, and a durable hard case—perfect for film, TV, and stage.",
      image: "https://camerashop.com.eg/wp-content/uploads/2025/03/2024090518002027.png",
      link: "https://camerashop.com.eg/product/saramonic-witalk-wt5d-5-person-full-duplex-wireless-intercom-system-with-dual-ear-headsets-1-9-ghz/"
    },
    {
      title: "Blink Me",
      subtitle: "SARAMONIC",
      description: "The BlinkMe 2.4GHz wireless smart microphone features a touchscreen with Saramonic OS, broadcast-quality sound, onboard recording, and customizable themes—perfect for creators, filmmakers, and streamers.",
      image: "https://camerashop.com.eg/wp-content/uploads/2025/03/srgv0qx7osd3c4dfrlbf__37467.png",
      link: "https://camerashop.com.eg/product/saramonic-blink-me-2-person-2/"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] bg-black overflow-hidden"> {/* Fixed height */}
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://camerashop.com.eg/wp-content/uploads/revslider/Cosmic-Odyssey-Animated-Slider-Template/nightskybg21.jpg" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Planet background */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-1/2">
        <img 
          src="https://camerashop.com.eg/wp-content/uploads/revslider/Cosmic-Odyssey-Animated-Slider-Template/planetbg2-resized.webp" 
          alt="Planet" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Slide content */}
      <div className="relative z-20 h-full flex items-center justify-center px-4">
        <div className="w-full max-w-6xl mx-auto border-2 border-white relative h-[400px]">
          {/* Navigation arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black p-2 border-l-2 border-t-2 border-b-2 border-white z-30 hover:bg-gray-900 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
            </svg>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black p-2 border-r-2 border-t-2 border-b-2 border-white z-30 hover:bg-gray-900 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>
          
          {/* Product image */}
          <div className="absolute left-1/4 top-1/2 -translate-y-1/2 z-20 w-64 h-64">
            <img 
              src={slides[currentSlide].image} 
              alt={slides[currentSlide].title} 
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* Title */}
          <div className="absolute top-16 left-0 right-0 text-center">
            <h2 className="text-7xl font-bold text-gray-800">{slides[currentSlide].subtitle}</h2>
            <h3 className="text-6xl font-bold text-white mt-4">{slides[currentSlide].title}</h3>
          </div>
          
          {/* Description */}
          <div className="absolute bottom-16 left-4 w-1/3 bg-black p-4 border-r-2 border-t-2 border-white">
            <p className="text-white text-sm">{slides[currentSlide].description}</p>
          </div>
          
          {/* CTA button */}
          <a 
            href={slides[currentSlide].link} 
            className="absolute bottom-16 right-4 bg-black px-6 py-3 text-white border-l-2 border-t-2 border-white hover:bg-orange-600 transition"
          >
            Take Me Studio
          </a>
        </div>
      </div>
    </div>
  );
};

// Third Slider Component (updated height)
const Slider3 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "SYNCO XTALK XPRO",
      subtitle: "THE NEXT-LEVEL COMMUNICATION SYSTEM",
      description: "The SYNCO Xtalk XPro 2-way intercom upgrades the Xtalk with dual external antennas for stronger signals and a 500m range. It supports 13-unit connections and MasterFree technology for multiple groups.",
      image: "https://camerashop.com.eg/wp-content/uploads/revslider/solar-system-showcase-slider/main-bg-11.jpg",
      link: "https://camerashop.com.eg/synco-intercom/"
    },
    {
      title: "SECOND SLIDE",
      subtitle: "SECOND SUBTITLE",
      description: "Description for the second slide goes here.",
      image: "https://example.com/second-image.jpg",
      link: "#"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] bg-black overflow-hidden"> {/* Fixed height */}
      {/* Background with parallax effect */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${slides[currentSlide].image})`,
          transform: 'translate3d(0px, 0px, 0px) scale(1)'
        }}
      ></div>
      
      {/* Main content */}
      <div className="relative z-10 h-full w-full flex flex-col">
        {/* Top zone */}
        <div className="flex-1 flex items-center justify-center px-12 py-8">
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-3 gap-8">
              {/* Left column */}
              <div className="col-span-1">
                <div className="text-white font-manrope text-sm mb-4">
                  {currentSlide + 1} / {slides.length}
                </div>
                <div className="text-white/60 font-manrope text-xs leading-relaxed mb-8">
                  {slides[currentSlide].description}
                </div>
                <a 
                  href={slides[currentSlide].link} 
                  className="inline-block text-white font-manrope text-xs uppercase border-b border-white/35 pb-1 hover:border-white transition"
                >
                  LEARN MORE
                </a>
              </div>
              
              {/* Middle column */}
              <div className="col-span-1 flex flex-col items-center justify-center">
                <h1 className="text-white font-bebas text-6xl uppercase text-center leading-none mb-4">
                  {slides[currentSlide].title.split(' ').map((word, i) => (
                    <div key={i}>{word}</div>
                  ))}
                </h1>
                <div className="text-white font-manrope text-xs uppercase font-extrabold tracking-wider">
                  {slides[currentSlide].subtitle}
                </div>
              </div>
              
              {/* Right column (empty in this example) */}
              <div className="col-span-1"></div>
            </div>
          </div>
        </div>
        
        {/* Bottom zone with navigation */}
        <div className="px-12 pb-8">
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-3">
              {/* Left navigation */}
              <div className="col-span-1 flex items-center">
                <button 
                  onClick={prevSlide}
                  className="text-white/50 font-bebas uppercase text-sm hover:text-white transition flex items-center"
                >
                  <span className="mr-2">PREV</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
                  </svg>
                </button>
              </div>
              
              {/* Middle (empty in this example) */}
              <div className="col-span-1"></div>
              
              {/* Right navigation */}
              <div className="col-span-1 flex items-center justify-end">
                <button 
                  onClick={nextSlide}
                  className="text-white/50 font-bebas uppercase text-sm hover:text-white transition flex items-center"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    className="w-4 h-4 mr-2"
                  >
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                  </svg>
                  <span>NEXT</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Button */}
      <a 
        href="https://camerashop.com.eg/synco-intercom/" 
        target="_self"
        className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white font-oswald font-medium text-xl px-16 py-4 rounded-md shadow-lg hover:bg-gradient-to-r from-orange-500 to-pink-600 hover:brightness-120 transition-all duration-300"
        style={{
          boxShadow: '0 5px 20px 0 rgba(70, 29, 125, 0.5)'
        }}
      >
        <Link to={'/store'}> EXPLORE MORE </Link>
      </a>
      
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-transparent z-20">
        <div 
          className="h-full bg-white/50" 
          style={{
            width: `${(currentSlide + 1) / slides.length * 100}%`,
            transition: 'width 0.5s ease'
          }}
        ></div>
      </div>
    </div>
  );
};

// Fourth Slider Component (unchanged)
const Slider4 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "GK-PANEL",
      description: "The GK-Panel 700B & 400B Bi-Color Light Panels deliver professional-grade lighting with 700W (600W output) and 400W (340W output) power options...",
      image: "https://camerashop.com.eg/wp-content/uploads/2025/03/gk-panel-700b-bi-color-light-panel-866084-1.png",
      bgImage: "https://camerashop.com.eg/wp-content/uploads/revslider/Urban-Oven-Pizza-Slider-Template/bg1.jpg",
      ctaLink: "https://camerashop.com.eg/tolifo-2/",
      color: "bg-red-600"
    },
    {
      title: "SK-SERIES",
      description: "The Tolifo SK-D7000BL & SK-D7000SL LED Video Lights deliver professional-grade lighting solutions for filmmakers, videographers, and photographers...",
      image: "https://camerashop.com.eg/wp-content/uploads/2025/03/sk-d7000bl-bi-color-led.png",
      bgImage: "https://camerashop.com.eg/wp-content/uploads/revslider/Urban-Oven-Pizza-Slider-Template/bg2.jpg",
      ctaLink: "#",
      color: "bg-orange-500"
    },
    {
      title: "X-SERIES",
      description: "The Tolifo X-Series LED Lights—X-200 (200W), X-350 (350W), and X-500 (460W)—deliver powerful, adjustable lighting with a 2700K-6500K range...",
      image: "https://camerashop.com.eg/wp-content/uploads/2025/03/x-500b-lite-bi-color.png",
      bgImage: "https://camerashop.com.eg/wp-content/uploads/revslider/Urban-Oven-Pizza-Slider-Template/bg5.jpg",
      ctaLink: "#",
      color: "bg-teal-600"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000"
        style={{ 
          backgroundImage: `url(${slides[currentSlide].bgImage})`,
          opacity: 1
        }}
      ></div>
      
      {/* Overlay shape */}
      <div className={`absolute inset-0 z-1 ${slides[currentSlide].color} opacity-90 clip-path-slide`}></div>
      
      {/* Logo */}
      <div className="absolute z-10 top-8 left-1/2 transform -translate-x-1/2 w-24 h-24">
        <img 
          src="https://camerashop.com.eg/wp-content/uploads/2025/03/53c47b6abc3eb4a6587d60dbd7bf6335.w1000.h1000._RO49910000000015_FMpng_.png" 
          alt="Logo"
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Product image with rotation effect */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="relative w-96 h-96 rounded-full border-8 border-white/20 backdrop-blur-sm bg-white/15">
            <img 
              src={slides[currentSlide].image} 
              alt={slides[currentSlide].title}
              className="absolute inset-0 w-full h-full object-contain animate-spin-slow"
              style={{ animationDuration: '20s' }}
            />
          </div>
          
          {/* Large title with skew effect */}
          <h1 className="absolute text-white font-bold text-7xl lg:text-9xl uppercase tracking-tighter transform -skew-x-6 -skew-y-3 text-shadow-lg">
            {slides[currentSlide].title}
          </h1>
        </div>
        
        {/* Description and CTA */}
        <div className="pb-16 px-8 text-center">
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            {slides[currentSlide].description}
          </p>
          
          <a 
            href={slides[currentSlide].ctaLink}
            className="inline-block bg-white text-red-600 font-bold text-xl px-12 py-4 rounded-md shadow-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            <Link to={'/store'}> EXPLORE MORE </Link>

          </a>
        </div>
      </div>
      
      {/* Navigation arrows */}
      <button 
        onClick={prevSlide}
        className="absolute z-20 left-8 top-1/2 transform -translate-y-1/2 w-16 h-16 text-white hover:text-gray-200 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 97.69 75.09" fill="currentColor">
          <path d="M33.04,75.09h9c0-13.39-6.29-25.34-16.07-33.04h71.72v-9H25.95C35.74,25.34,42.04,13.4,42.04,0h-9  c0,18.22-14.82,33.04-33.04,33.04v9C18.22,42.04,33.04,56.87,33.04,75.09z"/>
        </svg>
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute z-20 right-8 top-1/2 transform -translate-y-1/2 w-16 h-16 text-white hover:text-gray-200 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 97.69 75.09" fill="currentColor">
          <path d="M64.65,0h-9c0,13.39,6.29,25.34,16.07,33.04H0v9h71.74c-9.79,7.7-16.09,19.65-16.09,33.04h9  c0-18.22,14.82-33.04,33.04-33.04v-9C79.47,33.04,64.65,18.22,64.65,0z"/>
        </svg>
      </button>
      
      {/* View Details button */}
      <div className="absolute z-20 bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center group cursor-pointer">
        <span className="text-white text-lg mb-1 group-hover:text-gray-200 transition">View Details</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white group-hover:text-gray-200 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </div>
      
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
        <div 
          className="h-full bg-white transition-all duration-500"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Exclusives;