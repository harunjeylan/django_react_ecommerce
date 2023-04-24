import React from "react";
import { useTheme } from "@emotion/react";

import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  Box,
  TextField,
  Typography,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormGroup,
  Checkbox,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { tokens } from "../../../../../theme";

const AttributesForm = ({
  setFieldValue,
  handleBlur,
  handleChange,
  values,
  touched,
  errors,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

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
            Attributes
          </Typography>
        </FormLabel>
        <FormGroup className="flex  h-full w-full gap-2">
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                onChange={handleChange}
                checked={values?.fragileProduct}
                name="fragileProduct"
              />
            }
            label="Fragile Product"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                onChange={handleChange}
                checked={values?.biodegradable}
                name="biodegradable"
              />
            }
            label="Biodegradable"
          />

          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                checked={values?.frozenProduct?.selected}
                onChange={handleChange}
                name="frozenProduct.selected"
              />
            }
            label="Frozen Product"
          />
          <Box className="flex flex-col">
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  onChange={handleChange}
                  checked={values?.expiryDate?.selected}
                  name="expiryDate.selected"
                />
              }
              label="Expiry Date of Product"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DemoItem className="w-full" label="Start Date">
                  <DatePicker
                    fullWidth
                    format="DD/MM/YYYY"
                    openTo="year"
                    views={["year", "month", "day"]}
                    defaultValue={values?.expiryDate?.date}
                    onChange={(newVal) => setFieldValue("start_date", newVal)}
                  />
                  {!!touched.expiryDate?.date && !!errors.expiryDate?.date && (
                    <>
                      <Divider color="error" className="h-[2px] mt-[-1px]" />
                      <Typography className="text-red-500">
                        {touched.expiryDate?.date && errors.expiryDate?.date}
                      </Typography>
                    </>
                  )}
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default AttributesForm;
