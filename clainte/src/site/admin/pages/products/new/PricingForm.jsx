import React from "react";
import { useTheme } from "@emotion/react";

import InputAdornment from "@mui/material/InputAdornment";
import {
  Box,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  FormGroup,
} from "@mui/material";

import { tokens } from "../../../import";

const PricingForm = ({ handleBlur, handleChange, values, touched, errors }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box className="h-full w-full">
      <FormControl
        className="h-full w-full p-4"
        component="fieldset"
        variant="standard"
      >
        <FormLabel>
          <Typography
            variant="h1"
            color={colors.grey[100]}
            fontWeight="bold"
            className={`text-xl md:text-2xl  text-left mb-2`}
          >
            Pricing
          </Typography>
        </FormLabel>
        <FormGroup className="flex  h-full w-full gap-4 ">
          <TextField
            color="secondary"
            fullWidth
            variant="filled"
            type="number"
            label="Regular price"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.regularPrice}
            name="regularPrice"
            error={!!touched.regularPrice && !!errors.regularPrice}
            helperText={touched.regularPrice && errors.regularPrice}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />

          <TextField
            color="secondary"
            fullWidth
            variant="filled"
            type="number"
            label="Sale price"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.salePrice}
            name="salePrice"
            error={!!touched.salePrice && !!errors.salePrice}
            helperText={touched.salePrice && errors.salePrice}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default PricingForm;
