import { authApi } from '../auth/authApi'

export const deliveryApi = authApi.injectEndpoints({
  tagTypes: ['delivery'],
  endpoints: (builder) => ({
    addDelivery: builder.mutation({
      query: ({ post }) => ({
        url: `service/delivery/add/`,
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['delivery'],
    }),
    getAllDelivery: builder.query({
      query: () => `service/delivery/`,
      providesTags: ['delivery'],
    }),
    updateDelivery: builder.mutation({
      query: ({ post }) => ({
        url: `service/delivery/${post.id}/update/`,
        method: 'PUT',
        body: post,
      }),
      invalidatesTags: ['delivery'],
    }),
    deleteDelivery: builder.mutation({
      query: ({ post }) => ({
        url: `service/delivery/${post.id}/delete/`,
        method: 'DELETE',
        body: post,
      }),
      invalidatesTags: ['delivery'],
    }),
  }),
})

export const {
  useGetAllDeliveryQuery,
  useAddDeliveryMutation,
  useUpdateDeliveryMutation,
  useDeleteDeliveryMutation,
} = deliveryApi
