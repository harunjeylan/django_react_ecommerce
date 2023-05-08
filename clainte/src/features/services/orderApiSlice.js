import { authApi } from '../auth/authApi'

export const orderApi = authApi.injectEndpoints({
  tagTypes: ['orders', 'orders_details', 'orders_for_admin'],
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => `service/orders/`,
      providesTags: ['orders'],
    }),

    getOrderDetails: builder.query({
      query: ({ orderId }) => `service/orders/${orderId}/`,
      providesTags: ['orders_details'],
    }),

    addOrder: builder.mutation({
      query: ({ post }) => ({
        url: `service/orders/add/`,
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['orders'],
    }),
    updateOrder: builder.mutation({
      query: ({ post }) => ({
        url: `service/orders/update/`,
        method: 'PUT',
        body: post,
      }),
      invalidatesTags: ['orders', 'orders_details', 'orders_for_admin'],
    }),
    deleteOrder: builder.mutation({
      query: ({ post }) => ({
        url: `service/orders/delete/`,
        method: 'DELETE',
        body: post,
      }),
      invalidatesTags: ['orders', 'orders_details', 'orders_for_admin'],
    }),
  }),
})

export const {
  useGetAllOrdersQuery,
  useGetOrderDetailsQuery,
  useAddOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi
