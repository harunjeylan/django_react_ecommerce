import React from "react";
import { Typography, Box, useTheme } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MoneyIcon from "@mui/icons-material/Money";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { tokens } from "../import";

const Service = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Box className="flex space-x-4">
        <LocalShippingIcon fontSize="large" />
        <Box className="service-text">
          <Typography
            color={colors.grey[100]}
            variant="h4"
            fontWeight="bold"
            className="text-sm mb-1"
          >
            Free shipping &amp; return
          </Typography>
          <Typography
            variant="subtitle"
            color={colors.grey[200]}
            className="text-muted fw-light text-sm mb-0"
          >
            Free Shipping over $300
          </Typography>
        </Box>
      </Box>
      <Box className="flex space-x-4">
        <MoneyIcon fontSize="large" />
        <Box className="service-text">
          <Typography
            color={colors.grey[100]}
            variant="h4"
            fontWeight="bold"
            className="text-sm mb-1"
          >
            Money back guarantee
          </Typography>
          <Typography
            variant="subtitle"
            color={colors.grey[200]}
            className="text-muted fw-light text-sm mb-0"
          >
            30 Days Money Back Guarantee
          </Typography>
        </Box>
      </Box>
      <Box className="flex space-x-4">
        <PriceCheckIcon fontSize="large" />
        <Box className="service-text">
          <Typography
            color={colors.grey[100]}
            variant="h4"
            fontWeight="bold"
            className="text-sm mb-1"
          >
            Best prices
          </Typography>
          <Typography
            variant="subtitle"
            color={colors.grey[200]}
            className="text-muted fw-light text-sm mb-0"
          >
            Always the best prices
          </Typography>
        </Box>
      </Box>
      <Box className="flex space-x-4">
        <SupportAgentIcon fontSize="large" />
        <Box className="service-text">
          <Typography
            color={colors.grey[100]}
            variant="h4"
            fontWeight="bold"
            className="text-sm mb-1"
          >
            020-800-456-747
          </Typography>
          <Typography
            variant="subtitle"
            color={colors.grey[200]}
            className="text-muted fw-light text-sm mb-0"
          >
            24/7 Available Support
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Service;
