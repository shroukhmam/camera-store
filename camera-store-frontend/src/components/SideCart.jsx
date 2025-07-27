import React from "react";
import { FaTimes } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const SideCart = () => {
    const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, removeItem } = useCart();

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div
            className={`fixed top-0 right-0 h-full w-96 bg-white z-50 shadow-lg transform transition-transform duration-300 ${
                isCartOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
                <h2 className="text-lg font-semibold text-orange-600">Shopping Cart</h2>
                <button onClick={() => setIsCartOpen(false)}>
                    <FaTimes className="text-gray-600 hover:text-red-500" />
                </button>
            </div>

            <div className="overflow-y-auto h-[calc(100%-220px)] p-4">
                {cartItems.length === 0 ? (
                    <p className="text-gray-500">Your cart is empty.</p>
                ) : (
                    <ul className="space-y-4">
                        {cartItems.map((item, idx) => (
                            <li key={idx} className="flex space-x-4 border-b pb-4">
                                <a href={item.link}>
                                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                </a>
                                <div className="flex-1">
                                    <a href={item.link} className="font-semibold text-gray-700 hover:text-orange-500 block">
                                        {item.name}
                                    </a>
                                    {item.selectedOption && (
                                        <div className="text-xs text-gray-500">Option: {item.selectedOption}</div>
                                    )}
                                    <div className="text-xs text-gray-500">SKU: {item.sku}</div>
                                    <div className="flex items-center mt-1 space-x-2">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            readOnly
                                            className="w-12 border text-center text-sm rounded"
                                        />
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                    <div className="text-sm mt-1 text-gray-700">
                                        {item.quantity} × <span className="font-bold">{item.price.toLocaleString()} EGP</span>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-xs text-red-500 mt-1 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="p-4 border-t bg-gray-50">
                <p className="text-sm mb-2">
                    <strong>Subtotal:</strong>{" "}
                    <span className="text-orange-600 font-semibold">{subtotal.toLocaleString()} EGP</span>
                </p>
                <div className="flex space-x-2">
                    <a href="/cart" className="flex-1 text-center bg-gray-200 py-2 rounded hover:bg-gray-300">View cart</a>
                    <a href="/checkout" className="flex-1 text-center bg-orange-500 text-white py-2 rounded hover:bg-orange-600">Checkout</a>
                </div>
            </div>
        </div>
    );
};

export default SideCart;
