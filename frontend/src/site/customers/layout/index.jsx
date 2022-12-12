import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartMenu from "./CartMenu";
import { LayoutContext } from "./LayoutContext";
import AccountMenu from "./AccountMenu";
import AccountDialog from "./AccountDialog";

function Customer({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [anchorEl, setAnchorEl] = useState(null);
  const openAccountMemu = Boolean(anchorEl);
  const handleClickAccountMemu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAccountMemu = () => {
    setAnchorEl(null);
  };

  const [openAccountDialog, setOpenAccountDialog] = useState(false);

  const handleClickOpenAccountDialog = () => {
    setOpenAccountDialog(true);
  };

  const handleCloseAccountDialog = () => {
    setOpenAccountDialog(false);
  };

  const isUserLogedIn = false;
  return (
    <main>
      <LayoutContext.Provider
        value={{
          openAccountMemu,
          handleClickAccountMemu,
          handleCloseAccountMemu,
          isUserLogedIn,
          anchorEl,
          openAccountDialog,
          setOpenAccountDialog,
          handleClickOpenAccountDialog,
          handleCloseAccountDialog,
        }}
      >
        <AccountDialog />
        <AccountMenu />
        <Navbar />
        <AccountDialog />
      </LayoutContext.Provider>
      {children}
      <CartMenu />
      <Footer />
    </main>
  );
}

export default Customer;
