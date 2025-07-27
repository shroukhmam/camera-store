import React from "react";
import { useParams } from "react-router-dom";
import data from "../data/CategoryProduct.json"; // اسم الملف اللي فيه الـ data بتاعتك

export default function ProductPage() {
    const { id } = useParams();
    const productId = parseInt(id); // مهم نحوله لرقم لأن الـ id في JSON رقمي

    // فلترة المنتجات من كل الكاتيجوريز
    const allProducts = data.categories.flatMap(category => category.products);
    const product = allProducts.find(prod => prod.id === productId);

    if (!product) {
        return <div className="p-4 text-red-500 font-bold">المنتج غير موجود</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-2">السعر: {product.price}</p>
            <p className="text-gray-500 mb-4">الوصف: {product.description}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {product.images.map((img, index) => (
                    <img key={index} src={img} alt={product.name} className="w-full rounded-lg shadow" />
                ))}
            </div>
        </div>
    );
}
