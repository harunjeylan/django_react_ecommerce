import React from "react";
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header2 = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box className={`flex flex-col gap-2 w-full items-center text-center `}>
      <Box className={`flex flex-col gap-2 w-full justify-start items-center`}>
        <Typography
          variant="h4"
          color={colors.grey[100]}
          fontWeight="bold"
          className={`text-3xl md:text-4xl text-center`}
        >
          {title}
        </Typography>
        <Typography
          variant="h4"
          className={`text-md md:text-lg text-center`}
          color={colors.greenAccent[400]}
        >
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default Header2;
