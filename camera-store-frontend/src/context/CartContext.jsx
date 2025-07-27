import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // ✅ تحميل البيانات من LocalStorage عند أول تحميل
    useEffect(() => {
        const initializeCart = () => {
            try {
                const storedCart = localStorage.getItem("cartItems");
                if (storedCart) {
                    const parsedCart = JSON.parse(storedCart);
                    if (Array.isArray(parsedCart)) {
                        setCartItems(parsedCart);
                    }
                }
            } catch (error) {
                console.error("Failed to load cart from localStorage", error);
                localStorage.removeItem("cartItems");
            }
            setIsInitialized(true);
        };

        if (!isInitialized) {
            initializeCart();
        }
    }, [isInitialized]);

    // ✅ حفظ التغييرات في السلة إلى LocalStorage تلقائيًا
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }
    }, [cartItems, isInitialized]);

    const addToCart = (product) => {
        const existing = cartItems.find((item) =>
            item.id === product.id &&
            (!item.selectedOption || item.selectedOption === product.selectedOption)
        );

        if (existing) {
            setCartItems((prev) =>
                prev.map((item) =>
                    item.id === product.id &&
                    (!item.selectedOption || item.selectedOption === product.selectedOption)
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
        }
        setIsCartOpen(true);
    };

    const removeItem = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return;
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider
            value={{
                isCartOpen,
                setIsCartOpen,
                cartItems,
                addToCart,
                removeItem,
                updateQuantity,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};