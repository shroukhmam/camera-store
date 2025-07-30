import React, { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
    const { cartItems, updateQuantity, removeItem } = useCart();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isCouponOpen, setIsCouponOpen] = useState(false);
    const [couponCode, setCouponCode] = useState("");
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        country: 'Egypt',
        street: '',
        city: '',
        postcode: '',
        state: '',
        orderNotes: '',
        createAccount: false,
        agreeTerms: false
    });

    // حساب القيم الديناميكية بناءً على محتويات السلة
    const { subtotal, visaFees, shippingFee, total } = useMemo(() => {
        const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        
        // رسوم الفيزا 2.5% من المجموع الفرعي مع حد أدنى 2599 جنيه
        const visaFees = Math.max(2599, Math.round(subtotal * 0.025));
        
        // رسوم الشحن 1% من المجموع الفرعي مع حد أقصى 80 جنيه
        const shippingFee = Math.min(80, Math.round(subtotal * 0.01));
        
        const total = subtotal + shippingFee + visaFees;
        
        return { subtotal, visaFees, shippingFee, total };
    }, [cartItems]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const handleApplyCoupon = () => {
        console.log('Applying coupon:', couponCode);
        // هنا يمكنك إضافة منطق تطبيق الكوبون
        setIsCouponOpen(false);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">SHOPPING CART → CHECKOUT → ORDER COMPLETE</h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Billing Details Section */}
                <div className="lg:w-2/3">
                    <div className="bg-white rounded-lg shadow p-6">
                        {/* Returning Customer Section */}
                        <div className="mb-6 p-4 bg-gray-50 rounded">
                            <h2 className="text-lg font-semibold mb-2">Returning customer? <span className="text-orange-500 cursor-pointer" onClick={() => setIsLoginOpen(!isLoginOpen)}>Click here to login</span></h2>
                            {isLoginOpen && (
                                <div className="mt-4">
                                    <p className="text-sm mb-4">If you have shopped with us before, please enter your details below.</p>
                                    <div className="space-y-3">
                                        <input type="text" placeholder="Username or email" className="w-full p-2 border rounded" />
                                        <input type="password" placeholder="Password" className="w-full p-2 border rounded" />
                                        <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Login</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Coupon Code Section */}
                        <div className="mb-6 p-4 bg-gray-50 rounded">
                            <h2 className="text-lg font-semibold mb-2">Have a coupon? <span 
                                className="text-orange-500 cursor-pointer" 
                                onClick={() => setIsCouponOpen(!isCouponOpen)}
                            >
                                Click here to enter your code
                            </span></h2>
                            {isCouponOpen && (
                                <div className="mt-4">
                                    <p className="text-sm mb-2">If you have a coupon code, please apply it below.</p>
                                    <div className="flex">
                                        <input 
                                            type="text" 
                                            placeholder="Coupon code" 
                                            className="flex-1 p-2 border rounded-l"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                        />
                                        <button 
                                            className="bg-black text-white px-4 py-2 rounded-r hover:bg-gray-800"
                                            onClick={handleApplyCoupon}
                                        >
                                            Apply Coupon
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Billing Form */}
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-xl font-bold mb-4">Billing Details</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">First name *</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Last name *</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Phone *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Country / Region *</label>
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                    required
                                >
                                    <option value="Egypt">Egypt</option>
                                    <option value="Saudi Arabia">Saudi Arabia</option>
                                    <option value="UAE">UAE</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Street address *</label>
                                <input
                                    type="text"
                                    name="street"
                                    value={formData.street}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Town / City *</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Postcode (optional)</label>
                                    <input
                                        type="text"
                                        name="postcode"
                                        value={formData.postcode}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">State (optional)</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Order notes (optional)</label>
                                <textarea
                                    name="orderNotes"
                                    value={formData.orderNotes}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                    placeholder="Notes about your order, e.g. special notes for delivery."
                                    rows="3"
                                ></textarea>
                            </div>

                            <div className="mb-4 flex items-center">
                                <input
                                    type="checkbox"
                                    id="createAccount"
                                    name="createAccount"
                                    checked={formData.createAccount}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                />
                                <label htmlFor="createAccount">Create an account?</label>
                            </div>

                            <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition">
                                Place Order
                            </button>
                        </form>
                    </div>
                </div>

                {/* Order Summary Section */}
                <div className="lg:w-1/3">
                    <div className="bg-white rounded-lg shadow p-6 sticky top-4">
                        <h2 className="text-xl font-bold mb-4 border-b pb-2">Your order</h2>
                        
                        <div className="space-y-4 mb-4">
                            <div className="flex justify-between font-semibold text-sm">
                                <span>PRODUCT</span>
                                <span>SUBTOTAL</span>
                            </div>
                            
                            {cartItems.map((item) => (
                                <div key={item.id} className="border-b pb-4">
                                    <div className="mb-2">
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold">{item.price.toLocaleString()} EGP</span>
                                        <div className="flex items-center border rounded">
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="px-2 hover:bg-gray-100"
                                            >
                                                -
                                            </button>
                                            <span className="px-2">{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="px-2 hover:bg-gray-100"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="space-y-3 border-t pt-4">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="font-bold">{subtotal.toLocaleString()} EGP</span>
                            </div>
                            
                            <div className="border-b pb-4">
                                <p className="font-semibold mb-2">Shipping</p>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <input 
                                            type="radio" 
                                            id="shipping" 
                                            name="shipping" 
                                            defaultChecked 
                                            className="mr-2"
                                        />
                                        <label htmlFor="shipping">3-1.5% (S) {shippingFee.toLocaleString()} EGP</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input 
                                            type="radio" 
                                            id="pickup" 
                                            name="shipping" 
                                            className="mr-2"
                                        />
                                        <label htmlFor="pickup">Local pickup</label>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex justify-between">
                                <span>visa fees</span>
                                <span className="font-bold">{visaFees.toLocaleString()} EGP</span>
                            </div>
                            
                            <div className="flex justify-between font-bold text-lg pt-2">
                                <span>Total</span>
                                <span>{total.toLocaleString()} EGP</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;