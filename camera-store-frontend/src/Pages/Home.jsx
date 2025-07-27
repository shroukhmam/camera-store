import DJIOfferBanner from "../components/DJIOfferBanner.jsx";
import BrandsCarousel from "../components/BrandsCarousel.jsx";
import CategoryCarousel from "../components/CategoryCarousel.jsx";
import ProductCarousel from "../components/ProductCarousel.jsx";
import brandsData from "../data/brands.json";
import productData from "../data/productOffer.json";
import Slider from "../components/Slider.jsx";
import Type from "../components/Type.jsx";

export default function Home({ onAddToCart }) {
    return (
        <>
            <DJIOfferBanner />
            <BrandsCarousel items={brandsData} />
            <CategoryCarousel />
            <div className="mt-8 px-4">
                <h2 className="text-xl font-semibold text-orange-600 mb-4">Top Offers</h2>
                <ProductCarousel products={productData.products} onAddToCart={onAddToCart} />
            </div>
            <Slider />
            <Type />
        </>
    );
}
