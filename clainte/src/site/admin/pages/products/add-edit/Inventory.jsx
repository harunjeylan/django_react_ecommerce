import React, { useState } from "react";
import { useTheme } from "@emotion/react";

import { Box, Typography, Tab, Tabs } from "@mui/material";

import PhoneMissedIcon from "@mui/icons-material/PhoneMissed";

import AdvancedForm from "./AdvancedForm";
import AttributesForm from "./AttributesForm";
import GlobalDeliveryForm from "./GlobalDeliveryForm";
import ShoppingForm from "./ShoppingForm";
import RestockForm from "./RestockForm";
import PricingForm from "./PricingForm";
import { tokens } from "../../../../../theme";

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
            <PricingForm
              setFieldValue={setFieldValue}
              handleBlur={handleBlur}
              handleChange={handleChange}
              values={values}
              touched={touched}
              errors={errors}
            />
          )}
          {inventoryValue === "restock" && (
            <RestockForm
              handleBlur={handleBlur}
              handleChange={handleChange}
              values={values}
              touched={touched}
              errors={errors}
            />
          )}
          {inventoryValue === "shipping" && (
            <ShoppingForm
              handleBlur={handleBlur}
              handleChange={handleChange}
              values={values}
              touched={touched}
              errors={errors}
            />
          )}
          {inventoryValue === "globalDelivery" && (
            <GlobalDeliveryForm
              handleBlur={handleBlur}
              handleChange={handleChange}
              values={values}
              touched={touched}
              errors={errors}
            />
          )}
          {inventoryValue === "attributes" && (
            <AttributesForm
              handleBlur={handleBlur}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
              values={values}
              touched={touched}
              errors={errors}
            />
          )}
          {inventoryValue === "advanced" && (
            <AdvancedForm
              handleBlur={handleBlur}
              handleChange={handleChange}
              values={values}
              touched={touched}
              errors={errors}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default InventoryForm;
