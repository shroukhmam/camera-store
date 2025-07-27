import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SubNavbar from "./components/SubNavbar";
import MegaMenu from "./components/MegaMenu.jsx";
import { useState } from "react";
import Home from "./Pages/Home.jsx";
import ProductPage from "./Pages/ProductPage.jsx";
import { CartProvider } from "./context/CartContext";
import AccountPage from "./Pages/AccountPage.jsx";
import ForgetPassword from "./Pages/ForgetPassword.jsx";
import Contact from "./Pages/Contact.jsx";
import Brands from "./Pages/Brands.jsx";

// ✅ ملف داخل App لحساب موقعك الحالي
function LayoutWrapper() {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    // ✅ تحديد إن كنا على صفحة brands
    const isBrandsPage = location.pathname === "/brand";

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
                {!isBrandsPage && <Navbar />}
                {!isBrandsPage && <SubNavbar />}

                <Routes>
                    <Route path="/login" element={<AccountPage />} />
                    <Route path="/forget-password" element={<ForgetPassword />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/brand" element={<Brands />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                </Routes>

                {!isBrandsPage && <Footer />}
                {!isBrandsPage &&   <Link to={`/product/31469`}>test</Link> }
            </div>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <CartProvider>
                <LayoutWrapper />
            </CartProvider>
        </BrowserRouter>
    );
}

export default App;
