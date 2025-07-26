import React, { useState, useEffect, useRef } from "react";
import menuData from "../data/megaMenu.json";

const SIDEBAR_COLLAPSED = 64;
const SIDEBAR_EXPANDED = 256;

export default function MegaMenu({open, setOpen}) {
   // const [open, setOpen] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [activeTab, setActiveTab] = useState("categories");
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

    // Mobile-specific render
    if (isMobile && !open) {
        return null; // لا تعرض أي حاجة لو مش مفتوح
    }
    if (isMobile && open) {
        return (
            <div className="bg-white shadow-lg w-[80%] fixed top-0 left-0 z-50">
                <div className="flex border-b">
                    <button
                        className={`flex-1 py-3 text-center font-medium ${activeTab === "categories" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600"}`}
                        onClick={() => setActiveTab("categories")}
                    >
                        CATEGORIES
                    </button>
                    <button
                        className={`flex-1 py-3 text-center font-medium ${activeTab === "menu" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600"}`}
                        onClick={() => setActiveTab("menu")}
                    >
                        MENU
                    </button>
                </div>

                {activeTab === "categories" && (
                    <div className="max-h-[calc(100vh-56px)] overflow-y-auto">
                        <ul className="divide-y divide-gray-100">
                            {menuData.map((category) => (
                                <React.Fragment key={category.id}>
                                    {/* Main Category Item */}
                                    <li>
                                        <button
                                            className={`w-full text-left px-4 py-3 flex items-center justify-between text-[14px] font-medium 
              ${hoveredCategory === category.id
                                                ? "bg-orange-100 text-orange-500"
                                                : "text-gray-700 hover:bg-gray-100"}`}
                                            onClick={() => {
                                                setHoveredCategory(hoveredCategory === category.id ? null : category.id);
                                            }}
                                        >
                                            <span>{category.name}</span>
                                            <span
                                                className={`transition-transform duration-300 ${
                                                    hoveredCategory === category.id
                                                        ? "rotate-180 text-orange-500"
                                                        : "text-gray-400"
                                                }`}
                                            >
                ▼
              </span>
                                        </button>
                                    </li>

                                    {/* Sub-items (Types and Brands) */}
                                    {hoveredCategory === category.id && (
                                        <>
                                            {category.types?.map((type) => (
                                                <li key={`type-${type.id}`} className="pl-8">
                                                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-[13px] text-gray-600">
                                                        {type.name}
                                                    </button>
                                                </li>
                                            ))}

                                            {category.brands?.map((brand) => (
                                                <React.Fragment key={`brand-${brand.id}`}>
                                                    <li className="pl-8">
                                                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-[13px] font-medium text-gray-700">
                                                            {brand.name}
                                                        </button>
                                                    </li>
                                                    {brand.types?.map((type) => (
                                                        <li key={`brand-type-${type.id}`} className="pl-12">
                                                            <button className="w-full text-left px-4 py-1 hover:bg-gray-100 text-[13px] text-gray-500">
                                                                {type.name}
                                                            </button>
                                                        </li>
                                                    ))}
                                                </React.Fragment>
                                            ))}
                                        </>
                                    )}
                                </React.Fragment>
                            ))}
                        </ul>
                    </div>
                )}

                {activeTab === "menu" && (
                    <div className="max-h-[calc(100vh-56px)] overflow-y-auto p-4">
                        <ul className="space-y-3">
                            <li className="py-1">Home</li>
                            <li className="py-1">Brands</li>
                        </ul>
                    </div>
                )}
            </div>
        );
    }

    // Desktop render (original functionality - unchanged)
    return (
        <>
            {open && (
                <div onClick={closeMenu} className="fixed inset-0 bg-black/30 z-40" />
            )}

            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`bg-white shadow-lg border-r h-screen z-50 transition-all duration-200 ease-in-out
          ${open ? "w-64 fixed top-0 left-0" : "w-16 fixed top-0 left-0"}
        `}
            >
                <div
                    className="flex items-center justify-between p-4 bg-orange-500 text-white font-bold cursor-pointer"
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
                            onMouseEnter={() => setHoveredCategory(category.id)}
                            onMouseLeave={() => setHoveredCategory(null)}
                        >
                            <button
                                className={`w-full text-left px-4 py-3 flex items-center gap-2 hover:bg-gray-100 text-[14px] font-normal
                  ${hoveredCategory === category.id ? "text-orange-500" : "text-gray-700"}
                `}
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

                            {open && hoveredCategory === category.id && (
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
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}