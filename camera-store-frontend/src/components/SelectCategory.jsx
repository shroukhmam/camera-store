import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import categoriesData from "../data/megaMenu.json";

const SelectCategory = ({ selected, setSelected }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();
    const buttonRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                !buttonRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleCategoryClick = (categoryName, subcategoryName = null) => {
        const selection = subcategoryName ? `${categoryName} > ${subcategoryName}` : categoryName;
        setSelected(selection);
        setOpen(false);
    };

    // Flatten all categories and subcategories into a single list
    const getCategoryList = () => {
        const result = [];
        categoriesData.forEach(category => {
            // Add main category
            result.push({
                id: category.id,
                name: category.name,
                type: 'category'
            });

            // Add subcategories if they exist
            if (category.subcategories && category.subcategories.length > 0) {
                category.subcategories.forEach(subcategory => {
                    result.push({
                        id: subcategory.id,
                        name: subcategory.name,
                        type: 'subcategory',
                        parentName: category.name
                    });
                });
            }
        });
        return result;
    };

    const categoryList = getCategoryList();

    // Render the dropdown menu
    const dropdown = open && buttonRef.current
        ? ReactDOM.createPortal(
            <div
                ref={dropdownRef}
                className="absolute bg-white border border-orange-300 rounded-md mt-1 shadow-lg w-full max-h-60 overflow-y-auto"
                style={{
                    position: "absolute",
                    top: buttonRef.current.getBoundingClientRect().bottom + window.scrollY,
                    left: buttonRef.current.getBoundingClientRect().left,
                    width: buttonRef.current.offsetWidth,
                    zIndex: 9999,
                }}
            >
                <ul className="py-1">
                    <li className="px-3 py-2 text-sm font-medium text-gray-500 border-b border-orange-100">
                        SELECT CATEGORY
                    </li>
                    {categoryList.map((item) => (
                        <li
                            key={item.id}
                            className={`px-3 py-2 text-sm cursor-pointer transition-colors duration-150 ${
                                item.type === 'category'
                                    ? 'font-medium text-gray-900 hover:bg-orange-50'
                                    : 'pl-6 text-gray-600 hover:bg-orange-50'
                            } ${
                                selected === item.name ||
                                (item.type === 'subcategory' && selected === `${item.parentName} > ${item.name}`)
                                    ? 'bg-orange-100 text-orange-600'
                                    : ''
                            }`}
                            onClick={() => handleCategoryClick(
                                item.type === 'category' ? item.name : item.parentName,
                                item.type === 'subcategory' ? item.name : null
                            )}
                        >
                            {item.type === 'subcategory' && '• '}{item.name}
                        </li>
                    ))}
                </ul>
            </div>,
            document.getElementById("dropdown-root")
        )
        : null;

    return (
        <>
            <button
                ref={buttonRef}
                onClick={() => setOpen(!open)}
                className={`w-full border border-orange-300 rounded-md px-3 py-2 text-left bg-white text-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors duration-150 ${
                    open ? 'ring-1 ring-orange-500' : ''
                }`}
            >
                {selected || "SELECT CATEGORY"}
            </button>
            {dropdown}
        </>
    );
};

export default SelectCategory;