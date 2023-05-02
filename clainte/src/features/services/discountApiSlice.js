import { authApi } from "../auth/authApi";

export const discountApi = authApi.injectEndpoints({
  tagTypes: ["discounts"],
  endpoints: (builder) => ({
    addDiscount: builder.mutation({
      query: ({ post }) => ({
        url: `service/discounts/add/`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["discounts"],
    }),
    getAllDiscounts: builder.query({
      query: ({ limit }) => {
        let queryKey = "";
        queryKey = limit !== null ? queryKey + `limit=${limit}&` : queryKey;
        return `service/discounts/all/?${queryKey}`;
      },
      providesTags: ["discounts"],
    }),
    getDiscounts: builder.query({
      query: ({ limit }) => {
        let queryKey = "";
        queryKey = limit !== null ? queryKey + `limit=${limit}&` : queryKey;
        return `service/discounts/?${queryKey}`;
      },
      providesTags: ["discounts"],
    }),
    updateDiscount: builder.mutation({
      query: ({ post }) => ({
        url: `service/discounts/update/`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["discounts"],
    }),
    deleteDiscount: builder.mutation({
      query: ({ post }) => ({
        url: `service/discounts/delete/`,
        method: "DELETE",
        body: post,
      }),
      invalidatesTags: ["discounts"],
    }),
  }),
});

export const {
  useGetAllDiscountsQuery,
  useGetDiscountsQuery,
  useAddDiscountMutation,
  useUpdateDiscountMutation,
  useDeleteDiscountMutation,
} = discountApi;
