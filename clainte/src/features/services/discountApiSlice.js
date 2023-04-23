import { authApi } from "../auth/authApi";

export const discountApi = authApi.injectEndpoints({
  tagTypes: ["discounts"],
  endpoints: (builder) => ({
    addDiscount: builder.mutation({
      query: ({ post }) => ({
        url: `api/discounts/add/`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["discounts"],
    }),
    getAllDiscounts: builder.query({
      query: () => `api/discounts/`,
      providesTags: ["discounts"],
    }),
    updateDiscount: builder.mutation({
      query: ({ post }) => ({
        url: `api/discounts/update/`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["discounts"],
    }),
    deleteDiscount: builder.mutation({
      query: ({ post }) => ({
        url: `api/discounts/delete/`,
        method: "DELETE",
        body: post,
      }),
      invalidatesTags: ["discounts"],
    }),
  }),
});

export const {
  useGetAllDiscountsQuery,
  useAddDiscountMutation,
  useUpdateDiscountMutation,
  useDeleteDiscountMutation,
} = discountApi;
