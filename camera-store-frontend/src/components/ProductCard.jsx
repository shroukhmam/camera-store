import { FaCheck, FaHeart, FaSearch, FaBalanceScale } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const hasPriceRange = product.price_range;

  return (
    <div className="relative group bg-white p-4 rounded-xl shadow-md h-full flex flex-col">
      <div className="relative flex-grow">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-contain mx-auto"
        />
        
        {/* Discount Badge */}
        {product.discount && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 text-sm rounded-full">
            {product.discount}
          </span>
        )}

        {/* Hover Icons */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
          <button className="bg-white p-2 rounded-full shadow text-orange-500 hover:bg-orange-100">
            <FaBalanceScale />
          </button>
          <button className="bg-white p-2 rounded-full shadow text-orange-500 hover:bg-orange-100">
            <FaSearch />
          </button>
          <button className="bg-white p-2 rounded-full shadow text-orange-500 hover:bg-orange-100">
            <FaHeart />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-col flex-grow-0">
        <h3 className="text-md font-bold line-clamp-2">{product.name}</h3>
        {product.category && (
          <p className="text-sm text-gray-500 line-clamp-1">{product.category.join(", ")}</p>
        )}

        {product.stock && (
          <div className="flex items-center text-green-600 text-sm mt-1">
            <FaCheck className="mr-1" /> {product.stock}
          </div>
        )}

        {hasPriceRange ? (
          <p className="text-orange-500 text-md mt-1">
            {product.price_range.min} – {product.price_range.max}
          </p>
        ) : (
          <>
            {product.original_price && (
              <p className="text-gray-400 line-through text-sm mt-1">
                {product.original_price}
              </p>
            )}
            <p className="text-orange-500 text-md">
              {product.sale_price || product.price}
            </p>
          </>
        )}

        <button className="mt-3 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
          {hasPriceRange ? "Select Options" : "Add To Cart"}
        </button>
        
        {product.sku && (
          <p className="text-xs text-gray-500 mt-1">SKU: {product.sku}</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;