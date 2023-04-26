import { authApi } from "../auth/authApi";

export const customerApi = authApi.injectEndpoints({
  tagTypes: ["customers"],
  endpoints: (builder) => ({
    getAllCustomers: builder.query({
      query: () => `service/admin/customers/`,
      providesTags: ["customers"],
    }),
    getCustomerDetails: builder.query({
      query: ({ customerId }) => `service/admin/customers/${customerId}/`,
      providesTags: ["customers"],
    }),
  }),
});

export const { useGetAllCustomersQuery, useGetCustomerDetailsQuery } =
  customerApi;
export const { endpoints, reducerPath, reducer, middleware } = customerApi;
