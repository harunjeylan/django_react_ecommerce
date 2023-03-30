import React from "react";
import { Typography, Box, useTheme, Rating, Divider } from "@mui/material";
import { tokens } from "../theme";

const Comments = ({ review }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Box className="flex gap-8 mb-4 w-full">
        <Box className={`w-[160px]`}>
          <img
            alt={review?.first_name}
            src={review?.first_name}
            className={`h-[100px] w-[100px] rounded-[50%]`}
          />
          <Typography
            variant="h4"
            color={colors.greenAccent[500]}
            className={`text-md lg:text-lg my-2`}
          >
            {review?.created}
          </Typography>
        </Box>
        <Box className={`w-full`}>
          <Typography
            variant="h2"
            color={colors.greenAccent[500]}
            fontWeight="bold"
            className={`text-lg md:text-xl lg:text-2xl mb-2`}
          >
            {review?.first_name} {review?.last_name}
          </Typography>
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

export default Comments;
