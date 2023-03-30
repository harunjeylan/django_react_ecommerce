import React from "react";
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header3 = ({ title, subtitle, bodyText }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box className={`flex flex-col gap-2 w-full justify-start `}>
      <Typography
        variant="h3"
        color={colors.grey[100]}
        fontWeight="bold"
        className={`text-4xl md:text-6xl  max-w-lg`}
      >
        {title}
      </Typography>
      <Typography
        variant="h4"
        className={`text-xl md:text-2xl  max-w-lg`}
        color={colors.greenAccent[400]}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header3;
