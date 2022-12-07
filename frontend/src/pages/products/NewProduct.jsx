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
import Header from "../../components/Header";
import { useMediaQuery } from "@mui/material";
import { useAddProductMutation } from "../../redux/services/products";
import { Formik } from "formik";
import { getIn } from "formik";
import * as yup from "yup";
import { Dropzone, FileItem, FullScreenPreview } from "@dropzone-ui/react";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import PhoneMissedIcon from "@mui/icons-material/PhoneMissed";

import Stack from "@mui/material/Stack";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

const NewProduct = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [addProduct] = useAddProductMutation();
  const [inventoryValue, setInventoryValue] = useState("pricing");
  const formattedName = (type, field) => `${type}.${field}`;

  const formattedError = (type, field, touched, errors) =>
    Boolean(
      getIn(touched, formattedName(type, field)) &&
        getIn(errors, formattedName(type, field))
    );

  const formattedHelper = (type, field, touched, errors) =>
    getIn(touched, formattedName(type, field)) &&
    getIn(errors, formattedName(type, field));

  const handleFormSubmit = (values) => {
    console.log(values);
    addProduct({ post: values }).then((res) => {
      console.log(res.data);
    });
  };
  const [images, setImages] = useState([]);
  const [imageSrc, setImageSrc] = useState(undefined);

  const updateImages = (incommingImages, setFieldValue) => {
    console.log("incomming images", incommingImages);
    setImages(incommingImages);
    setFieldValue("images", incommingImages);
  };
  const onDeleteImages = (id) => {
    setImages(images.filter((x) => x.id !== id));
  };
  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };
  const [thumbnail, setThumbnail] = useState([]);

  const updateThumbnail = (incommingThumbnail, setFieldValue) => {
    console.log("incomming thumbnail", incommingThumbnail);
    setThumbnail(incommingThumbnail[0]);
    setFieldValue("thumbnail", incommingThumbnail[0]);
  };
  const onDeleteThumbnail = (id) => {
    setThumbnail(thumbnail.filter((x) => x.id !== id));
  };

  const handleClean = (thumbnail) => {
    console.log("list cleaned", thumbnail);
  };
  const getNowDate = () => {
    const today = new Date();
    return today.toLocaleDateString("en-US");
  };
  const initialValues = {
    title: "",
    description: "",
    price: 0,
    brand: "",
    category: "",
    thumbnail: "",
    images: [],
    restock: { quantity: "" },
    globalDelivery: {
      type: "",
      selectedCountries: [],
    },
    attributes: {
      fragileProduct: false,
      biodegradable: false,
      frozenProduct: {
        selected: false,
        maxAllowedTemperature: "",
      },
      expiryDate: {
        selected: false,
        date: getNowDate(),
      },
    },
    advanced: {
      productIDType: "",
      productID: "",
    },
  };
  const checkoutSchema = yup.object().shape({
    title: yup.string().required("Required"),
    description: yup.string().required("Required"),
    price: yup.number().required("Required"),
    brand: yup.string().required("Required"),
    category: yup.string().required("Required"),
  });
  return (
    <Box className={``}>
      <Box className={`container mx-auto my-[40px]`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            onClick={() => navigate(`/`)}
            variant="text"
            color="secondary"
            className={`bg-opacity-0 hover:bg-opacity-100 px-4 py-2 ${
              "hover:bg-" + colors.greenAccent[400]
            }`}
          >
            Home
          </Button>
          <Typography color="text.primary">Shoping</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`container mx-auto py-[20px] rounded-lg my-4`}>
        <Header title="CREATE PRODUCT" subtitle="Create a New product" />
      </Box>
      <Box className="container mx-auto">
        <Box
          sx={{
            "& .image-container": {
              padding: "5% 20% 10% 20% !important",
              zIndex: "1000000 !important",
              "& .full-screen-preview": {
                maxWidth: "60% !important",
              },
            },
          }}
        >
          <FullScreenPreview
            imgSource={imageSrc}
            openImage={imageSrc}
            onClose={(e) => handleSee(undefined)}
          />
        </Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <Box className="flex flex-col gap-8 lg:gap-4 lg:flex-row">
                  <Box className="w-full lg:w-[70%]">
                    <Box className="w-full flex flex-col gap-8">
                      <Box className="w-full">
                        <FormControl
                          component="fieldset"
                          variant="standard"
                          className="w-full "
                        >
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
                            <FormControl
                              variant="filled"
                              sx={{ gridColumn: "span 2" }}
                            >
                              <InputLabel id="category-select-label">
                                Category
                              </InputLabel>
                              <Select
                                fullWidth
                                color="secondary"
                                labelId="category-select-label"
                                id="category-select"
                                variant="filled"
                                value={values.category}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="category"
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
                              label="Product Description"
                              multiline
                              rows={4}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.description}
                              name="description"
                              error={
                                !!touched.description && !!errors.description
                              }
                              helperText={
                                touched.description && errors.description
                              }
                              sx={{ gridColumn: "span 4" }}
                            />
                            <Dropzone
                              style={{
                                minWidth: "100%",
                                gridColumn: "span 4",
                                backgroundColor: colors.primary[400],
                              }}
                              label="Drop your Display thumbnail here"
                              //view={"list"}
                              onChange={(incommingImages) =>
                                updateThumbnail(incommingImages, setFieldValue)
                              }
                              minHeight="195px"
                              onClean={handleClean}
                              value={values.thumbnail}
                              maxFiles={1}
                              //header={false}
                              // footer={false}
                              maxFileSize={2998000}
                              //label="Drag'n drop images here or click to browse"
                              //label="Suleta tus archivos aquí"
                              accept=".png,image/*"
                              uploadingMessage={"Uploading..."}
                              // url="https://my-awsome-server/upload-my-file"
                              //of course this url doens´t work, is only to make upload button visible
                              //uploadOnDrop
                              //clickable={false}
                              //   fakeUploading
                              //localization={"FR-fr"}
                              //   disableScroll
                            >
                              {thumbnail.length > 0 &&
                                thumbnail.map((file) => (
                                  <FileItem
                                    {...file}
                                    key={file.id}
                                    onDelete={onDeleteThumbnail}
                                    onSee={handleSee}
                                    //localization={"ES-es"}
                                    resultOnTooltip
                                    preview
                                    info
                                    hd
                                  />
                                ))}
                            </Dropzone>
                            <Dropzone
                              style={{
                                minWidth: "100%",
                                gridColumn: "span 4",
                                backgroundColor: colors.primary[400],
                              }}
                              label="Drop your Display images here"
                              //view={"list"}
                              onChange={(incommingImages) =>
                                updateImages(incommingImages, setFieldValue)
                              }
                              minHeight="195px"
                              onClean={handleClean}
                              value={values.images}
                              maxFiles={5}
                              //header={false}
                              // footer={false}
                              maxFileSize={2998000}
                              //label="Drag'n drop images here or click to browse"
                              //label="Suleta tus archivos aquí"
                              accept=".png,image/*"
                              uploadingMessage={"Uploading..."}
                              // url="https://my-awsome-server/upload-my-file"
                              //of course this url doens´t work, is only to make upload button visible
                              //uploadOnDrop
                              //clickable={false}
                              //   fakeUploading
                              //localization={"FR-fr"}
                              //   disableScroll
                            >
                              {images.length > 0 &&
                                images.map((file) => (
                                  <FileItem
                                    {...file}
                                    key={file.id}
                                    onDelete={onDeleteImages}
                                    onSee={handleSee}
                                    //localization={"ES-es"}
                                    resultOnTooltip
                                    preview
                                    info
                                    hd
                                  />
                                ))}
                            </Dropzone>
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
                          </FormGroup>
                        </FormControl>
                      </Box>
                      <Box
                        className="flex w-full border p-2"
                        backgroundColor={colors.primary[400]}
                      >
                        <Tabs
                          className="w-[30%] border-r"
                          orientation="vertical"
                          textColor="secondary"
                          indicatorColor="secondary"
                          value={inventoryValue}
                          onChange={(event, newValue) =>
                            setInventoryValue(newValue)
                          }
                          variant="scrollable"
                          scrollButtons="auto"
                          allowScrollButtonsMobile
                          aria-label="scrollable auto tabs example"
                        >
                          <Tab
                            className="px-2 h-2"
                            icon={<PhoneMissedIcon size="small" />}
                            iconPosition="start"
                            value="pricing"
                            label="Pricing"
                          />
                          <Tab
                            className="px-2 h-2"
                            icon={<PhoneMissedIcon size="small" />}
                            iconPosition="start"
                            value="restock"
                            label="Restock"
                          />
                          <Tab
                            className="px-2 h-2"
                            icon={<PhoneMissedIcon size="small" />}
                            iconPosition="start"
                            value="shipping"
                            label="Shipping"
                          />
                          <Tab
                            className="px-2 h-2"
                            icon={<PhoneMissedIcon size="small" />}
                            iconPosition="start"
                            value="globalDelivery"
                            label="Delivery"
                          />
                          <Tab
                            className="px-2 h-2"
                            icon={<PhoneMissedIcon size="small" />}
                            iconPosition="start"
                            value="attributes"
                            label="Attributes"
                          />
                          <Tab
                            className="px-2 h-2"
                            icon={<PhoneMissedIcon size="small" />}
                            iconPosition="start"
                            value="advanced"
                            label="Advanced"
                          />
                        </Tabs>
                        <Box className="w-[70%]">
                          {inventoryValue === "pricing" && (
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
                                <FormGroup className="flex flex h-full w-full gap-4 ">
                                  <TextField
                                    color="secondary"
                                    fullWidth
                                    variant="filled"
                                    type="number"
                                    label="Regular price"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.price}
                                    name="price"
                                    error={!!touched.price && !!errors.price}
                                    helperText={touched.price && errors.price}
                                    sx={{ gridColumn: "span 2" }}
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          $
                                        </InputAdornment>
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
                                    value={values.price}
                                    name="price"
                                    error={!!touched.price && !!errors.price}
                                    helperText={touched.price && errors.price}
                                    sx={{ gridColumn: "span 2" }}
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          $
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                </FormGroup>
                              </FormControl>
                            </Box>
                          )}
                          {inventoryValue === "restock" && (
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
                                      value={values.restock.quantity}
                                      name={formattedName(
                                        "restock",
                                        "quantity"
                                      )}
                                      error={formattedError(
                                        "restock",
                                        "quantity",
                                        touched,
                                        errors
                                      )}
                                      helperText={formattedHelper(
                                        "restock",
                                        "quantity",
                                        touched,
                                        errors
                                      )}
                                      sx={{ gridColumn: "span 2" }}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            $
                                          </InputAdornment>
                                        ),
                                      }}
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
                                  <Typography variant="subtitle1">
                                    Product in stock now:
                                  </Typography>
                                  <Typography variant="subtitle1">
                                    $1,090
                                  </Typography>
                                </Box>
                                <Box className="flex justify-between w-full">
                                  <Typography variant="subtitle1">
                                    Product in transit:
                                  </Typography>
                                  <Typography variant="subtitle1">
                                    5000
                                  </Typography>
                                </Box>
                                <Box className="flex justify-between w-full">
                                  <Typography variant="subtitle1">
                                    Last time restocked:
                                  </Typography>
                                  <Typography variant="subtitle1">
                                    30th June, 2021
                                  </Typography>
                                </Box>
                                <Box className="flex justify-between w-full">
                                  <Typography variant="subtitle1">
                                    Total stock over lifetime:
                                  </Typography>
                                  <Typography variant="subtitle1">
                                    20,000
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          )}
                          {inventoryValue === "shipping" && (
                            <Box className="flex flex-col justify-between h-full w-full gap-4 p-4">
                              <FormControl>
                                <FormLabel id="shipping-type-radio-buttons-group-label">
                                  <Typography
                                    variant="h1"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    className={`text-xl md:text-2xl  text-left mb-2`}
                                  >
                                    Shipping Type
                                  </Typography>
                                </FormLabel>

                                <RadioGroup
                                  aria-labelledby="shipping-type-radio-buttons-group-label"
                                  defaultValue="fullfilledBySeller"
                                  name={formattedName("shipping", "type")}
                                  className="flex flex h-full w-full gap-4 "
                                >
                                  <Box className="flex flex-col">
                                    <FormControlLabel
                                      value="fullfilledBySeller"
                                      control={<Radio color="secondary" />}
                                      label="Fullfilled by Seller"
                                    />
                                    <Typography
                                      className="ml-[25px]"
                                      variant="p"
                                    >
                                      You’ll be responsible for product
                                      delivery. Any damage or delay during
                                      shipping may cost you a Damage fee.
                                    </Typography>
                                  </Box>
                                  <Box className="flex flex-col">
                                    <FormControlLabel
                                      value="fullfilledByPhoenix"
                                      control={<Radio color="secondary" />}
                                      label="Fullfilled by Phoenix"
                                    />
                                    <Typography
                                      className="ml-[25px]"
                                      variant="p"
                                    >
                                      Your product, Our responsibility. For a
                                      measly fee, we will handle the delivery
                                      process for you.
                                    </Typography>
                                  </Box>
                                </RadioGroup>
                              </FormControl>
                              <Typography>
                                See our Delivery terms and conditions for
                                details.
                              </Typography>
                            </Box>
                          )}
                          {inventoryValue === "globalDelivery" && (
                            <Box className="flex flex-col justify-between h-full w-full gap-4 p-4">
                              <FormControl>
                                <FormLabel id="globalDelivery-radio-buttons-group-label">
                                  <Typography
                                    variant="h1"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    className={`text-xl md:text-2xl  text-left mb-2`}
                                  >
                                    Global Delivery
                                  </Typography>
                                </FormLabel>
                                <RadioGroup
                                  aria-labelledby="globalDelivery-radio-buttons-group-label"
                                  defaultValue="worldwideDelivery"
                                  name={formattedName("globalDelivery", "type")}
                                  className="flex flex h-full w-full gap-4 "
                                >
                                  <Box className="flex flex-col">
                                    <FormControlLabel
                                      value="worldwideDelivery"
                                      control={<Radio color="secondary" />}
                                      label="Worldwide delivery"
                                      onChange={handleChange}
                                    />
                                    <Typography
                                      className="ml-[25px]"
                                      variant="p"
                                    >
                                      Only available with Shipping method:
                                      Fullfilled by Alif
                                    </Typography>
                                  </Box>
                                  <Box className="flex flex-col">
                                    <FormControlLabel
                                      value="selectedCountries"
                                      control={<Radio color="secondary" />}
                                      label="Selected Countries"
                                      onChange={handleChange}
                                    />
                                    <Box className="ml-[25px]">
                                      <FormControl
                                        className="w-full"
                                        variant="filled"
                                        sx={{ gridColumn: "span 2" }}
                                      >
                                        <InputLabel id="selectedCountries-select-label">
                                          Countries
                                        </InputLabel>
                                        <Select
                                          fullWidth
                                          multiple
                                          color="secondary"
                                          labelId="selectedCountries-select-label"
                                          id="selectedCountries-select"
                                          input={
                                            <OutlinedInput
                                              id="select-multiple-chip"
                                              label="Chip"
                                            />
                                          }
                                          renderValue={(selected) => (
                                            <Box
                                              sx={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: 0.5,
                                              }}
                                            >
                                              {selected.map((value) => (
                                                <Chip
                                                  key={value}
                                                  label={value}
                                                />
                                              ))}
                                            </Box>
                                          )}
                                          value={
                                            values.globalDelivery
                                              .selectedCountries
                                          }
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          name={formattedName(
                                            "globalDelivery",
                                            "selectedCountries"
                                          )}
                                        >
                                          <MenuItem value="">
                                            <em>None</em>
                                          </MenuItem>
                                          <MenuItem value={10}>
                                            Ehiopia
                                          </MenuItem>
                                          <MenuItem value="Kenya">
                                            Kenya
                                          </MenuItem>
                                          <MenuItem value="Sudan">
                                            Sudan
                                          </MenuItem>
                                          <MenuItem value="Nigaria">
                                            Nigaria
                                          </MenuItem>
                                          <MenuItem value="Uganda">
                                            Uganda
                                          </MenuItem>
                                          <MenuItem value="Egipt">
                                            Egipt
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                    </Box>
                                  </Box>
                                  <Box className="flex flex-col">
                                    <FormControlLabel
                                      value="localDelivery"
                                      control={<Radio color="secondary" />}
                                      label="Local delivery"
                                    />
                                    <Typography
                                      className="ml-[25px]"
                                      variant="p"
                                    >
                                      Deliver to your country of residence
                                      Change profile address
                                    </Typography>
                                  </Box>
                                </RadioGroup>
                              </FormControl>
                              <Typography>
                                See our Delivery terms and conditions for
                                details.
                              </Typography>
                            </Box>
                          )}
                          {inventoryValue === "attributes" && (
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
                                <FormGroup className="flex flex h-full w-full gap-2">
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        color="secondary"
                                        onChange={handleChange}
                                        checked={
                                          values.attributes.fragileProduct
                                        }
                                        name={formattedName(
                                          "attributes",
                                          "fragileProduct"
                                        )}
                                      />
                                    }
                                    label="Fragile Product"
                                  />
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        color="secondary"
                                        onChange={handleChange}
                                        checked={
                                          values.attributes.biodegradable
                                        }
                                        name={formattedName(
                                          "attributes",
                                          "biodegradable"
                                        )}
                                      />
                                    }
                                    label="Biodegradable"
                                  />

                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        color="secondary"
                                        checked={
                                          values.attributes.frozenProduct
                                            .selected
                                        }
                                        onChange={handleChange}
                                        name={formattedName(
                                          "attributes.frozenProduct",
                                          "selected"
                                        )}
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
                                          checked={
                                            values.attributes.expiryDate
                                              .selected
                                          }
                                          name={formattedName(
                                            "attributes.expiryDate",
                                            "selected"
                                          )}
                                        />
                                      }
                                      label="Expiry Date of Product"
                                    />
                                    <Box className="ml-[25px]">
                                      <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                      >
                                        <Stack spacing={3}>
                                          {isNonMobile ? (
                                            <DesktopDatePicker
                                              label="Date desktop"
                                              inputFormat="MM/DD/YYYY"
                                              value={
                                                values.attributes.expiryDate
                                                  .date
                                              }
                                              onChange={(newValue) =>
                                                setFieldValue(
                                                  "attributes.expiryDate.date",
                                                  newValue
                                                )
                                              }
                                              renderInput={(params) => (
                                                <TextField
                                                  color="secondary"
                                                  fullWidth
                                                  variant="filled"
                                                  onBlur={handleBlur}
                                                  name={formattedName(
                                                    "attributes.expiryDate",
                                                    "date"
                                                  )}
                                                  error={formattedError(
                                                    "attributes.expiryDate",
                                                    "date",
                                                    touched,
                                                    errors
                                                  )}
                                                  helperText={formattedHelper(
                                                    "attributes.expiryDate",
                                                    "date",
                                                    touched,
                                                    errors
                                                  )}
                                                  {...params}
                                                />
                                              )}
                                            />
                                          ) : (
                                            <MobileDatePicker
                                              label="Date mobile"
                                              inputFormat="MM/DD/YYYY"
                                              value={
                                                values.attributes.expiryDate
                                                  .date
                                              }
                                              onChange={(newValue) =>
                                                setFieldValue(
                                                  "attributes.expiryDate.date",
                                                  newValue
                                                )
                                              }
                                              renderInput={(params) => (
                                                <TextField
                                                  color="secondary"
                                                  fullWidth
                                                  variant="filled"
                                                  onChange={handleChange}
                                                  name={formattedName(
                                                    "attributes.expiryDate",
                                                    "date"
                                                  )}
                                                  error={formattedError(
                                                    "attributes.expiryDate",
                                                    "date",
                                                    touched,
                                                    errors
                                                  )}
                                                  helperText={formattedHelper(
                                                    "attributes.expiryDate",
                                                    "date",
                                                    touched,
                                                    errors
                                                  )}
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
                          )}
                          {inventoryValue === "advanced" && (
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
                                <FormGroup className="flex flex h-full w-full gap-4 ">
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
                                      name={formattedName(
                                        "advanced",
                                        "productIDType"
                                      )}
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
                                    name={formattedName(
                                      "advanced",
                                      "productID"
                                    )}
                                    error={formattedError(
                                      "advanced",
                                      "productID",
                                      touched,
                                      errors
                                    )}
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
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  <Box className="w-full  lg:w-[30%]">
                    <Box className="flex flex-col gap-8 mt-8">
                      <Box className="flex flex-col gap-4 drop-shadow-lg bg-slate-400/10 rounded-lg">
                        <Box
                          className="px-4 py-4 "
                          backgroundColor={colors.primary[400]}
                        >
                          <Typography variant="h5" fontWeight="bold">
                            Order Summary
                          </Typography>
                        </Box>
                        <Box className="flex flex-col gap-4 px-4 py-2 ">
                          <Typography variant="h5" fontWeight="bold">
                            Order Summary
                          </Typography>
                          <Box className="h-full w-full">
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
                                  className={`text-xl md:text-2xl  text-left mb-2`}
                                >
                                  Advanced
                                </Typography>
                              </FormLabel>
                              <FormGroup className="flex flex  w-full gap-4 ">
                                <Box className="w-full flex flex-row lg:flex-col xl:flex-row gap-2">
                                  <FormControl
                                    className="w-full"
                                    variant="filled"
                                  >
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
                                      name={formattedName(
                                        "advanced",
                                        "productIDType"
                                      )}
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
                                    name={formattedName(
                                      "advanced",
                                      "productID"
                                    )}
                                    error={formattedError(
                                      "advanced",
                                      "productID",
                                      touched,
                                      errors
                                    )}
                                    helperText={formattedHelper(
                                      "advanced",
                                      "productID",
                                      touched,
                                      errors
                                    )}
                                    sx={{ gridColumn: "span 4" }}
                                  />
                                </Box>
                                <Box className="w-full flex flex-row lg:flex-col xl:flex-row gap-2">
                                  <FormControl
                                    className="w-full"
                                    variant="filled"
                                  >
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
                                      name={formattedName(
                                        "advanced",
                                        "productIDType"
                                      )}
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
                                    name={formattedName(
                                      "advanced",
                                      "productID"
                                    )}
                                    error={formattedError(
                                      "advanced",
                                      "productID",
                                      touched,
                                      errors
                                    )}
                                    helperText={formattedHelper(
                                      "advanced",
                                      "productID",
                                      touched,
                                      errors
                                    )}
                                    sx={{ gridColumn: "span 4" }}
                                  />
                                </Box>
                              </FormGroup>
                            </FormControl>
                          </Box>
                        </Box>
                        <Divider />
                      </Box>
                      <Box className="flex flex-col gap-4 drop-shadow-lg bg-slate-400/10 rounded-lg">
                        <Box
                          className="px-4 py-4 "
                          backgroundColor={colors.primary[400]}
                        >
                          <Typography variant="h5" fontWeight="bold">
                            Order Summary
                          </Typography>
                        </Box>
                        <Box className="flex flex-col gap-4 px-4 py-2 ">
                          <Typography variant="h5" fontWeight="bold">
                            Order Summary
                          </Typography>
                          <Typography className="">
                            Shipping and additional costs are calculated based
                            on values you have entered.
                          </Typography>
                          <Box className="flex justify-between mt-4">
                            <Typography variant="h5" fontWeight="bold">
                              Order Subtotal
                            </Typography>
                            <Typography
                              variant="h5"
                              fontWeight="bold"
                            ></Typography>
                          </Box>
                        </Box>
                        <Divider />
                        <Box className="flex justify-between px-4 pt-2 ">
                          <Typography variant="h5" fontWeight="bold">
                            Shipping and handling
                          </Typography>
                          <Typography variant="h5" fontWeight="bold">
                            $10.00
                          </Typography>
                        </Box>
                        <Divider />
                        <Box className="flex justify-between px-4 pt-2 ">
                          <Typography variant="h5" fontWeight="bold">
                            Tax
                          </Typography>
                          <Typography variant="h5" fontWeight="bold">
                            $0.00
                          </Typography>
                        </Box>
                        <Divider />
                        <Box className="flex justify-between px-4 pt-2 ">
                          <Typography variant="h5" fontWeight="bold">
                            Total
                          </Typography>
                          <Typography
                            variant="h5"
                            fontWeight="bold"
                          ></Typography>
                        </Box>
                        <Divider />
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box className="flex justify-start my-4">
                  <Button
                    type="submit"
                    color="secondary"
                    variant="outlined"
                    className={`px-8 py-3 `}
                  >
                    Create New product
                  </Button>
                </Box>
              </form>
            </>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default NewProduct;
