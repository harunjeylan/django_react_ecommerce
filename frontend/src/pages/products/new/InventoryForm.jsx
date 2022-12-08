import React from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  InputLabel,
  Typography,
  Tab,
  Tabs,
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
import { useMediaQuery } from "@mui/material";

import { getIn } from "formik";

import { useState } from "react";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../theme";

import PhoneMissedIcon from "@mui/icons-material/PhoneMissed";

import Stack from "@mui/material/Stack";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

const InventoryForm = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const formattedName = (type, field) => `${type}.${field}`;

  const formattedError = (type, field, touched, errors) =>
    Boolean(
      getIn(touched, formattedName(type, field)) &&
        getIn(errors, formattedName(type, field))
    );

  const formattedHelper = (type, field, touched, errors) =>
    getIn(touched, formattedName(type, field)) &&
    getIn(errors, formattedName(type, field));

  const [inventoryValue, setInventoryValue] = useState("pricing");
  return (
    <Box className="w-full">
      <Typography
        variant="h1"
        color={colors.grey[100]}
        fontWeight="bold"
        className={`text-xl md:text-2xl  text-left mb-2`}
      >
        Inventory
      </Typography>
      <Box
        className="flex w-full border p-2"
        sx={{ borderColor: colors.grey[300] }}
        backgroundColor={colors.primary[400]}
      >
        <Tabs
          className="w-[30%] border-r"
          orientation="vertical"
          textColor="secondary"
          indicatorColor="secondary"
          value={inventoryValue}
          onChange={(event, newValue) => setInventoryValue(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="scrollable auto tabs example"
          sx={{
            "& .MuiTab-root": {
              padding: "0px !important",
              height: "10px !important",
              textAlign: "start !important",
              margin: "0px !important",
            },
          }}
        >
          <Tab
            className="border-b m-0 p-0 h-[10px]"
            icon={<PhoneMissedIcon size="small" />}
            iconPosition="start"
            value="pricing"
            label="Pricing"
          />
          <Tab
            className="border-b m-0"
            icon={<PhoneMissedIcon size="small" />}
            iconPosition="start"
            value="restock"
            label="Restock"
          />
          <Tab
            className="border-b m-0"
            icon={<PhoneMissedIcon size="small" />}
            iconPosition="start"
            value="shipping"
            label="Shipping"
          />
          <Tab
            className="border-b m-0"
            icon={<PhoneMissedIcon size="small" />}
            iconPosition="start"
            value="globalDelivery"
            label="Delivery"
          />
          <Tab
            className="border-b m-0"
            icon={<PhoneMissedIcon size="small" />}
            iconPosition="start"
            value="attributes"
            label="Attributes"
          />
          <Tab
            className="border-b m-0"
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
                    value={values.price}
                    name="price"
                    error={!!touched.price && !!errors.price}
                    helperText={touched.price && errors.price}
                    sx={{ gridColumn: "span 2" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
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
                      value={values.restockQuantity}
                      name="restockQuantity"
                      error={
                        !!touched.restockQuantity && !!errors.restockQuantity
                      }
                      helperText={
                        touched.restockQuantity && errors.restockQuantity
                      }
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
                  <Typography variant="subtitle1">$1,090</Typography>
                </Box>
                <Box className="flex justify-between w-full">
                  <Typography variant="subtitle1">
                    Product in transit:
                  </Typography>
                  <Typography variant="subtitle1">5000</Typography>
                </Box>
                <Box className="flex justify-between w-full">
                  <Typography variant="subtitle1">
                    Last time restocked:
                  </Typography>
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
                    <Typography className="ml-[25px]" variant="p">
                      You’ll be responsible for product delivery. Any damage or
                      delay during shipping may cost you a Damage fee.
                    </Typography>
                  </Box>
                  <Box className="flex flex-col">
                    <FormControlLabel
                      value="fullfilledByPhoenix"
                      control={<Radio color="secondary" />}
                      label="Fullfilled by Phoenix"
                    />
                    <Typography className="ml-[25px]" variant="p">
                      Your product, Our responsibility. For a measly fee, we
                      will handle the delivery process for you.
                    </Typography>
                  </Box>
                </RadioGroup>
              </FormControl>
              <Typography>
                See our Delivery terms and conditions for details.
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
                    <Typography className="ml-[25px]" variant="p">
                      Only available with Shipping method: Fullfilled by Alif
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
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}
                          value={values.globalDelivery.selectedCountries}
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
                          <MenuItem value={10}>Ehiopia</MenuItem>
                          <MenuItem value="Kenya">Kenya</MenuItem>
                          <MenuItem value="Sudan">Sudan</MenuItem>
                          <MenuItem value="Nigaria">Nigaria</MenuItem>
                          <MenuItem value="Uganda">Uganda</MenuItem>
                          <MenuItem value="Egipt">Egipt</MenuItem>
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
                    <Typography className="ml-[25px]" variant="p">
                      Deliver to your country of residence Change profile
                      address
                    </Typography>
                  </Box>
                </RadioGroup>
              </FormControl>
              <Typography>
                See our Delivery terms and conditions for details.
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
                        checked={values.attributes.fragileProduct}
                        name={formattedName("attributes", "fragileProduct")}
                      />
                    }
                    label="Fragile Product"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        onChange={handleChange}
                        checked={values.attributes.biodegradable}
                        name={formattedName("attributes", "biodegradable")}
                      />
                    }
                    label="Biodegradable"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        checked={values.attributes.frozenProduct.selected}
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
                          checked={values.attributes.expiryDate.selected}
                          name={formattedName(
                            "attributes.expiryDate",
                            "selected"
                          )}
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
                              value={values.attributes.expiryDate.date}
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
                              value={values.attributes.expiryDate.date}
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
  );
};

export default InventoryForm;
