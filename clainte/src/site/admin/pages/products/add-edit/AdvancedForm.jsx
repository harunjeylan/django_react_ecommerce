import React from "react";
import { useTheme } from "@emotion/react";

import {
  Box,
  TextField,
  MenuItem,
  InputLabel,
  Typography,
  FormControl,
  FormLabel,
  FormGroup,
  Select,
} from "@mui/material";
import { tokens } from "../../../../../theme";

const AdvancedForm = ({
  handleBlur,
  handleChange,
  values,
  touched,
  errors,
}) => {
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
            Advanced
          </Typography>
        </FormLabel>
        <FormGroup className="flex h-full w-full gap-4 ">
          <FormControl variant="filled">
            <InputLabel id="productIDType-select-label">
              Product ID Type
            </InputLabel>
            <Select
              fullWidth
              color="secondary"
              labelId="productIDType-select-label"
              id="productIDType-select"
              value={values?.productIDType}
              onBlur={handleBlur}
              onChange={handleChange}
              name="productIDType"
              error={!!touched.productIDType && !!errors.productIDType}
              helperText={touched.productIDType && errors.productIDType}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <TextField
            color="secondary"
            fullWidth
            variant="filled"
            type="text"
            label="Product ID"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.advanced?.productID}
            name="productID"
            error={!!touched.productID && !!errors.productID}
            helperText={touched.productID && errors.productID}
            sx={{ gridColumn: "span 4" }}
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default AdvancedForm;
