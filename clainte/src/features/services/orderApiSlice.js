import { authApi } from "../auth/authApi";

export const orderApi = authApi.injectEndpoints({
  tagTypes: ["orders", "orders_detaile"],
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => `api/orders/`,
      providesTags: ["orders"],
    }),
    getOrderDetailes: builder.query({
      query: ({ orderId }) => `api/orders/${orderId}/`,
      providesTags: ["orders_detaile"],
    }),
    addOrder: builder.mutation({
      query: ({ post }) => ({
        url: `api/orders/add/`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["orders"],
    }),
    updateOrder: builder.mutation({
      query: ({ post }) => ({
        url: `api/orders/update/`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["orders"],
    }),
    deleteOrder: builder.mutation({
      query: ({ post }) => ({
        url: `api/orders/delete/`,
        method: "DELETE",
        body: post,
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderDetailesQuery,
  useAddOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
