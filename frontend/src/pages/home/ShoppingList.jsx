import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Item from "../../components/Item";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  async function getItems() {
    const produacts = await fetch("http://127.0.0.1:8000/api/products", {
      method: "GET",
    });
    const produactsJson = await produacts.json();
    console.log(produactsJson);

    dispatch(setItems(produactsJson));
  }

  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        {items.map((item) => (
          <Item item={item} key={`${item.name}-${item.id}`} />
        ))}
        <div></div>
      </Box>
    </Box>
  );
};

export default ShoppingList;
