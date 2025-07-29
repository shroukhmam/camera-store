import React, { useEffect } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Promotions = () => {
  useEffect(() => {
    const camera = document.querySelector('.camera-image');
    if (camera) {
      camera.style.animation = 'float 3s ease-in-out infinite';
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>

      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: 'url(//camerashop.com.eg/wp-content/uploads/2025/03/R5-MARK-II.jpg)' }}
      ></div>

<div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10 w-[90%] max-w-[400px] h-20 sm:h-[80px]">
  <div className="relative w-full h-full border-2 border-red-600 flex items-center justify-center">
    <div className="absolute bottom-0 left-0 w-full h-[8px] bg-red-400"></div>

    <div className="flex space-x-2 z-10 px-2">
      <span className="text-black text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-none">
        new
      </span>
      <span className="text-black text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-none">
        arrival
      </span>
    </div>
  </div>
</div>

<h1 className="absolute top-[30%] left-1/2 transform -translate-x-1/2 z-10 text-white text-2xl sm:text-4xl lg:text-5xl font-black 
text-center leading-tight tracking-tight max-w-[90%] whitespace-nowrap">
  CANON EOS R5 MARK II
</h1>
      {/* Camera Image */}
      <div className="absolute bottom-[130px] left-1/2 transform -translate-x-1/2 z-10 w-[90%] max-w-[500px] h-auto flex justify-center">
        <img 
          src="//camerashop.com.eg/wp-content/uploads/2025/03/canon_eos_r5_mark_ii.png" 
          alt="Canon EOS R5 Mark II" 
          className="camera-image w-full h-auto object-contain"
        />
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-10 left-0 right-0 px-4 sm:px-12 z-10 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <button className="w-12 h-12 sm:w-[70px] sm:h-[70px] bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
            <FaAngleLeft className="text-black text-lg sm:text-2xl" />
          </button>
          <button className="w-12 h-12 sm:w-[70px] sm:h-[70px] bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
            <FaAngleRight className="text-black text-lg sm:text-2xl" />
          </button>
        </div>

        <a 
          className="text-lg sm:text-2xl lg:text-[28px] font-bold text-gray-300 hover:text-orange-500 border-b-2 sm:border-b-4 border-red-600 hover:border-orange-500 transition-all cursor-pointer"
        >
          Take me Home
        </a>
      </div>
    </div>
  );
};

export default Promotions;
