import React, { useState, useEffect, useRef } from "react";
import menuData from "../data/megaMenu.json";
import menuItems from "../data/menuItems.json";
import { Link } from "react-router-dom";

const SIDEBAR_COLLAPSED = 64;
const SIDEBAR_EXPANDED = 256;

export default function MegaMenu({ open, setOpen }) {
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

    // ✅ ✅ ✅ MOBILE RENDER
    if (isMobile) {
        if (!open) return null;

        return (
            <>
                {/* Overlay */}
                <div
                    onClick={closeMenu}
                    className="fixed inset-0 bg-black/40 z-40"
                />

                {/* Sidebar Menu */}
                <div className="bg-white shadow-lg w-[80%] fixed top-0 left-0 z-50 max-h-screen overflow-y-auto">
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
                        <div>
                            <ul className="divide-y divide-gray-100">
                                {menuData.map((category) => (
                                    <React.Fragment key={category.id}>
                                        <li>
                                            <Link
                                                to={`/category/${category.id}`}
                                                className={`w-full text-left px-4 py-3 flex items-center justify-between text-[14px] font-medium 
                                                ${hoveredCategory === category.id
                                                    ? "bg-orange-100 text-orange-500"
                                                    : "text-gray-700 hover:bg-gray-100 hover:text-orange-500"}`}
                                                onClick={closeMenu}
                                                onMouseEnter={() => {
                                                    setHoveredCategory(category.id);
                                                }}
                                                onMouseLeave={() => {
                                                    setHoveredCategory(null);
                                                }}
                                            >
                                                <span>{category.name}</span>
                                                {(category.subcategories?.length > 0 || category.brands?.length > 0) && (
                                                    <span
                                                        className={`transition-transform duration-300 ${
                                                            hoveredCategory === category.id
                                                                ? "rotate-180 text-orange-500"
                                                                : "text-gray-400"
                                                        }`}
                                                    >
                                                        ▼
                                                    </span>
                                                )}
                                            </Link>
                                        </li>

                                        {hoveredCategory === category.id && (
                                            <>
                                                {/* Render subcategories if they exist */}
                                                {category.subcategories?.map((subcategory) => (
                                                    <React.Fragment key={`subcategory-${subcategory.id}`}>
                                                        <li className="pl-8">
                                                            <Link
                                                                to={`/category/${subcategory.id}`}
                                                                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-[13px] font-medium text-gray-700 hover:text-orange-500 block"
                                                                onClick={closeMenu}
                                                            >
                                                                {subcategory.name}
                                                            </Link>
                                                        </li>
                                                        {/* Render brands under each subcategory */}
                                                        {subcategory.brands?.map((brand) => (
                                                            <li key={`subcategory-brand-${brand.id}`} className="pl-12">
                                                                <Link
                                                                    to={`/brand/${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
                                                                    className="w-full text-left px-4 py-1 hover:bg-gray-100 text-[13px] text-gray-500 hover:text-orange-500 block"
                                                                    onClick={closeMenu}
                                                                >
                                                                    {brand.name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </React.Fragment>
                                                ))}

                                                {/* Render standalone brands if no subcategories exist */}
                                                {(!category.subcategories || category.subcategories.length === 0) &&
                                                    category.brands?.map((brand) => (
                                                        <li key={`brand-${brand.id}`} className="pl-8">
                                                            <Link
                                                                to={`/brand/${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
                                                                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-[13px] font-medium text-gray-700 hover:text-orange-500 block"
                                                                onClick={closeMenu}
                                                            >
                                                                {brand.name}
                                                            </Link>
                                                        </li>
                                                    ))
                                                }
                                            </>
                                        )}
                                    </React.Fragment>
                                ))}
                            </ul>
                        </div>
                    )}

                    {activeTab === "menu" && (
                        <div className="p-4">
                            <ul className="space-y-3">
                                {menuItems.map((item, index) => (
                                    <li key={index} className="py-2">
                                        <Link
                                            to={item.to}
                                            className="pb-[2px] border-b-2 border-transparent hover:border-orange-300 transition duration-200 cursor-pointer hover:text-orange-500"
                                            onClick={closeMenu}
                                        >
                                            {item.name}
                                        </Link>
                                        <hr />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </>
        );
    }

    // ✅ ✅ ✅ DESKTOP RENDER
    return (
        <>
            {open && (
                <div onClick={closeMenu} className="fixed inset-0 bg-black/30 z-40" />
            )}

            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`bg-white shadow-lg border-r h-screen z-50 transition-all duration-200 ease-in-out
                ${open ? "w-64 fixed top-0 left-0" : "w-16 fixed top-0 left-0"}`}
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
                            <Link
                                to={`/category/${category.id}`}
                                className={`w-full text-left px-4 py-3 flex items-center gap-2 hover:bg-gray-100 text-[14px] font-normal
                                    ${hoveredCategory === category.id ? "text-orange-500" : "text-gray-700 hover:text-orange-500"}`}
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
                            </Link>

                            {open && hoveredCategory === category.id && (
                                <div
                                    className="fixed top-0 bg-white shadow-lg border z-50 rounded-r-xl overflow-y-auto w-40"
                                    style={{
                                        left: getSubmenuLeft(),
                                        height: "100vh",
                                    }}
                                >
                                    <div className="flex flex-col p-4 h-full">
                                        {/* Render subcategories if they exist */}
                                        {category.subcategories?.length > 0 && (
                                            <div className="mb-4">
                                                <ul className="pl-2 text-[14px] font-normal text-gray-600">
                                                    {category.subcategories.map((subcategory) => (
                                                        <div key={subcategory.id} className="mb-3">
                                                            <Link
                                                                to={`/category/${subcategory.id}`}
                                                                className="font-medium text-gray-700 py-1 hover:text-orange-500 block"
                                                            >
                                                                {subcategory.name}
                                                            </Link>
                                                            {/* Render brands under each subcategory */}
                                                            {subcategory.brands?.length > 0 && (
                                                                <ul className="pl-2">
                                                                    {subcategory.brands.map((brand) => (
                                                                        <li key={brand.id} className="py-1">
                                                                            <Link
                                                                                to={`/brand/${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
                                                                                className="text-gray-500 hover:text-orange-500 block"
                                                                            >
                                                                                {brand.name}
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </div>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Render standalone brands if no subcategories exist */}
                                        {(!category.subcategories || category.subcategories.length === 0) &&
                                            category.brands?.length > 0 && (
                                                <div className="mb-4">
                                                    <ul className="pl-2 text-[14px] font-normal text-gray-600">
                                                        {category.brands.map((brand) => (
                                                            <li key={brand.id} className="py-1">
                                                                <Link
                                                                    to={`/brand/${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
                                                                    className="font-medium text-gray-700 hover:text-orange-500 block"
                                                                >
                                                                    {brand.name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )
                                        }

                                        {/* Show message if no content */}
                                        {(!category.subcategories || category.subcategories.length === 0) &&
                                            (!category.brands || category.brands.length === 0) && (
                                                <div className="text-gray-500 italic">No items available</div>
                                            )
                                        }
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