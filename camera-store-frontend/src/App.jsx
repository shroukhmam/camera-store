import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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

function App() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <BrowserRouter>
            <CartProvider>
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

                        <Routes>
                            <Route path="/login" element={<AccountPage />} />
                            <Route path="/forget-password" element={<ForgetPassword />} />

                            <Route path="/" element={<Home />} />
                            <Route path="/product/:id" element={<ProductPage />} />
                        </Routes>

                        <Footer />
                        <Link to={`/product/31469`}>test</Link>
                    </div>
                </div>
            </CartProvider>
        </BrowserRouter>
    );
}

export default App;
