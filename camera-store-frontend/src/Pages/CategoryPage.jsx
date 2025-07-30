import StoreDetails from "../components/StoreDetails.jsx";
import BrandsCarousel from "../components/BrandsCarousel.jsx";
import brandsData from "../data/brands.json";
import CategoryCarousel from "../components/CategoryCarousel.jsx";
import categoriesData from "../data/CategoryProduct.json";
import {useParams} from "react-router-dom";

export default function CategoryPage() {

    const { id } = useParams();
    const categoryId = parseInt(id);
    const selectedCategory = categoriesData.categories.find(
        category => category.id === categoryId
    );
    const getAllProducts = selectedCategory?.products || [];

    return (
        <div className="bg-gray-100">
            <BrandsCarousel items={brandsData} />
            <div className="mx-auto max-w-[98%] bg-white">
                <CategoryCarousel />

            </div>
            <StoreDetails getAllProducts={getAllProducts} />
        </div>
    );
}
