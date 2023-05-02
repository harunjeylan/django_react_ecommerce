import { authApi } from "../auth/authApi";

export const contactApi = authApi.injectEndpoints({
  tagTypes: ["contact"],
  endpoints: (builder) => ({
    addContact: builder.mutation({
      query: ({ post }) => ({
        url: `service/contact/add/`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["contact"],
    }),
    getAllContacts: builder.query({
      query: () => `service/contact/`,
      providesTags: ["contact"],
    }),
    updateContact: builder.mutation({
      query: ({ post }) => ({
        url: `service/contact/update/`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["contact"],
    }),
    deleteContact: builder.mutation({
      query: ({ post }) => ({
        url: `service/contact/delete/`,
        method: "DELETE",
        body: post,
      }),
      invalidatesTags: ["contact"],
    }),
  }),
});

export const {
  useGetAllContactsQuery,
  useAddContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactApi;
