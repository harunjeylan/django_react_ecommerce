import React from "react";
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header2 = ({ title, subtitle, bodyText }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box className={`flex flex-col gap-2 w-full items-center text-center 30px`}>
      <Typography
        variant="h1"
        color={colors.grey[100]}
        fontWeight="bold"
        className={`text-4xl md:text-6xl  text-center`}
      >
        {title}
      </Typography>
      <Typography
        variant="subtitle"
        className={`text-2xl md:text-4xl  text-center`}
        color={colors.greenAccent[400]}
      >
        {subtitle}
      </Typography>
      <Typography
        variant="body2"
        className={`w-full px-auto  my-auto`}
      >
        {bodyText}
      </Typography>
    </Box>
  );
};

export default Header2;
