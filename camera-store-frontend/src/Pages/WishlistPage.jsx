import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h2>
        <p className="mb-4">Browse products and add them to your wishlist.</p>
        <Link to="/" className="text-orange-500 underline">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">My Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <div key={product.id} className="border rounded p-4 shadow hover:shadow-lg transition">
            <Link to={`/product/${product.id}`}>
              <img
                src={Array.isArray(product.images) ? product.images[0] : product.images}
                alt={product.name}
                className="w-full h-48 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            </Link>
            <p className="text-orange-500 font-bold mb-2">
              {product.sale_price || product.price} EGP
            </p>
            <button
              onClick={() => removeFromWishlist(product.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
