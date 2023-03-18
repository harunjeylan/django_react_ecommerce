import { authApi } from "../auth/authApi";

export const orderApi = authApi.injectEndpoints({
  tagTypes: ["orders", "orders_details", "orders_for_admin"],
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => `api/orders/`,
      providesTags: ["orders"],
    }),

    getAllOrdersForAdmin: builder.query({
      query: () => `api/admin/orders/`,
      providesTags: ["orders_for_admin"],
    }),

    getOrderDetailes: builder.query({
      query: ({ orderId }) => `api/orders/${orderId}/`,
      providesTags: ["orders_details"],
    }),

    getOrderDetailsForAdmin: builder.query({
      query: ({ orderId }) => `api/admin/orders/${orderId}/`,
      providesTags: ["orders_details"],
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

  useGetAllOrdersForAdminQuery,
  useGetOrderDetailsForAdminQuery,
} = orderApi;
