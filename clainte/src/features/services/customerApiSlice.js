import { authApi } from "../auth/authApi";

export const customerApi = authApi.injectEndpoints({
  tagTypes: ["customers"],
  endpoints: (builder) => ({
    getAllCustomers: builder.query({
      query: () => `api/admin/customers/`,
      providesTags: ["customers"],
    }),
    getCustomerDetails: builder.query({
      query: ({ customerId }) => `api/admin/customers/${customerId}/`,
      providesTags: ["customers"],
    }),
  }),
});

export const { useGetAllCustomersQuery, useGetCustomerDetailsQuery } =
  customerApi;
export const { endpoints, reducerPath, reducer, middleware } = customerApi;
