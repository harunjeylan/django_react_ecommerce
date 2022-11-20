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
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
const ShoppingList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, isFetching, error } = useGetAllProductsQuery();
  return (
    <>
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {isFetching ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : (
          data.products.map((item) => (
            <Grid xs={12} sm={12} md={6} lg={4} xl={3} key={item.id}>
              <Item item={item} key={`${item.title}-${item.id}`} />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

export default ShoppingList;
