import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SubNavbar from "./components/SubNavbar";
import MegaMenu from "./components/MegaMenu.jsx";
import { useState } from "react";
import Home from "./Pages/Home.jsx";
import ProductPage from "./Pages/ProductPage.jsx";

function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const handleAddToCart = (product) => {
        setCartItems((prevItems) => [...prevItems, product]);
    };

    return (
        <BrowserRouter>
            <div className="App">
                {/* الزر الخاص بالموبايل */}
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

                    {/* Routes هنا */}
                    <Routes>
                        <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
                        <Route path="/product/:id" element={<ProductPage />} />

                    </Routes>

                    <Footer />
                    <Link to={`/product/31469`}>
                       test
                    </Link>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
