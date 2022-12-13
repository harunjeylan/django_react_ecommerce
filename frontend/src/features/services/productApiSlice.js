import { authApi } from "../../app/api/authApi";

export const productApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({ query: () => "api/products/" }),
  }),
});

export const { useGetAllProductsQuery } = productApi;
