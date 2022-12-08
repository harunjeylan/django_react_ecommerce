import React from "react";
import {
  Box,
  Button,
  MenuItem,
  InputLabel,
  Typography,
  FormControl,
  FormLabel,
  FormGroup,
} from "@mui/material";

import Select from "@mui/material/Select";

import { useTheme } from "@emotion/react";
import { tokens } from "../../../theme";

const VariantsForm = ({ values, handleBlur, handleChange }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      backgroundColor={colors.primary[400]}
      className="drop-shadow-lg  rounded-lg p-4"
    >
      <FormControl
        className="h-full w-full"
        component="fieldset"
        variant="standard"
      >
        <FormLabel>
          <Typography
            variant="h1"
            color={colors.grey[100]}
            fontWeight="bold"
            className={`text-xl md:text-2xl  text-left my-4`}
          >
            Variants
          </Typography>
        </FormLabel>
        <FormGroup className="w-full grid grid-cols-2  lg:grid-cols-1 xl:grid-cols-2 gap-2">
          {values.variants.map((variant, index) => (
            <Box key={`variant-${variant.name}-${index}`} className="w-full">
              <Box className="w-full flex justify-between px-1 gap-2">
                <Typography variant="h6" fontWeight="bold" className="my-2">
                  {variant.name}
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  className={`my-2 cursor-pointer hover:text-green-400`}
                  color={colors.blueAccent[400]}
                >
                  remove
                </Typography>
              </Box>
              <FormControl variant="filled" className="w-full">
                <InputLabel id="category-select-label">
                  {variant.name}
                </InputLabel>
                <Select
                  fullWidth
                  color="secondary"
                  labelId="category-select-label"
                  id="category-select"
                  variant="filled"
                  value={variant.value}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name={`variants[${index}].value`}
                >
                  {variant.options.map((option, index) => (
                    <MenuItem key={`option-${option}-${index}`} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          ))}
        </FormGroup>
      </FormControl>
      <Button
        type="button"
        color="secondary"
        variant="outlined"
        className={`w-full mt-4`}
      >
        Add another option
      </Button>
    </Box>
  );
};

export default VariantsForm;
