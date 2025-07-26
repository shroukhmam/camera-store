import React, { useState, useEffect, useRef } from "react";
import menuData from "../data/megaMenu.json";

const SIDEBAR_COLLAPSED = 64;
const SIDEBAR_EXPANDED = 256;

export default function MegaMenu() {
    const [open, setOpen] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
    const hoverTimeout = useRef(null);

    useEffect(() => {
        if (!isMobile) {
            document.body.style.overflow = open ? "hidden" : "auto";
        }
    }, [open, isMobile]);

    const handleMouseEnter = () => {
        if (!isMobile) {
            clearTimeout(hoverTimeout.current);
            hoverTimeout.current = setTimeout(() => setOpen(true), 200);
        }
    };

    const handleMouseLeave = () => {
        if (!isMobile) {
            clearTimeout(hoverTimeout.current);
            hoverTimeout.current = setTimeout(() => {
                setOpen(false);
                setHoveredCategory(null);
            }, 300);
        }
    };

    const closeMenu = () => {
        setOpen(false);
        setHoveredCategory(null);
    };

    const getSubmenuLeft = () =>
        `${open ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED}px`;

    return (
        <>
            {!isMobile && open && (
                <div onClick={closeMenu} className="fixed inset-0 bg-black/30 z-40" />
            )}

            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`bg-white shadow-lg border-r h-screen z-50 transition-all duration-200 ease-in-out
          ${isMobile ? "w-full fixed top-0 left-0" : open ? "w-64 fixed top-0 left-0" : "w-16 fixed top-0 left-0"}
        `}
            >
                <div
                    className="flex items-center justify-between p-4 bg-orange-500 text-white font-bold cursor-pointer"
                    onClick={() => isMobile && setOpen(!open)}
                >
                  <span className={`${open ? "block" : "hidden"} transition-all overflow-hidden whitespace-nowrap`}>
                    All Categories
                  </span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </div>

                <ul className="divide-y divide-gray-100">
                    {menuData.map((category) => (
                        <li
                            key={category.id}
                            className="relative group"
                            onMouseEnter={() => !isMobile && setHoveredCategory(category.id)}
                            onMouseLeave={() => !isMobile && setHoveredCategory(null)}
                        >
                            <button
                                className={`w-full text-left px-4 py-3 flex items-center gap-2 hover:bg-gray-100 text-[14px] font-normal
                  ${hoveredCategory === category.id ? "text-orange-500" : "text-gray-700"}
                `}
                                onClick={() => {
                                    if (isMobile) {
                                        setHoveredCategory(hoveredCategory === category.id ? null : category.id);
                                    }
                                }}
                            >
                                {category.icon && (
                                    <img
                                        src={category.icon}
                                        alt={category.name}
                                        className="w-5 h-5"
                                        style={{
                                            filter:
                                                "invert(42%) sepia(98%) saturate(1446%) hue-rotate(9deg) brightness(102%) contrast(104%)",
                                        }}
                                    />
                                )}
                                {open && <span>{category.name}</span>}
                            </button>

                            {!isMobile && open && hoveredCategory === category.id && (
                                <div
                                    className="fixed top-0 bg-white shadow-lg border z-50 rounded-r-xl overflow-y-auto w-40"
                                    style={{
                                        left: getSubmenuLeft(),
                                        height: "100vh",
                                    }}
                                >
                                    <div className="flex flex-col p-4 h-full">
                                        {category.types?.length > 0 && (
                                            <div className="mb-4">
                                                <div className="text-[15px] font-medium text-gray-800 mb-2">Types</div>
                                                <ul className="pl-2 text-[14px] font-normal text-gray-600">
                                                    {category.types.map((type) => (
                                                        <li key={type.id} className="py-1">
                                                            {type.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {category.brands?.length > 0 &&
                                            category.brands.map((brand) => (
                                                <div key={brand.id} className="mb-4">
                                                    <div className="text-[15px] font-medium text-gray-800">{brand.name}</div>
                                                    {brand.types?.length > 0 && (
                                                        <ul className="pl-4 text-[14px] font-normal text-gray-600">
                                                            {brand.types.map((type) => (
                                                                <li key={type.id} className="py-1">
                                                                    {type.name}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            ))}

                                        {!category.types?.length && !category.brands?.length && (
                                            <div className="text-gray-500 italic">No items available</div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {isMobile && hoveredCategory === category.id && (
                                <div className="bg-gray-50 px-4 py-2">
                                    {category.types?.length > 0 && (
                                        <div className="mb-2">
                                            <div className="font-semibold text-gray-800">Types</div>
                                            <ul className="pl-2 text-sm text-gray-600">
                                                {category.types.map((type) => (
                                                    <li key={type.id} className="py-1">{type.name}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {category.brands?.map((brand) => (
                                        <div key={brand.id} className="mb-2">
                                            <div className="font-semibold">{brand.name}</div>
                                            {brand.types?.length > 0 && (
                                                <ul className="pl-4 text-sm text-gray-600">
                                                    {brand.types.map((type) => (
                                                        <li key={type.id} className="py-1">
                                                            {type.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}

                                    {!category.types?.length && !category.brands?.length && (
                                        <div className="text-gray-500 italic">No items available</div>
                                    )}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
