import { authApi } from "../auth/authApi";

export const customerApi = authApi.injectEndpoints({
  tagTypes: ["customers", "customer-details"],
  endpoints: (builder) => ({
    getAllCustomers: builder.query({
      query: () => `account/admin/customers/`,
      providesTags: ["customers"],
    }),
    getCustomerDetails: builder.query({
      query: ({ customerId }) => `account/admin/customers/${customerId}/`,
      providesTags: ["customer-details"],
    }),
    addCustomerNote: builder.mutation({
      query: ({ post }) => ({
        url: `account/admin/customers/note/add/`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["customers", "customer-details"],
    }),
  }),
});

export const {
  useGetAllCustomersQuery,
  useGetCustomerDetailsQuery,
  useAddCustomerNoteMutation,
} = customerApi;
export const { endpoints, reducerPath, reducer, middleware } = customerApi;
