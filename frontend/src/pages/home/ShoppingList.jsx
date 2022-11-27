import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ProductCard from "../../components/ProductCard";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/services/cartReducer";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import {
  useGetAllProductsQuery as getAllProductsQuery,
  useGetAllCategoryQuery as getAllCategoryQuery,
  useGetProductsByCategoryQuery as getProductsByCategoryQuery,
} from "../../redux/services/products";
import damyProduct from "./damyData";
import Grid from "@mui/material/Unstable_Grid2";
import { Container, Tabs, Tab } from "@mui/material";
import Header from "../../components/Header";
import CategoryTap from "../../components/CategoryTap";

const ProductsList = ({ category }) => {
  const {
    data: productsByCategory,
    isFetching: productsIsFetching,
    error: productsError,
  } = getProductsByCategoryQuery({
    category,
  });

  const {
    data: allProducts,
    isFetching: isFetchingAllProducts,
    error: errorFoAllProducts,
  } = getAllProductsQuery();

  return isFetchingAllProducts ? (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  ) : category === "all" ? (
    allProducts.products?.map((filteredProduct) => (
      <Grid
        xs={12}
        sm={6}
        md={4}
        lg={3}
        key={filteredProduct?.id}
        className={`h-100`}
      >
        <ProductCard
          product={filteredProduct}
          key={`${filteredProduct?.title}-${filteredProduct?.id}`}
        />
      </Grid>
    ))
  ) : (
    productsByCategory?.products.map((filteredProduct) => (
      <Grid
        xs={12}
        sm={6}
        md={4}
        lg={3}
        key={filteredProduct?.id}
        className={`h-100`}
      >
        <ProductCard
          product={filteredProduct}
          key={`${filteredProduct?.title}-${filteredProduct?.id}`}
        />
      </Grid>
    ))
  );
};
const ShoppingList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    data: allCategory,
    isFetching: isFetchingAllCategory,
    error: errorFoAllCategory,
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
      <Grid container spacing={{ sm: 4, md: 6 }}>
        <ProductsList category={categoryValue} />
      </Grid>
    </Box>
  );
};

export default ShoppingList;
