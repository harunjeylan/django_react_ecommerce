import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./global/Navbar";
import Footer from "./global/Footer";
import CartMenu from "./global/CartMenu";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function Customer({ children }) {
  return (
    <main>
      <Navbar />
      <ScrollToTop />
      {children}
      <CartMenu />
      <Footer />
    </main>
  );
}

export default Customer;
