import ProductCarousel from "../components/ProductCarousel.jsx";
import categoriesData from "../data/CategoryProduct.json";
import OutletDetails from "../components/outletDetails.jsx";

export default function Outlet() {

    return (
        <div className="bg-gray-100">

        <OutletDetails />
            {categoriesData.categories
                .filter(category => category.products && category.products.length > 0)
                .map(category => (
                    <ProductCarousel
                        products={category.products}
                        nameSection={`${category.name}......`}
                    />
                ))
            }
        </div>
    );
}
