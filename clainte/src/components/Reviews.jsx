import React from "react";
import { Typography, Box, useTheme, Rating, Divider } from "@mui/material";
import { tokens } from "../theme";
import dateFormatter from "../helpers/dateFormatter";

const Reviews = ({ review }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Box className="flex gap-8 mb-4 w-full">
        {/* <Box className={`w-[160px]`}>
          <img
            alt={review?.first_name}
            src={review?.first_name}
            className={`h-[100px] w-[100px] rounded-[50%]`}
          />
        </Box> */}
        <Box className={`w-full`}>
          <Box className="flex gap-2 items-center justify-start my-2">
            <Typography
              variant="h2"
              color={colors.greenAccent[500]}
              fontWeight="bold"
              className={`text-lg md:text-xl lg:text-2xl`}
            >
              {review?.first_name} {review?.last_name}
            </Typography>
            <Typography variant="h4" className={``}>
              {dateFormatter(new Date(review?.created))}
            </Typography>
          </Box>
          <Rating name="read-only" defaultValue={review?.rating} readOnly />
          <Typography variant="h5" color={colors.grey[400]}>
            {review?.description}
          </Typography>
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export default Reviews;
