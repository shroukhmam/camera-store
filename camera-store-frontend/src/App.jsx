import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SubNavbar from "./components/SubNavbar";
import brandsData from './data/brands.json';
import BrandsCarousel from "./components/BrandsCarousel.jsx";
import {useState} from "react";
import MegaMenu from "./components/MegaMenu.jsx"; // Your brands data

function App() {
    const [menuOpen, setMenuOpen] = useState(false);
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
            <BrandsCarousel items={brandsData} />
          <Footer/>
        </div>
      {/* باقي الموقع هنا */}
    </div>
  );
}

export default App;