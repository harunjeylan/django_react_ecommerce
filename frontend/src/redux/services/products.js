import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//https://varkala-react-2.vercel.app/
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/",
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({ query: () => "products/" }),
    getProductsDetailes: builder.query({
      query: ({ productId }) => `products/${productId}`,
    }),
    getAllCategory: builder.query({
      query: () => `products/categories`,
    }),
    getProductsByCategory: builder.query({
      query: ({ category }) => `products/category/${category}`,
    }),
    getProductsByCategory: builder.query({
      query: ({ category }) => `products/category/${category}`,
    }),
    getLimitAndSkipProducts: builder.query({
      query: ({ limit, skip }) => `products?limit=${limit}&skip=${skip}`,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductsDetailesQuery,
  useGetProductsByCategoryQuery,
  useGetAllCategoryQuery,
  useGetLimitAndSkipProductsQuery,
} = productApi;
