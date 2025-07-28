import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaCheck, FaShoppingCart, FaHeart, FaShare, FaExchangeAlt, FaTruck, FaStore } from "react-icons/fa";
import data from "../data/CategoryProduct.json";

export default function ProductPage() {
    const { id } = useParams();
    const productId = parseInt(id);
    const [mainImage, setMainImage] = useState(0); // حالة لتتبع الصورة الرئيسية

    // البحث عن المنتج في جميع الفئات
    let product = null;
    for (const category of data.categories) {
        if (category.products) {
            const foundProduct = category.products.find(prod => prod.id === productId);
            if (foundProduct) {
                product = foundProduct;
                break;
            }
        }
    }

    if (!product) {
        return (
            <div className="container mx-auto p-6 text-center">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <h2 className="font-bold text-xl">المنتج غير موجود</h2>
                    <p>عذراً، لا يوجد منتج بهذا المعرف</p>
                </div>
            </div>
        );
    }

    // بيانات افتراضية للعرض (يمكن استبدالها ببيانات حقيقية من المنتج)
    const productDetails = {
        specifications: product.description ? product.description.split('. ') : [
            "32.5MP APS-C CMOS Sensor",
            "DIGIC 8 Image Processor",
            "UHD 4K30p & Full HD 120p Video Recording",
            "3\" 1.04m-Dot Vari-Angle Touchscreen LCD",
            "45-Point All Cross-Type AF System",
            "Dual Pixel CMOS AF with 5481 AF Points",
            "Up to 10 fps Shooting, ISO 100-25600",
            "Built-in Wi-Fi and Bluetooth",
            "EOS ITR AF, Electronic Shutter Function",
            "220,000-Pixel AE Metering Sensor"
        ],
        soldCount: 2, // يمكن استبدالها ببيانات حقيقية
        watchers: 32, // يمكن استبدالها ببيانات حقيقية
        variants: [
            { id: 1, name: `${product.name} with X Clear`, price: "99,900 EGP" },
            { id: 2, name: `${product.name} with 18-55mm Lens`, price: "115,000 EGP" }
        ]
    };

    // دالة لتغيير الصورة الرئيسية عند النقر على الصورة المصغرة
    const handleThumbnailClick = (index) => {
        setMainImage(index);
    };

    return (
        <div className="container mx-auto p-4 md:p-8 max-w-6xl">
            {/* Breadcrumb Navigation */}
            <nav className="flex mb-6 text-sm text-gray-600">
                <ol className="flex items-center space-x-2">
                    <li><a href="/" className="hover:text-orange-500">Home</a></li>
                    <li>/</li>
                    <li><a href="#" className="hover:text-orange-500">{product.category || 'Camera'}</a></li>
                    <li>/</li>
                    <li><a href="#" className="hover:text-orange-500">{product.brand || 'Canon'}</a></li>
                    <li>/</li>
                    <li className="text-orange-500">{product.name}</li>
                </ol>
            </nav>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column - Product Images */}
                <div className="lg:w-1/2">
                    <div className="bg-white p-4 rounded-lg shadow mb-4">
                        <img
                            src={product.images ? product.images[mainImage] : "https://via.placeholder.com/600"}
                            alt={product.name}
                            className="w-full h-96 object-contain mx-auto"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {product.images ? (
                            product.images.map((img, index) => (
                                <div
                                    key={index}
                                    className={`bg-white p-2 border rounded cursor-pointer transition-all ${mainImage === index ? 'border-orange-500 ring-1 ring-orange-500' : 'hover:border-orange-400'}`}
                                    onClick={() => handleThumbnailClick(index)}
                                >
                                    <img
                                        src={img}
                                        alt={`${product.name} ${index + 1}`}
                                        className="w-full h-20 object-contain"
                                    />
                                </div>
                            ))
                        ) : (
                            [1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className={`bg-white p-2 border rounded cursor-pointer ${mainImage === i-1 ? 'border-orange-500' : 'hover:border-orange-400'}`}
                                    onClick={() => handleThumbnailClick(i-1)}
                                >
                                    <img
                                        src={`https://via.placeholder.com/150?text=Image+${i}`}
                                        alt={`Placeholder ${i}`}
                                        className="w-full h-20 object-contain"
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Right Column - Product Details */}
                <div className="lg:w-1/2">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>

                    <p className="text-gray-500 mb-4">SKU: {product.sku || 'N/A'}</p>

                    {/* Specifications List */}
                    <ul className="list-disc list-inside text-gray-700 space-y-1 mb-6">
                        {productDetails.specifications.map((spec, index) => (
                            <li key={index}>{spec}</li>
                        ))}
                    </ul>

                    {/* Promotion Banner */}
                    {product.offer && (
                        <div className="bg-orange-100 border-l-4 border-orange-500 p-3 mb-6">
                            <p className="font-semibold text-orange-800">Take a look on our outlet</p>
                            <p className="text-orange-700">Hurry and get discounts on all clearance section up to {product.offer}</p>
                        </div>
                    )}

                    {/* Sales Info */}
                    <p className="text-gray-600 mb-4">{productDetails.soldCount} items sold in last 4 hours</p>

                    {/* Price */}
                    <div className="mb-6">
                        {product.price_range ? (
                            <p className="text-xl font-bold text-gray-800">
                                {product.price_range.min} – {product.price_range.max}
                            </p>
                        ) : (
                            <div>
                                {product.original_price && (
                                    <p className="text-gray-400 line-through text-sm">
                                        {product.original_price}
                                    </p>
                                )}
                                <p className="text-orange-500 text-xl font-bold">
                                    {product.price || product.sale_price}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Variant Selector */}
                    {productDetails.variants && (
                        <div className="mb-6">
                            <label className="block font-medium mb-2">Connector:</label>
                            <select className="w-full border rounded p-2">
                                {productDetails.variants.map((variant) => (
                                    <option key={variant.id} value={variant.id}>
                                        {variant.name} - {variant.price}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg flex items-center justify-center font-medium transition">
                            <FaShoppingCart className="ml-2" />
                            Add To Cart
                        </button>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition">
                            Buy Now
                        </button>
                    </div>

                    {/* Secondary Actions */}
                    <div className="flex space-x-4 mb-6">
                        <button className="flex items-center text-gray-600 hover:text-orange-500">
                            <FaExchangeAlt className="mr-1" />
                            Add to compare
                        </button>
                        <button className="flex items-center text-gray-600 hover:text-orange-500">
                            <FaHeart className="mr-1" />
                            Add to wishlist
                        </button>
                        <button className="flex items-center text-gray-600 hover:text-orange-500">
                            <FaShare className="mr-1" />
                            Share
                        </button>
                    </div>

                    {/* Watchers */}
                    <p className="text-gray-500 mb-6">{productDetails.watchers} People watching this product now!</p>

                    {/* Delivery Options */}
                    <div className="space-y-4 mb-6">
                        <div className="flex items-start">
                            <FaStore className="text-gray-500 mt-1 mr-2" />
                            <div>
                                <p className="font-medium">Pick up from our branches</p>
                                <p className="text-gray-600 text-sm">To pick up today</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <FaTruck className="text-gray-500 mt-1 mr-2" />
                            <div>
                                <p className="font-medium">Courier delivery</p>
                                <p className="text-gray-600 text-sm">Our courier will deliver to the specified address (2-3 Days)</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <FaTruck className="text-gray-500 mt-1 mr-2" />
                            <div>
                                <p className="font-medium">DHL Courier delivery</p>
                                <p className="text-gray-600 text-sm">DHL courier will deliver to the specified address (1-3 Days)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}