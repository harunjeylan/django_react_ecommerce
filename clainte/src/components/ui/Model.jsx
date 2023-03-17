import React from "react";

import { Box, useTheme, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { tokens } from "../../theme";

const Model = ({ children, openModel, setOpenModel, modelTitle, width }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const getWidth = () => {
    switch (width) {
      case "lg":
        return 1024;
      case "md":
        return 768;
      case "sm":
        return 640;
      case "xs":
        return 460;
      default:
        return 640;
    }
  };
  return (
    <Box
      className={`${openModel ? "fixed " : "hidden"} bg-black/20
      w-full h-full left-0 top-0 justify-between items-center
      overflow-y-auto
      pt-[60px] ease-in-out z-[10000000]`}
    >
      <Box
        width={getWidth()}
        backgroundColor={colors.primary[400]}
        className={`mx-auto my-auto max-w-[90%] rounded-lg`}
      >
        <Box className="px-4 py-4 flex justify-between items-center ease-in-out">
          <Typography
            variant="h1"
            color={colors.grey[100]}
            fontWeight="bold"
            className={`text-xl md:text-2xl  text-left my-4`}
          >
            {modelTitle}
          </Typography>
          <Box>
            <IconButton onClick={() => setOpenModel(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        <Box className="px-4 pb-8">{children}</Box>
      </Box>
    </Box>
  );
};

export default Model;
