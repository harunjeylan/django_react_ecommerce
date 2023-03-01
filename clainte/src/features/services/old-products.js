import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//https://varkala-react-2.vercel.app/
//https://prium.github.io/phoenix/v1.6.0/
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
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
      query: ({ category }) =>
        category === "all" ? "products/" : `products/category/${category}`,
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
