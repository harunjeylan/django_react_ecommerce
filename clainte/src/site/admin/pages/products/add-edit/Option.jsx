import React, { useRef } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const Option = ({
  option,
  creatingVariant,
  editingVariant,
  handleUpdateOptionLabel,
  handleDeleteOption,
}) => {
  const InputRef = useRef();
  return (
    <Box className="flex justify-between items-center gap-2">
      <TextField
        size="small"
        color="secondary"
        fullWidth
        type="text"
        name="option"
        defaultValue={option?.label}
        inputRef={InputRef}
        onChange={() =>
          handleUpdateOptionLabel({
            option: option,
            newLabel: InputRef.current.value,
          })
        }
        required
      />
      <IconButton
        onClick={() =>
          handleDeleteOption({ variant: editingVariant, option: option })
        }
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
};
export default Option;
