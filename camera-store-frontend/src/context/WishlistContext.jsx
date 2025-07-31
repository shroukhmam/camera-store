import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load wishlist from localStorage on first load
  useEffect(() => {
    const initializeWishlist = () => {
      try {
        const storedWishlist = localStorage.getItem("wishlistItems");
        if (storedWishlist) {
          const parsedWishlist = JSON.parse(storedWishlist);
          if (Array.isArray(parsedWishlist)) {
            setWishlistItems(parsedWishlist);
          }
        }
      } catch (error) {
        console.error("Failed to load wishlist from localStorage", error);
        localStorage.removeItem("wishlistItems");
      }
      setIsInitialized(true);
    };

    if (!isInitialized) {
      initializeWishlist();
    }
  }, [isInitialized]);

  // Save wishlist to localStorage on changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, isInitialized]);

  const addToWishlist = (product) => {
    const exists = wishlistItems.find((item) => item.id === product.id);
    if (!exists) {
      setWishlistItems((prev) => [...prev, product]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleWishlist = (product) => {
    const exists = wishlistItems.find((item) => item.id === product.id);
    if (exists) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (id) => {
    return wishlistItems.some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
