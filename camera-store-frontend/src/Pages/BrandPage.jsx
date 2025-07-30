import StoreDetails from "../components/StoreDetails.jsx";
import BrandsCarousel from "../components/BrandsCarousel.jsx";
import brandsData from "../data/brands.json";
import CategoryCarousel from "../components/CategoryCarousel.jsx";
import categoriesData from "../data/CategoryProduct.json";
import {useParams} from "react-router-dom";

export default function BrandPage() {
    const { name } = useParams();

    // Get all products from all categories
    const allProducts = categoriesData.categories.flatMap(
        category => category.products || []
    );


    const brandProducts = allProducts.filter(product => {
        return product.brand === name;
    });

    console.log(brandProducts);

    return (
        <div className="bg-gray-100">
            <BrandsCarousel items={brandsData} />
            <div className="mx-auto max-w-[98%] bg-white">
                <CategoryCarousel />
            </div>
            <StoreDetails getAllProducts={brandProducts} />
        </div>
    );
}