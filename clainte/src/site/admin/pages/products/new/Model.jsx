import React, { useContext } from "react";

import {
  Box,
  useTheme,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { tokens } from "../../../import";

const AccountDialog = ({
  openModel,
  setOpenModel,
  modelTitle,
  modelInputLabel,
  handleModelSubmit,
  modelInputRef,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      className={`${openModel ? "fixed " : "hidden"} bg-black/20 z-[1000] 
      w-full h-full left-0 top-0 justify-between items-center
      pt-[60px] ease-in-out`}
    >
      <Box
        backgroundColor={colors.primary[400]}
        className="mx-auto my-auto w-[600px] max-w-[90%] rounded-lg "
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
        <Box className="p-4 pb-8">
          <form onSubmit={handleModelSubmit}>
            <TextField
              color="secondary"
              fullWidth
              variant="filled"
              type="text"
              label={modelInputLabel}
              inputRef={modelInputRef}
            />
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default AccountDialog;
