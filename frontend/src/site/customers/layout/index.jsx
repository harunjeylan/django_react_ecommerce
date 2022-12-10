import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartMenu from "./CartMenu";

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
