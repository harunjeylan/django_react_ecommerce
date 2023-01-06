import React from "react";

import { Box, useTheme, Typography, CardActionArea } from "@mui/material";

import { UserRegisterForm } from "../../../components/UserAuthForm";
import { tokens } from "../../../theme";
import logo from "../../../data/logo.png";

const Register = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      backgroundColor={colors.primary[400]}
      className="mx-auto w-[80%] max-w-[500px] h-[80%] my-auto mt-20 rounded-lg"
    >
      <Box className="w-full h-full">
        <Box className="flex flex-col py-4 items-center w-full">
          <CardActionArea className="w-[120px] h-[120px] rounded-full border-1">
            <img alt="logo" src={logo} className="w-full h-full rounded-full" />
          </CardActionArea>
          <Typography
            variant="h1"
            color={colors.grey[100]}
            fontWeight="bold"
            className={`text-xl md:text-2xl  text-left my-4`}
          >
            Register Form
          </Typography>
        </Box>
      </Box>
      <Box className="pb-20">
        <UserRegisterForm />
      </Box>
    </Box>
  );
};

export default Register;
