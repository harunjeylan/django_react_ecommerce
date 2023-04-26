import { authApi } from "../auth/authApi";

export const orderApi = authApi.injectEndpoints({
  tagTypes: ["orders", "orders_details", "orders_for_admin"],
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => `service/orders/`,
      providesTags: ["orders"],
    }),

    getAllOrdersForAdmin: builder.query({
      query: () => `service/admin/orders/`,
      providesTags: ["orders_for_admin"],
    }),

    getOrderDetailes: builder.query({
      query: ({ orderId }) => `service/orders/${orderId}/`,
      providesTags: ["orders_details"],
    }),

    getOrderDetailsForAdmin: builder.query({
      query: ({ orderId }) => `service/admin/orders/${orderId}/`,
      providesTags: ["orders_details"],
    }),

    addOrder: builder.mutation({
      query: ({ post }) => ({
        url: `service/orders/add/`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["orders"],
    }),
    updateOrder: builder.mutation({
      query: ({ post }) => ({
        url: `service/orders/update/`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["orders"],
    }),
    deleteOrder: builder.mutation({
      query: ({ post }) => ({
        url: `service/orders/delete/`,
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

  useGetAllOrdersForAdminQuery,
  useGetOrderDetailsForAdminQuery,
} = orderApi;
