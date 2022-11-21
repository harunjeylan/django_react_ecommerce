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
const ShoppingList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    data: allProducts,
    isFetching: isFetchingAllProducts,
    error: errorFoAllProducts,
  } = getAllProductsQuery();
  const {
    data: allCategory,
    isFetching: isFetchingAllCategory,
    error: errorFoAllCategory,
  } = getAllCategoryQuery();
  const [categoryValue, setCategoryValue] = useState("all");
  // const [products, setProducts] = useState(allProducts);
  // const {
  //   data: productsByCategory,
  //   isFetching: productsIsFetching,
  //   error: productsError,
  // } = getProductsByCategoryQuery({
  //   category: categoryValue,
  // });
  // const getProducts = () => {
  //   setProducts(productsByCategory);
  // };
  // useEffect(() => {
  //   getProducts();
  // }, [categoryValue]);

  const handleChange = (event, newValue) => {
    setCategoryValue(newValue);
  };

  return (
    <Box className={`space-y-4`}>
      <Header title="Shopping List" subtitle="welcome to you Shopping List" />
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
      <Grid
        container
        spacing={{ xs: 3, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {isFetchingAllProducts ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : (
          allProducts.products
            .filter(
              (product) =>
                categoryValue === "all" || product?.category === categoryValue
            )
            .map((filteredProduct) => (
              <Grid
                xs={12}
                sm={12}
                md={6}
                lg={4}
                xl={3}
                key={filteredProduct.id}
              >
                <ProductCard
                  product={filteredProduct}
                  key={`${filteredProduct?.title}-${filteredProduct?.id}`}
                />
              </Grid>
            ))
        )}
      </Grid>
    </Box>
  );
};

export default ShoppingList;
