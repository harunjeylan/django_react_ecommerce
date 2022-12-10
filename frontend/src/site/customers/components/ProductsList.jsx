import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ProductCard from "./ProductCard";
import {
  useGetAllProductsQuery,
  useGetProductsByCategoryQuery,
} from "../import";

const ProductsList = ({ category, isShopping = false }) => {
  const { data: productsByCategory } = useGetProductsByCategoryQuery({
    category,
  });
  const { data: allProducts } = useGetAllProductsQuery();

  const [products, setProduct] = useState([]);

  useEffect(() => {
    if (category === "all") {
      setProduct(allProducts?.products);
    } else {
      setProduct(productsByCategory?.products);
    }
  }, [category, productsByCategory, allProducts]);

  return (
    <Box
      className={`h-full grid grid-cols-12 ${
        !isShopping && "xl:grid-cols-10"
      }  gap-2 md:gap-4`}
    >
      {products?.map((filteredProduct) => (
        <Box
          key={filteredProduct?.id}
          className={`col-span-12  xs:col-span-6  md:col-span-4  lg:col-span-3  ${
            !isShopping && "xl:col-span-2"
          } mx-auto`}
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

export default ProductsList;
