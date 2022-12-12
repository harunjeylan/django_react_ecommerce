import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartMenu from "./CartMenu";
import LayoutProvider from "./LayoutContext";
import AccountMenu from "./AccountMenu";
import AccountDialog from "./AccountDialog";

function Customer({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <main>
      <LayoutProvider>
        <AccountDialog />
        <AccountMenu />
        <Navbar />
        <AccountDialog />
      </LayoutProvider>
      {children}
      <CartMenu />
      <Footer />
    </main>
  );
}

export default Customer;
