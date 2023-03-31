import React from "react";
import { Typography, Box, useTheme, Divider } from "@mui/material";
import { tokens } from "../theme";

const Comments = ({ comment }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Box className="flex gap-8 mb-4 w-full">
        <Box className={`w-[160px]`}>
          {/* <img
            alt={comment?.first_name}
            src={comment?.first_name}
            className={`h-[100px] w-[100px] rounded-[50%]`}
          /> */}
          <Typography
            variant="h4"
            color={colors.greenAccent[500]}
            className={`text-md lg:text-lg my-2`}
          >
            {comment?.created}
          </Typography>
        </Box>
        <Box className={`w-full`}>
          <Typography
            variant="h2"
            color={colors.greenAccent[500]}
            fontWeight="bold"
            className={`text-lg md:text-xl lg:text-2xl mb-2`}
          >
            {comment?.first_name} {comment?.last_name}
          </Typography>
          <Typography variant="h5" color={colors.grey[400]}>
            {comment?.description}
          </Typography>
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export default Comments;
