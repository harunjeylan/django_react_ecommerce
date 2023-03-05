import React from "react";
import { useTheme } from "@emotion/react";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

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
import { getIn } from "formik";

import { tokens } from "../../../import";

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
                error={!!touched.biodegradable && !!errors.biodegradable}
                helperText={touched.biodegradable && errors.biodegradable}
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
            <Box className="ml-[25px]">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                  {isNonMobile ? (
                    <DesktopDatePicker
                      label="Date desktop"
                      inputFormat="MM/DD/YYYY"
                      value={values?.expiryDate?.date}
                      onChange={(newValue) =>
                        setFieldValue("expiryDate.date", newValue)
                      }
                      renderInput={(params) => (
                        <TextField
                          color="secondary"
                          fullWidth
                          variant="filled"
                          onBlur={handleBlur}
                          name="expiryDate.date"
                          error={
                            !!touched.expiryDate?.date &&
                            !!errors.expiryDate?.date
                          }
                          helperText={
                            touched.expiryDate?.date && errors.expiryDate?.date
                          }
                          {...params}
                        />
                      )}
                    />
                  ) : (
                    <MobileDatePicker
                      label="Date mobile"
                      inputFormat="MM/DD/YYYY"
                      value={values?.expiryDate?.date}
                      onChange={(newValue) =>
                        setFieldValue("expiryDate.date", newValue)
                      }
                      renderInput={(params) => (
                        <TextField
                          color="secondary"
                          fullWidth
                          variant="filled"
                          onChange={handleChange}
                          name="expiryDate.date"
                          error={
                            !!touched.expiryDate?.date &&
                            !!errors.expiryDate?.date
                          }
                          helperText={
                            touched.expiryDate?.date && errors.expiryDat?.date
                          }
                          {...params}
                        />
                      )}
                    />
                  )}
                </Stack>
              </LocalizationProvider>
            </Box>
          </Box>
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default AttributesForm;
