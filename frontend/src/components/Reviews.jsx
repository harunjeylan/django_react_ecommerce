import React from "react";
import { Typography, Box, useTheme, Rating, Divider } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ review }) => {
  const { author, bodyTaxt, rating, date } = review;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Box className="flex gap-8 mb-4 w-full">
        <Box className={`w-[160px]`}>
          <img
            alt={author?.fullName}
            src={author?.image}
            className={`h-[100px] w-[100px] rounded-[50%]`}
          />
          <Typography
            variant="h4"
            color={colors.greenAccent[500]}
            className={`text-md lg:text-lg my-2`}
          >
            {date}
          </Typography>
        </Box>
        <Box className={`w-full`}>
          <Typography
            variant="h2"
            color={colors.greenAccent[500]}
            fontWeight="bold"
            className={`text-lg md:text-xl lg:text-2xl mb-2`}
          >
            {author?.fullName}
          </Typography>
          <Rating name="read-only" defaultValue={rating} readOnly />
          <Typography variant="h5" color={colors.grey[400]}>
            {bodyTaxt}
          </Typography>
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export default Header;
