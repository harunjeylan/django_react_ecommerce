import React, { useContext } from "react";
import * as yup from "yup";
import { Formik } from "formik";

import {
  TextField,
  Box,
  useTheme,
  Typography,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { tokens, UserLoginForm } from "../import";
import { LayoutContext } from "./LayoutContext";



const AccountDialog = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { openAccountDialog } = useContext(LayoutContext);
  const { handleCloseAccountDialog } = useContext(LayoutContext);


  return (
    <Box
      className={`${
        openAccountDialog ? "fixed" : "hidden"
      } bg-black/20 z-[1000] w-full h-full left-0 top-[60px] ease-in-out`}
    >
      <Box
        backgroundColor={colors.primary[400]}
        open={openAccountDialog}
        onClose={handleCloseAccountDialog}
        className="mx-auto mt-4 w-[400px] max-w-[90%] rounded-lg"
      >
        <Box className="px-4 py-4 flex justify-between items-center ease-in-out">
          <Typography
            variant="h1"
            color={colors.grey[100]}
            fontWeight="bold"
            className={`text-xl md:text-2xl  text-left my-4`}
          >
            Login
          </Typography>
          <Box>
            <IconButton onClick={handleCloseAccountDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        <UserLoginForm />

      </Box>
    </Box>
  );
};

export default AccountDialog;
