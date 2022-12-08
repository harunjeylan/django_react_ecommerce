import React from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  InputLabel,
  Typography,
  Breadcrumbs,
  Tab,
  Tabs,
  Divider,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  FormGroup,
  Chip,
  Checkbox,
  OutlinedInput,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Select from "@mui/material/Select";
import Header from "../../../components/Header";
import { useMediaQuery } from "@mui/material";
import { useAddProductMutation } from "../../../redux/services/products";
import { Formik } from "formik";
import { getIn } from "formik";

import { Dropzone, FileItem, FullScreenPreview } from "@dropzone-ui/react";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../theme";
import { useNavigate } from "react-router-dom";
import PhoneMissedIcon from "@mui/icons-material/PhoneMissed";

import Stack from "@mui/material/Stack";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

import { newProductSchema } from "./newProductSchema";
import { initialValues } from "./initialValues";
import { constants } from "./constants";

const VariantsForm = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
  setFieldValue,
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
    <Box className="drop-shadow-lg bg-slate-400/10 rounded-lg p-4">
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
