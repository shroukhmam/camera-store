import StoreDetails from "../components/StoreDetails.jsx";
import DJIOfferBanner from "../components/DJIOfferBanner.jsx";
import BrandsCarousel from "../components/BrandsCarousel.jsx";
import brandsData from "../data/brands.json";
import CategoryCarousel from "../components/CategoryCarousel.jsx";
import productsData from "../data/CategoryProduct.json";

export default function Store() {
    const getAllProducts = () => {
        return productsData.categories.flatMap(category => category.products);
    };
    return (
        <div className="bg-gray-100">
            <BrandsCarousel items={brandsData} />
            <div className="mx-auto max-w-[98%] bg-white">
                <CategoryCarousel />

            </div>
            <StoreDetails getAllProducts={getAllProducts()} />
        </div>
    );
}
