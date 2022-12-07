import React from "react";
import { Typography, Box, useTheme,  Divider, } from "@mui/material";
import { tokens } from "../theme";

const OrderSummery = ({ totalPrice }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box className="flex flex-col gap-4 drop-shadow-lg bg-slate-400/10 rounded-lg">
      <Box className="px-4 py-4 " backgroundColor={colors.primary[400]}>
        <Typography variant="h5" fontWeight="bold">
          Order Summary
        </Typography>
      </Box>
      <Box className="flex flex-col gap-4 px-4 py-2 ">
        <Typography variant="h5" fontWeight="bold">
          Order Summary
        </Typography>
        <Typography className="">
          Shipping and additional costs are calculated based on values you have
          entered.
        </Typography>
        <Box className="flex justify-between mt-4">
          <Typography variant="h5" fontWeight="bold">
            Order Subtotal
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            ${totalPrice}
          </Typography>
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
        <Typography variant="h5" fontWeight="bold">
          ${totalPrice + 10}
        </Typography>
      </Box>
      <Divider />
    </Box>
  );
};

export default OrderSummery;
