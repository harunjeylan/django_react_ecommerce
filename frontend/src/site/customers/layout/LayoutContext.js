import { createContext, useEffect, useState } from "react";

export const LayoutContext = createContext();

const LayoutProvider = ({ children }) => {
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

  const values = {
    anchorEl,
    openAccountMemu,
    openAccountDialog,
    handleClickAccountMemu,
    handleCloseAccountMemu,
    setOpenAccountDialog,
    handleClickOpenAccountDialog,
    handleCloseAccountDialog,
  };
  return (
    <LayoutContext.Provider value={values}>{children}</LayoutContext.Provider>
  );
};

export default LayoutProvider;
