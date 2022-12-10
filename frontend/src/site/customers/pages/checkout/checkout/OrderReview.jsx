import React from "react";
import { Typography, Divider, Box } from "@mui/material";

import { useSelector } from "react-redux";

const OrderReview = () => {
  const cart = useSelector((state) => state.cart.cart);

  return (
    <Box className="w-full my-4">
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
