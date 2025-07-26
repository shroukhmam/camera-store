import { useState, useEffect, useRef } from "react";

const rawCategories = [
  "Accessories", "Bags", "Battery & Adapter", "Battery Grip", "Cables", "Charger", "Chroma",
  "Color Checkers", "Screens", "Feelworld", "Viltrox", "SoftBox", "Teleprompters", "Camera",
  "accessories", "Action", "DJI", "GoPro", "DSLR", "Canon", "Mirrorless", "Canon", "Sony",
  "Lens", "accessories", "Canon", "EF & EF-S", "RF & RF-S", "Filters", "CPL", "ND", "UV",
  "LENS HOOD", "SIGMA", "Sony", "Tamron", "Lights", "Compact", "Tolifo", "Yungnou", "Flash",
  "Meike", "RingFlash & Twin Flash", "Heads", "COLBOR", "Godox", "Nanlite", "NiceFoto",
  "Tolifo", "Panel", "Falcon", "Selepro", "Tolifo", "RingLight", "Falcon", "Tolifo", "Stands",
  "Tubes", "Nanlite", "Tolifo", "Memory", "CF Express", "Reader", "SD", "Lexar", "SanDisk",
  "Microphone", "condenser", "Boya", "Jmary", "RODE", "Samson", "Saramonic", "Recorder",
  "ZOOM", "Shotgun", "Boya", "Comica", "LensGo", "RODE", "Saramonic", "Stands", "Wire",
  "Boya", "Saramonic", "Wireless", "Compact", "7ryms", "Boya", "DJI", "Hollyland", "LensGo",
  "RODE", "Saramonic", "professional", "Boya", "RODE", "Saramonic", "Sennheiser", "Printer",
  "Brother", "Canon", "professional Video Camera", "BlackMagic", "Canon", "stabilizer", "DJI",
  "hohem", "Tripods", "Jmary", "Manfrotto", "miliboo", "Sliders", "Velbon", "Weifeng",
  "Yunteng", "Video Mixers"
];

const SelectCategory = ({ selected, setSelected }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDropdownList = () => {
    const list = [...rawCategories];
    if (selected && selected !== "SELECT CATEGORY") {
      return ["SELECT CATEGORY", ...list];
    }
    return list;
  };

  return (
    <div className="relative w-full text-sm z-50" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full border-l border-orange-300 px-3 py-2 text-left bg-white text-gray-600 truncate"
      >
        {selected || "SELECT CATEGORY"}
      </button>

      {open && (
        <ul className="absolute left-0 right-0 bg-white border border-orange-300 rounded mt-1 max-h-60 overflow-y-auto w-full shadow-lg z-[999] text-sm">
          {getDropdownList()
            .filter((cat) => !(selected === "SELECT CATEGORY" && cat === "SELECT CATEGORY"))
            .map((cat, idx) => (
              <li
                key={idx}
                onClick={() => {
                  setSelected(cat);
                  setOpen(false);
                }}
                className={`px-3 py-2 hover:bg-orange-100 cursor-pointer ${
                  cat === selected ? "bg-orange-50 font-semibold" : ""
                }`}
              >
                {cat}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default SelectCategory;