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

const ProductInformationForm = ({
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
  const [imageSrc, setImageSrc] = useState(undefined);

  const handleClean = (image) => {
    console.log("list cleaned", image);
  };
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
    <Box className="w-full">
      <FullScreenPreview
        imgSource={imageSrc}
        openImage={imageSrc}
        onClose={() => setImageSrc(undefined)}
      />
      <FormControl component="fieldset" variant="standard" className="w-full ">
        <FormLabel>
          <Typography
            variant="h1"
            color={colors.grey[100]}
            fontWeight="bold"
            className={`text-xl md:text-2xl  text-left mb-2`}
          >
            Product Information
          </Typography>
        </FormLabel>
        <FormGroup className="w-full flex flex-col gap-4">
          <Box>
            <Typography variant="h6" fontWeight="bold" className="my-2">
              Product Title
            </Typography>
            <TextField
              color="secondary"
              fullWidth
              variant="filled"
              type="text"
              label="Product Title"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.title}
              name="title"
              error={!!touched.title && !!errors.title}
              helperText={touched.title && errors.title}
              sx={{ gridColumn: "span 2" }}
            />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="bold" className="my-2">
              Product Description
            </Typography>
            <TextField
              color="secondary"
              fullWidth
              variant="filled"
              type="text"
              label="Product Description"
              multiline
              rows={4}
              onBlur={handleBlur}
              onChange={(incommingImages) =>
                setFieldValue("images", incommingImages)
              }
              value={values.description}
              name="description"
              error={!!touched.description && !!errors.description}
              helperText={touched.description && errors.description}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="bold" className="my-2">
              Display Thumbnail
            </Typography>
            <Dropzone
              style={{
                minHeight: "200px",
                minWidth: "100%",
                backgroundColor: colors.primary[400],
              }}
              label="Drop your Display thumbnail here or click to browse"
              onChange={(incommingImages) =>
                setFieldValue("thumbnail", incommingImages)
              }
              onClean={handleClean}
              value={values.thumbnail}
              maxFiles={5}
              maxFileSize={2998000}
              accept=".png,image/*"
              uploadingMessage={"Uploading..."}
            >
              {values.thumbnail.length &&
                values.thumbnail.map((file) => (
                  <FileItem
                    {...file}
                    key={file.id}
                    onDelete={(id) =>
                      setFieldValue(
                        "thumbnail",
                        values.thumbnail.filter((x) => x.id !== id)
                      )
                    }
                    onSee={(imageSource) => setImageSrc(imageSource)}
                    resultOnTooltip
                    preview
                    info
                    hd
                  />
                ))}
            </Dropzone>
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="bold" className="my-2">
              Display Images
            </Typography>
            <Dropzone
              style={{
                minHeight: "200px",
                minWidth: "100%",
                backgroundColor: colors.primary[400],
              }}
              label="Drop your Display images here or click to browse"
              onChange={(incommingImages) =>
                setFieldValue("images", incommingImages)
              }
              onClean={handleClean}
              value={values.images}
              maxFiles={5}
              maxFileSize={2998000}
              accept=".png,image/*"
              uploadingMessage={"Uploading..."}
            >
              {values.images.length &&
                values.images.map((file) => (
                  <FileItem
                    {...file}
                    key={file.id}
                    onDelete={(id) =>
                      setFieldValue(
                        "images",
                        values.images.filter((x) => x.id !== id)
                      )
                    }
                    onSee={(imageSource) => setImageSrc(imageSource)}
                    resultOnTooltip
                    preview
                    info
                    hd
                  />
                ))}
            </Dropzone>
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="bold" className="my-2">
              Brand
            </Typography>
            <TextField
              color="secondary"
              fullWidth
              variant="filled"
              type="text"
              label="Brand"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.brand}
              name="brand"
              error={!!touched.brand && !!errors.brand}
              helperText={touched.brand && errors.brand}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default ProductInformationForm;
