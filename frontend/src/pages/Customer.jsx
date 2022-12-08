import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./global/Navbar";
import Footer from "./global/Footer";
import CartMenu from "./global/CartMenu";

function Customer({ children }) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <main>
      <Navbar />
      {children}
      <CartMenu />
      <Footer />
    </main>
  );
}

export default Customer;
