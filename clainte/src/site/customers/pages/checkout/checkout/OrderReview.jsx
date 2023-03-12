import React from "react";
import { Typography, Divider, Box, CardActionArea } from "@mui/material";

import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";

const OrderReview = () => {
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Box className="w-full my-4">
      {cart.map((item, ind) => (
        <Box key={`${item.title}-${item.id}-${ind}`}>
          <Box className="flex gap-2 items-center pb-4">
            <Box className="m-1">
              <CardActionArea
                onClick={() => navigate(`/product/${item?.id}`)}
                className={`${
                  theme.palette.mode === "dark" ? "bg-white/5" : "bg-black/5"
                } bg-opacity-90 p-1 w-[180px] h-[140px] rounded-md flex
                        items-center ease-in-out duration-300`}
              >
                <img
                  alt={item?.title}
                  className="w-full h-full rounded-md"
                  src={`${item?.thumbnail}`}
                />
              </CardActionArea>
            </Box>
            <Box className="flex flex-col px-2 w-full ">
              <Box className="my-2">
                <Typography variant="h3" fontWeight="bold">
                  {item.title}
                </Typography>
              </Box>

              <Box className="flex flex-col md:flex-row justify-between  my-2 ">
                <Box>
                  <Typography>
                    <strong>Price per item</strong>
                    {" : "}
                    <span>${item.sale_pricing}</span>
                  </Typography>

                  <Typography>
                    <strong>Total price</strong>
                    {" : "}
                    <span>${item.sale_pricing * item.count}</span>
                  </Typography>
                </Box>
                <Box>
                  <Typography>
                    <strong>Quantity</strong>
                    {" : "}
                    <span>{item.count}</span>
                  </Typography>
                  {item?.selectedVariants?.map((selectedVariant, index) => (
                    <Typography key={index}>
                      <strong>
                        {selectedVariant.variantLabel}
                        {" : "}
                      </strong>
                      <span> {selectedVariant.optionLabel} </span>,
                    </Typography>
                  ))}
                </Box>
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
