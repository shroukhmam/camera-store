import DJIOfferBanner from "../components/DJIOfferBanner.jsx";
import BrandsCarousel from "../components/BrandsCarousel.jsx";
import CategoryCarousel from "../components/CategoryCarousel.jsx";
import ProductCarousel from "../components/ProductCarousel.jsx";
import brandsData from "../data/brands.json";
import Slider from "../components/Slider.jsx";
import Type from "../components/Type.jsx";
import Release from "../components/Release.jsx";
import categoriesData from "../data/CategoryProduct.json";

export default function Home({ onAddToCart }) {
    if (!categoriesData?.categories) {
        return <div>Loading products...</div>;
    }

    const discountedProducts = categoriesData.categories.flatMap(category =>
        category.products?.filter(product =>
            product.discount  || (product.sale_price && product.original_price)
        ) || []
    );

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
            <DJIOfferBanner />
            <BrandsCarousel items={brandsData} />
            <CategoryCarousel />
            <ProductCarousel products={discountedProducts} nameSection="The Best Offers" onAddToCart={onAddToCart} />
            <Slider />
            <ProductCarousel products={lightProducts} nameSection="Lights......" onAddToCart={onAddToCart} />
            <Type />
            <ProductCarousel products={stabilizerProducts} nameSection="Stabilizer......" onAddToCart={onAddToCart} />
            <Release />

        </>
    );
}
