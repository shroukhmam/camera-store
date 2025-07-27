import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SubNavbar from "./components/SubNavbar";
import brandsData from './data/brands.json';
import BrandsCarousel from "./components/BrandsCarousel.jsx";
import {useState} from "react";
import MegaMenu from "./components/MegaMenu.jsx";
import DJIOfferBanner from "./components/DJIOfferBanner.jsx";
import CategoryCarousel from "./components/CategoryCarousel.jsx"; // Your brands data
import productData from "./data/productOffer.json";
import ProductCarousel from "./components/ProductCarousel.jsx";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
    // هنا تم حذف setSideCartOpen(true) لأن مفيش سايد كارت
  };

  return (
    <div className="App">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-4 left-4 z-50 bg-orange-500 ml-[80%] text-white px-4 py-2 rounded md:hidden"
      >
        ☰
      </button>

      <MegaMenu open={menuOpen} setOpen={setMenuOpen} />

      <div className="pl-0 sm:pl-0 md:pl-[60px] lg:pl-[60px] xl:pl-[60px]">
        <Navbar />
        <SubNavbar />
          <DJIOfferBanner />
          <BrandsCarousel items={brandsData} />
          <CategoryCarousel />
        <div className="mt-8 px-4">
          <h2 className="text-xl font-semibold text-orange-600 mb-4">Top Offers</h2>
          <ProductCarousel products={productData.products} onAddToCart={handleAddToCart} />
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;