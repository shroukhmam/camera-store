import React, { useState } from 'react';
import brandsData from '../data/brands.json';

const Brands = () => {
  const [tooltip, setTooltip] = useState({ visible: false, name: '', x: 0, y: 0 });

  const showTooltip = (e, name) => {
    const x = e.clientX;
    const y = e.clientY;
    setTooltip({ visible: true, name, x, y });
  };

  const hideTooltip = () => {
    setTooltip({ visible: false, name: '', x: 0, y: 0 });
  };

  return (
<div className="w-full px-[120px] pt-3 pb-10 relative">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-10 gap-y-5">
        {brandsData.map((brand) => (
          <div
            key={brand.id}
            className="w-full h-[125px] flex items-center justify-center"
          >
            <a
              href={brand.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full flex items-center justify-center"
              onMouseEnter={(e) => showTooltip(e, brand.name)}
              onMouseMove={(e) => showTooltip(e, brand.name)}
              onMouseLeave={hideTooltip}
            >
              <img
                src={brand.img}
                alt={brand.name}
                className="max-w-full max-h-full object-contain"
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                  e.target.className = 'max-w-full max-h-full object-contain opacity-70';
                }}
              />
            </a>
          </div>
        ))}
      </div>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="fixed z-50 bg-white text-gray-800 text-xs px-2 py-1 rounded shadow-md pointer-events-none"
          style={{
            top: tooltip.y + 15,
            left: tooltip.x + 10,
            transform: 'translate(-50%, 0)',
            whiteSpace: 'nowrap',
          }}
        >
          {tooltip.name}
        </div>
      )}
    </div>
  );
};

export default Brands;
