import React, { useState } from "react";
import { Box, Tabs, Tab, CircularProgress } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import ProductCard from "../components/ProductCard";
import {
  useGetAllProductsQuery as getAllProductsQuery,
  useGetAllCategoryQuery as getAllCategoryQuery,
  useGetProductsByCategoryQuery as getProductsByCategoryQuery,
} from "../redux/services/products";
const ProductsList = ({ category }) => {
  const { data: productsByCategory } = getProductsByCategoryQuery({
    category,
  });

  const { data: allProducts, isFetching: isFetchingAllProducts } =
    getAllProductsQuery();

  return isFetchingAllProducts ? (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  ) : category === "all" ? (
    <Box
      className={`grid grid-cols-1 
                    sm:grid-cols-2 
                    md:grid-cols-3 
                    lg:grid-cols-4 
                    xl:grid-cols-5 
      gap-4 items-center justify-center`}
    >
      {allProducts.products?.map((filteredProduct) => (
        <Box
          key={filteredProduct?.id}
          className={`h-100 w-100
                    max-w-[260px] 
                    md:max-w-[220px] 
                    lg:max-w-[240px] 
                    mx-auto`}
        >
          <ProductCard
            product={filteredProduct}
            key={`${filteredProduct?.title}-${filteredProduct?.id}`}
          />
        </Box>
      ))}
    </Box>
  ) : (
    <Box
      className={`grid grid-cols-1 
                    sm:grid-cols-2 
                    md:grid-cols-3 
                    lg:grid-cols-4   
            gap-4  items-center justify-center`}
    >
      {productsByCategory?.products.map((filteredProduct) => (
        <Box
          key={filteredProduct?.id}
          className={`h-100 w-100 
                    max-w-[260px] 
                    md:max-w-[220px] 
                    lg:max-w-[240px]  mx-auto`}
        >
          <ProductCard
            product={filteredProduct}
            key={`${filteredProduct?.title}-${filteredProduct?.id}`}
          />
        </Box>
      ))}
    </Box>
  );
};
const ShoppingList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    data: allCategory,
    isFetching: isFetchingAllCategory,
  } = getAllCategoryQuery();

  const [categoryValue, setCategoryValue] = useState("all");

  const handleChange = (event, newValue) => {
    setCategoryValue(newValue);
  };
  //  .filter(
  //               (product) =>
  //                 categoryValue === "all" || product?.category === categoryValue
  //             )
  return (
    <Box className={`space-y-4`}>
      <Box
        className={`my-4 w-full bg-opacity-[90%]  backdrop-blur-xs bg-white/5`}
      >
        <Tabs
          // textColor={colors.grey[100]}
          // indicatorColor={colors.greenAccent[400]}
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
      <ProductsList category={categoryValue} />
    </Box>
  );
};

export default ShoppingList;
