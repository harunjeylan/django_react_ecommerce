import React from "react";
import { useTheme } from "@emotion/react";

import {
  Box,
  MenuItem,
  InputLabel,
  Typography,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  Chip,
  OutlinedInput,
  Select,
} from "@mui/material";
import { getIn } from "formik";

import { constants } from "./constants";
import { tokens } from "../../../import";

const GlobalDeliveryForm = ({
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

  return (
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
          labelled="globalDelivery-radio-buttons-group-label"
          defaultValue="worldwide_delivery"
          name={formattedName("globalDelivery", "type")}
          className="flex h-full w-full gap-4 "
          value={values.globalDelivery.type}
          onChange={handleChange}
        >
          <Box className="flex flex-col">
            <FormControlLabel
              value="worldwide_delivery"
              control={<Radio color="secondary" />}
              label="Worldwide delivery"
              onChange={handleChange}
            />
            <Typography className="ml-[25px]" variant="p">
              Only available with Shipping method: Fulfilled by Alif
            </Typography>
          </Box>
          <Box className="flex flex-col">
            <FormControlLabel
              value="selected_countries"
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
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
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
                  name={formattedName("globalDelivery", "selectedCountries")}
                  error={formattedError(
                    "globalDelivery",
                    "selectedCountries",
                    touched,
                    errors
                  )}
                >
                  {constants.countries?.map((country, index) => (
                    <MenuItem
                      key={`country-${country.code}-${index}`}
                      value={country.code}
                    >
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box className="flex flex-col">
            <FormControlLabel
              value="local_delivery"
              control={<Radio color="secondary" />}
              label="Local delivery"
            />
            <Typography className="ml-[25px]" variant="p">
              Deliver to your country of residence Change profile address
            </Typography>
          </Box>
        </RadioGroup>
      </FormControl>
      <Typography>
        See our Delivery terms and conditions for details.
      </Typography>
    </Box>
  );
};

export default GlobalDeliveryForm;
