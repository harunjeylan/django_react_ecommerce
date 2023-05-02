import React, { useContext } from "react";

import { Box, useTheme, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { LayoutContext } from "./LayoutContext";
import { tokens } from "../../../theme";
import UserLoginForm from "../../../components/UserLoginForm";
import UserRegisterForm from "../../../components/UserRegisterForm";

const AccountDialog = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { openAccountDialog } = useContext(LayoutContext);
  const { handleCloseAccountDialog } = useContext(LayoutContext);
  const { handleClickOpenAccountDialog } = useContext(LayoutContext);
  return (
    <Box
      className={`${
        openAccountDialog.isOpen ? "fixed " : "hidden"
      } bg-black/20 z-[1000] w-full h-full left-0 top-0 pt-[60px] ease-in-out`}
    >
      <Box
        backgroundColor={colors.primary[400]}
        open={openAccountDialog.isOpen}
        onClose={handleCloseAccountDialog}
        className="mx-auto mt-4 w-[400px] max-w-[90%] rounded-lg "
      >
        <Box className="px-4 py-4 flex justify-between items-center ease-in-out">
          <Typography
            variant="h1"
            color={colors.grey[100]}
            fontWeight="bold"
            className={`text-xl md:text-2xl  text-left my-4`}
          >
            {openAccountDialog.mode === "login" && "Login"}
            {openAccountDialog.mode === "register" && "Register"}
          </Typography>
          <Box>
            <IconButton onClick={handleCloseAccountDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        {openAccountDialog.mode === "login" && (
          <UserLoginForm
            handleCloseAccountDialog={handleCloseAccountDialog}
            handleClickOpenAccountDialog={handleClickOpenAccountDialog}
          />
        )}
        {openAccountDialog.mode === "register" && (
          <UserRegisterForm
            handleCloseAccountDialog={handleCloseAccountDialog}
            handleClickOpenAccountDialog={handleClickOpenAccountDialog}
          />
        )}
      </Box>
    </Box>
  );
};

export default AccountDialog;
