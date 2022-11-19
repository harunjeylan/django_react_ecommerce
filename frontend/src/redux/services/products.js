import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/",
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({ query: () => "products/" }),
    getProductsDetailes: builder.query({
      query: (productId) => `products/${productId}`,
    }),
    getAllProductsByCategory: builder.query({
      query: (category) => `products/category/${category}`,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  getProductsDetailes,
  getAllProductsByCategory,
} = productApi;
