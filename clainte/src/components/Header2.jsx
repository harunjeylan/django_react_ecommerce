import React from "react";
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header2 = ({ title, subtitle, bodyText }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box className={`flex flex-col gap-2 w-full items-center text-center `}>
      <Typography
        variant="h1"
        color={colors.grey[100]}
        fontWeight="bold"
        className={`text-2xl md:text-4xl  text-center max-w-lg`}
      >
        {title}
      </Typography>
      <Typography
        variant="subtitle1"
        className={`text-lg md:text-xl  text-center max-w-lg`}
        color={colors.greenAccent[400]}
      >
        {subtitle}
      </Typography>
      <Typography
        variant="subtitle2"
        className={`w-full px-auto  my-auto max-w-lg`}
      >
        {bodyText}
      </Typography>
    </Box>
  );
};

export default Header2;
