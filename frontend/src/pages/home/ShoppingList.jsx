import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Item from "../../components/Item";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../redux/services/cartReducer";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useGetAllProductsQuery } from "../../redux/services/products";
import damyProduct from "./damyData";
const ShoppingList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, isFetching, error } = useGetAllProductsQuery();
  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {isFetching ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : (
          data.products.map((item) => (
            <Item item={item} key={`${item.title}-${item.id}`} />
          ))
        )}
        <div></div>
      </Box>
    </Box>
  );
};

export default ShoppingList;
