import { createContext, useContext, useState, useEffect } from "react";

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareItems, setCompareItems] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load compare list from localStorage on first load
  useEffect(() => {
    const initializeCompare = () => {
      try {
        const storedCompare = localStorage.getItem("compareItems");
        if (storedCompare) {
          const parsedCompare = JSON.parse(storedCompare);
          if (Array.isArray(parsedCompare)) {
            setCompareItems(parsedCompare);
          }
        }
      } catch (error) {
        console.error("Failed to load compare list from localStorage", error);
        localStorage.removeItem("compareItems");
      }
      setIsInitialized(true);
    };

    if (!isInitialized) {
      initializeCompare();
    }
  }, [isInitialized]);

  // Save compare list to localStorage on changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("compareItems", JSON.stringify(compareItems));
    }
  }, [compareItems, isInitialized]);

  const addToCompare = (product) => {
    const exists = compareItems.find((item) => item.id === product.id);
    if (!exists) {
      setCompareItems((prev) => [...prev, product]);
    }
  };

  const removeFromCompare = (id) => {
    setCompareItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleCompare = (product) => {
    const exists = compareItems.find((item) => item.id === product.id);
    if (exists) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  const isInCompare = (id) => {
    return compareItems.some((item) => item.id === id);
  };

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        addToCompare,
        removeFromCompare,
        toggleCompare,
        isInCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}
