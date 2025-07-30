import React from "react";

const Release = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 px-8 py-6 bg-gray-100">
      {/* Left Black Box */}
      <div className="lg:w-1/4 w-full bg-black text-white rounded-xl flex flex-col justify-between px-6 py-8 min-h-[550px] relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/60 z-0 group-hover:from-black/70 group-hover:to-black/50 transition-all duration-700"></div>
        
        {/* Background Image with Light Effect */}
        <img
          src="https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
          alt="Camera Equipment"
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-110 z-0"
        />
        
        {/* Light Effect Container */}
        <div className="absolute inset-0 z-10">
          {/* Light Effect - Only appears on hover */}
          <div className="absolute inset-0 bg-gradient-radial from-yellow-200/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        
{/* Content */}
<div className="relative z-20 space-y-2 pl-8">
  <h2 className="text-3xl font-bold mb-2 text-orange-400 group-hover:text-orange-300 transition-colors duration-300">
    700W PRO
  </h2>
  <h3 className="text-xl font-semibold leading-snug tracking-wide">Think Bigger</h3>
  <h3 className="text-xl font-semibold leading-snug tracking-wide">Think Brighter</h3>
  <p className="text-sm text-gray-300 mt-6 mb-4 opacity-90">
    Bi-Color 700w Studio Quality
  </p>
  <a
    href="#"
    className="inline-block px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg group-hover:shadow-orange-500/50"
  >
    Explore More →
  </a>
</div>
      </div>

      {/* Title Section */}
      <div className="lg:w-3/4 w-full flex flex-col justify-start items-start pt-2">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">New Release ...</h2>
        {/*  cardssssssssssssssssssss    */}
      </div>
    </div>
  );
};

export default Release;