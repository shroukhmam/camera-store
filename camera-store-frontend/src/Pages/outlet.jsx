import ProductCarousel from "../components/ProductCarousel.jsx";
import categoriesData from "../data/CategoryProduct.json";
import OutletDetails from "../components/outletDetails.jsx";

export default function Outlet({ onAddToCart }) {
    if (!categoriesData?.categories) {
        return <div>Loading products...</div>;
    }


    const lightsCategory = categoriesData.categories.find(
        category => category.name.toLowerCase() === 'lights'
    );

    const lightProducts = lightsCategory?.products || [];
    const stabilizerCategory = categoriesData.categories.find(
        category => category.name.toLowerCase() === 'stabilizer'
    );

    const stabilizerProducts = stabilizerCategory?.products || [];

    return (
        <>
            <OutletDetails />
            <ProductCarousel products={lightProducts} nameSection="Lights......" onAddToCart={onAddToCart} />
            <ProductCarousel products={stabilizerProducts} nameSection="Stabilizer......" onAddToCart={onAddToCart} />

        </>
    );
}
