import React from "react";
import { useCompare } from "../context/CompareContext";
import { Link } from "react-router-dom";

const ComparePage = () => {
  const { compareItems, removeFromCompare } = useCompare();

  if (compareItems.length === 0) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Compare Products</h2>
        <p>No products selected for comparison.</p>
        <Link to="/" className="text-blue-600 underline mt-4 inline-block">
          Go back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Compare Products</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Product</th>
              {compareItems.map((product) => (
                <th key={product.id} className="border border-gray-300 p-2 text-center">
                  <button
                    onClick={() => removeFromCompare(product.id)}
                    className="text-red-600 hover:underline mb-2"
                    aria-label={`Remove ${product.name} from compare`}
                  >
                    Remove
                  </button>
                  <Link to={`/product/${product.id}`} className="block font-semibold text-blue-600 hover:underline">
                    {product.name}
                  </Link>
                  <img
                    src={Array.isArray(product.images) ? product.images[0] : product.images}
                    alt={product.name}
                    className="w-32 h-32 object-cover mx-auto mt-2 rounded"
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">Price</td>
              {compareItems.map((product) => (
                <td key={product.id} className="border border-gray-300 p-2 text-center">
                  {product.sale_price || product.price} EGP
                </td>
              ))}
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">Category</td>
              {compareItems.map((product) => (
                <td key={product.id} className="border border-gray-300 p-2 text-center">
                  {[product.category, product.subcategory, product.brand].filter(Boolean).join(" / ")}
                </td>
              ))}
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">Stock Status</td>
              {compareItems.map((product) => (
                <td key={product.id} className="border border-gray-300 p-2 text-center">
                  {product.stock && product.stock.includes("Out of Stock") ? "Out of Stock" : "In Stock"}
                </td>
              ))}
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">SKU</td>
              {compareItems.map((product) => (
                <td key={product.id} className="border border-gray-300 p-2 text-center">
                  {product.sku || "-"}
                </td>
              ))}
            </tr>
            {/* Add more rows for other attributes as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparePage;
