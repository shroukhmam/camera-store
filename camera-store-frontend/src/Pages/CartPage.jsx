import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import categoriesData from "../data/CategoryProduct.json";
import ProductCarousel from "../components/ProductCarousel";

const CartPage = () => {
    const { cartItems, updateQuantity, removeItem } = useCart();

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const shippingFee = 80;
    const total = subtotal + shippingFee;

    const [showAddressForm, setShowAddressForm] = useState(false);
    const [shippingMethod, setShippingMethod] = useState("shipping");
      const releaseProducts = categoriesData.categories.flatMap(category =>
            category.products?.filter(product =>
                product.new
            ) || []
        );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">
                    SHOPPING CART → <Link to="/checkout" className="text-black-100 hover:underline">CHECKOUT</Link> → ORDER COMPLETE
                </h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-4">PRODUCT</th>
                                <th className="text-left py-4">PRICE</th>
                                <th className="text-left py-4">QUANTITY</th>
                                <th className="text-left py-4">SUBTOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.id} className="border-b">
                                    <td className="py-4">
                                        <div className="flex items-center">
                                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover mr-4" />
                                            <div>
                                                <Link to={item.link} className="font-semibold hover:text-orange-500">
                                                    {item.name}
                                                </Link>
                                                {item.selectedOption && (
                                                    <p className="text-sm text-gray-600">Option: {item.selectedOption}</p>
                                                )}
                                                <p className="text-sm text-gray-600">SKU: {item.sku}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4">{item.price.toLocaleString()} EGP</td>
                                    <td className="py-4">
                                        <div className="flex items-center">
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="px-2 border rounded-l"
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                                className="w-12 text-center border-t border-b"
                                            />
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="px-2 border rounded-r"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className="py-4">{(item.price * item.quantity).toLocaleString()} EGP</td>
                                    <td className="py-4">
                                        <button 
                                            onClick={() => removeItem(item.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-4 flex justify-between items-center">
                        <div className="flex">
                            <input 
                                type="text" 
                                placeholder="Coupon code" 
                                className="border p-2 rounded-l"
                            />
                            <button className="bg-black text-white px-4 py-2 rounded-r">
                                Apply Coupon
                            </button>
                        </div>
                        <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
                            Update Cart
                        </button>
                    </div>
                </div>

                <div className="lg:w-1/3 bg-gray-50 p-6 rounded">
                    <h2 className="text-xl font-bold mb-4">Cart Totals</h2>
                    
                    <div className="space-y-4">
                        <div className="flex justify-between border-b pb-2">
                            <span>Subtotal</span>
                            <span>{subtotal.toLocaleString()} EGP</span>
                        </div>
                        
                        <div className="border-b pb-4">
                            <h3 className="font-semibold mb-2">Shipping</h3>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="shipping"
                                        name="shipping"
                                        value="shipping"
                                        checked={shippingMethod === "shipping"}
                                        onChange={() => setShippingMethod("shipping")}
                                        className="mr-2"
                                    />
                                    <label htmlFor="shipping">3-1.5% (S) 80 EGP</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="pickup"
                                        name="shipping"
                                        value="pickup"
                                        checked={shippingMethod === "pickup"}
                                        onChange={() => setShippingMethod("pickup")}
                                        className="mr-2"
                                    />
                                    <label htmlFor="pickup">Local pickup</label>
                                </div>

                                <p className="text-sm text-gray-600">
                                    Shipping to Cairo.{" "}
                                    <button
                                        onClick={() => setShowAddressForm((prev) => !prev)}
                                        className="text-orange-500 underline"
                                    >
                                        Change address
                                    </button>
                                </p>

                                {showAddressForm && (
                                    <div className="mt-4 space-y-2">
                                        <div>
                                            <label>Country / region</label>
                                            <select className="w-full border p-2 rounded" defaultValue="Egypt">
                                                <option>Egypt</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label>State (optional)</label>
                                            <select className="w-full border p-2 rounded">
                                                <option>Cairo</option>
                                                <option>Alexandria</option>
                                                <option>Giza</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label>
                                                City <span className="text-red-500">*</span>
                                            </label>
                                            <input type="text" className="w-full border p-2 rounded" required />
                                        </div>
                                        <div>
                                            <label>Postcode (optional)</label>
                                            <input type="text" className="w-full border p-2 rounded" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>{total.toLocaleString()} EGP</span>
                        </div>
                        
                        <Link 
                            to="/checkout" 
                            className="block w-full bg-orange-500 text-white text-center py-3 rounded hover:bg-orange-600"
                        >
                            Proceed To Checkout
                        </Link>
                    </div>
                </div>
            </div>
               <div>
                <ProductCarousel products={releaseProducts} nameSection="You May be Intersting In...." slidesToShow = {{
                    default: 4,
                    xl: 4,
                    lg: 4,
                    md: 3,
                    sm: 2,
                    xs: 1
                }} />
            </div>
        </div>
    );
};

export default CartPage;