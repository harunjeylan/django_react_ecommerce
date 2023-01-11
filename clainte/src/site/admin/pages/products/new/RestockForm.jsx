import React from "react";
import { useTheme } from "@emotion/react";

import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  FormGroup,
} from "@mui/material";

import { tokens } from "../../../import";

const RestockForm = ({ handleBlur, handleChange, values, touched, errors }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box className="h-full w-full">
      <Box className="flex  gap-2">
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
              Add to Stock
            </Typography>
          </FormLabel>
          <FormGroup className="flex h-full w-full gap-4">
            <TextField
              color="secondary"
              fullWidth
              variant="filled"
              type="number"
              label="Add to Stock"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.restockQuantity}
              name="restockQuantity"
              error={!!touched.restockQuantity && !!errors.restockQuantity}
              helperText={touched.restockQuantity && errors.restockQuantity}
            />
            <Button
              type="button"
              color="secondary"
              variant="outlined"
              className={`px-8 py-3 `}
            >
              Confirm
            </Button>
          </FormGroup>
        </FormControl>
      </Box>
      <Box className="flex flex-col gap-4 p-4">
        <Box className="flex justify-between w-full">
          <Typography variant="subtitle1">Product in stock now:</Typography>
          <Typography variant="subtitle1">$1,090</Typography>
        </Box>
        <Box className="flex justify-between w-full">
          <Typography variant="subtitle1">Product in transit:</Typography>
          <Typography variant="subtitle1">5000</Typography>
        </Box>
        <Box className="flex justify-between w-full">
          <Typography variant="subtitle1">Last time restocked:</Typography>
          <Typography variant="subtitle1">30th June, 2021</Typography>
        </Box>
        <Box className="flex justify-between w-full">
          <Typography variant="subtitle1">
            Total stock over lifetime:
          </Typography>
          <Typography variant="subtitle1">20,000</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RestockForm;
