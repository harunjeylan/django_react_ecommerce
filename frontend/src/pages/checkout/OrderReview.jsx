import React from "react";
import { Typography, Divider, Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import {} from "../../redux/services/cartReducer";

const OrderReview = () => {
  const cart = useSelector((state) => state.cart.cart);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  return (
    <Box className="w-full">
      {cart.map((item, ind) => (
        <Box key={`${item.title}-${item.id}-${ind}`}>
          <Box className="flex gap-2 items-center pb-4">
            <Box className="m-1">
              <img
                alt={item?.title}
                className="max-w-[140px] max-h-[140px]"
                src={`${item?.images[0]}`}
              />
            </Box>
            <Box className="flex flex-col px-2 w-full">
              <Box className="my-2">
                <Typography fontWeight="bold">{item.title}</Typography>
              </Box>

              <Box className="flex justify-between items-center my-2 ">
                <Typography fontWeight="bold">Price per item</Typography>
                <Typography fontWeight="bold">${item.price}</Typography>
              </Box>
              <Box className="flex justify-between items-center my-2 ">
                <Typography fontWeight="bold">Quantity</Typography>
                <Typography fontWeight="bold">{item.count}</Typography>
              </Box>
              <Box className="flex justify-between items-center my-2 ">
                <Typography fontWeight="bold">Total price</Typography>
                <Typography fontWeight="bold">
                  ${item.price * item.count}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Divider />
        </Box>
      ))}
    </Box>
  );
};

export default OrderReview;
