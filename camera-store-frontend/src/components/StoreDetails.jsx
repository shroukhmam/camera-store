import MoreProductCarousel from "./MoreProductCarousel.jsx";
export default function StoreDetails({getAllProducts}) {

    return (
        <>
            <MoreProductCarousel
                products={getAllProducts}
                mode="grid" // أو "slider" أو "vertical"
            />
        </>
    );
}
