import React, { useState, useEffect } from "react";

import { Box, Tabs, Tab } from "@mui/material";
import ProductsList from "./ProductsList";
import {
  useGetProductsByCategoryQuery,
  useGetAllCategoryQuery,
} from "../import";

const ShoppingList = () => {
  const { data: allCategory, isFetching: isFetchingAllCategory } =
    useGetAllCategoryQuery();

  const [categoryValue, setCategoryValue] = useState("all");
  const { data: productsByCategory } = useGetProductsByCategoryQuery({
    category: categoryValue,
  });

  const handleChange = (event, newValue) => {
    setCategoryValue(newValue);
  };

  return (
    <Box
      sx={{ maxWidth: "calc(var(--vw, 1vw)*100 - 5px)" }}
      className={`space-y-4`}
    >
      <Box
        className={`my-4 w-full bg-opacity-[90%]  backdrop-blur-xs bg-white/5`}
      >
        <Tabs
          textColor="secondary"
          indicatorColor="secondary"
          value={categoryValue}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="scrollable auto tabs example"
        >
          <Tab value="all" label="All" />
          {!isFetchingAllCategory &&
            allCategory?.map((category, index) => (
              <Tab key={index} value={category} label={category} />
            ))}
        </Tabs>
      </Box>
      <ProductsList products={productsByCategory?.products} />
    </Box>
  );
};

export default ShoppingList;
