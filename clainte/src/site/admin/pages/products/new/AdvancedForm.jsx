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
import { getIn } from "formik";

import { tokens } from "../../../import";

const AdvancedForm = ({
  handleBlur,
  handleChange,
  values,
  touched,
  errors,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const formattedName = (type, field) => `${type}.${field}`;

  const formattedError = (type, field, touched, errors) =>
    Boolean(
      getIn(touched, formattedName(type, field)) &&
        getIn(errors, formattedName(type, field))
    );

  const formattedHelper = (type, field, touched, errors) =>
    getIn(touched, formattedName(type, field)) &&
    getIn(errors, formattedName(type, field));
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
              value={values.advanced.productIDType}
              onBlur={handleBlur}
              onChange={handleChange}
              name={formattedName("advanced", "productIDType")}
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
            value={values.advanced.productID}
            name={formattedName("advanced", "productID")}
            error={formattedError("advanced", "productID", touched, errors)}
            helperText={formattedHelper(
              "advanced",
              "productID",
              touched,
              errors
            )}
            sx={{ gridColumn: "span 4" }}
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default AdvancedForm;
