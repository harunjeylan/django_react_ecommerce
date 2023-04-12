import React from "react";
import { Typography, Box, useTheme, Divider } from "@mui/material";
import { tokens } from "../theme";
import dateFormatter from "../helpers/dateFormatter";

const Comments = ({ comment }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Box className="flex gap-8 mb-4 w-full">
        {/* <Box className={`w-[160px]`}>
          <img
            alt={comment?.first_name}
            src={comment?.first_name}
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
              {comment?.first_name} {comment?.last_name}
            </Typography>
            <Typography variant="h4" className={``}>
              {dateFormatter(new Date(comment?.created))}
            </Typography>
          </Box>

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
