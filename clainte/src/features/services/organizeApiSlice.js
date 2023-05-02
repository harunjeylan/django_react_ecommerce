import { authApi } from "../auth/authApi";

export const organizeApi = authApi.injectEndpoints({
  tagTypes: ["organize", "categories"],
  endpoints: (builder) => ({
    getAllOrganize: builder.query({
      query: () => "service/organize/",
      providesTags: ["organize"],
    }),
    getAllCategory: builder.query({
      query: () => `service/organize/categories/`,
      providesTags: ["categories"],
    }),
    addOrganize: builder.mutation({
      query: ({ post }) => ({
        url: `service/organize/add/`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["organize"],
    }),
    updateOrganize: builder.mutation({
      query: ({ post }) => ({
        url: `service/organize/update/`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["organize"],
    }),
    deleteOrganize: builder.mutation({
      query: ({ post }) => ({
        url: `service/organize/delete/`,
        method: "DELETE",
        body: post,
      }),
      invalidatesTags: ["organize"],
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useGetAllOrganizeQuery,
  useAddOrganizeMutation,
  useDeleteOrganizeMutation,
  useUpdateOrganizeMutation,
} = organizeApi;
