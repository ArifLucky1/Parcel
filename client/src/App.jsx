import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ToastContainer } from "react-toastify";


//Layout Components
import Navbar from "./components/Layout/Navbar";
import Sidebar from "./components/Layout/Sidebar";
import SearchOverlay from "./components/Layout/SearchOverlay";
import CartSidebar from "./components/Layout/CartSidebar";
import ProfilePanel from "./components/Layout/ProfilePanel";
import LoginModal from "./components/Layout/LoginModal";
import Footer from "./components/Layout/Footer";


//Pages
import Index from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Payment from "./pages/Payment";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { Car } from "lucide-react";


const App = () => {
  return(
    <>
      <ThemeProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navbar />
            <Sidebar />
            <SearchOverlay />
            <CartSidebar />
            <ProfilePanel />
            <LoginModal />
            <Routes>
              <route path="/" element={<Index />} />
              <route path="/password/reset/:token" element={<Index />} />
              <route path="/products" element={<Products />} />
              <route path="/product/:id" element={<ProductDetail />} />
              <route path="/cart" element={<Cart />} />
              <route path="/orders" element={<Orders />} />
              <route path="/payment" element={<Payment />} />
              <route path="/about" element={<About />} />
              <route path="/faq" element={<FAQ />} />
              <route path="/contact" element={<Contact />} />
              <route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
          <ToastContainer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
};


export default App;