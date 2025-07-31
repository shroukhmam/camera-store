import React, { useState, useRef } from 'react';
import brandsData from '../data/brands.json';
import {Link} from "react-router-dom";

const Brands = () => {
  const [tooltip, setTooltip] = useState({ visible: false, name: '', x: 0, y: 0 });
  const hoverTimeoutRef = useRef(null); // لتخزين مؤقت التأخير

  const showTooltip = (e, name) => {
    // إلغاء أي مؤقت سابق (إذا كان هناك)
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // تأخير ظهور الـ Tooltip لمدة 1 ثانية (1000 مللي ثانية)
    hoverTimeoutRef.current = setTimeout(() => {
      const x = e.clientX;
      const y = e.clientY;
      setTooltip({ visible: true, name, x, y });
    }, 1000); // ⏳ التعديل هنا: 1000ms = 1 ثانية
  };

  const hideTooltip = () => {
    // إلغاء المؤقت إذا تم إبعاد الماوس قبل انتهاء الوقت
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setTooltip({ visible: false, name: '', x: 0, y: 0 });
  };

  return (

      <div className="w-full bg-gray-100 px-[120px] pt-3 pb-10 relative">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-10 gap-y-5">
        {brandsData.map((brand) => (
          <div
            key={brand.id}
            className="w-full h-[125px] flex items-center justify-center"
          >
            <Link
                to={`${brand.name}`}
              className="block w-full h-full flex items-center justify-center"
              onMouseEnter={(e) => showTooltip(e, brand.name)} // بدء المؤقت عند الهوفر
              onMouseLeave={hideTooltip} // إخفاء الـ Tooltip وإلغاء المؤقت
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
            </Link>
          </div>
        ))}
      </div>

      {/* Tooltip يظهر بعد 1 ثانية من الوقوف بالماوس */}
      {tooltip.visible && (
        <div
          className="fixed z-50 bg-gray-800 text-white text-sm px-3 py-1.5 rounded-md shadow-lg pointer-events-none"
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