import { createContext, useEffect, useState } from "react";

export const LayoutContext = createContext();

const LayoutProvider = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openAccountMenu = Boolean(anchorEl);
  const handleClickAccountMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAccountMenu = () => {
    setAnchorEl(null);
  };
  const [openAccountDialog, setOpenAccountDialog] = useState({
    isOpen: false,
    mode: "login",
  });
  const handleClickOpenAccountDialog = (mode) => {
    setOpenAccountDialog({
      isOpen: true,
      mode: mode,
    });
  };
  const handleCloseAccountDialog = () => {
    setOpenAccountDialog({
      isOpen: false,
      mode: "login",
    });
  };

  const values = {
    anchorEl,
    openAccountMemu: openAccountMenu,
    openAccountDialog,
    handleClickAccountMenu,
    handleCloseAccountMenu,
    setOpenAccountDialog,
    handleClickOpenAccountDialog,
    handleCloseAccountDialog,
  };
  return (
    <LayoutContext.Provider value={values}>{children}</LayoutContext.Provider>
  );
};

export default LayoutProvider;
