import { authApi } from "../../app/api/authApi";

export const organizeApi = authApi.injectEndpoints({
  tagTypes: ["organize", "categoreis"],
  endpoints: (builder) => ({
    getAllOrganize: builder.query({
      query: () => "api/organize/",
      providesTags: ["organize"],
    }),
    getAllCategory: builder.query({
      query: () => `api/organize/categories/`,
      providesTags: ["categoreis"],
    }),
    addOrganize: builder.mutation({
      query: ({ post }) => ({
        url: `api/organize/add/`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["organize"],
    }),
    updateOrganize: builder.mutation({
      query: ({ post }) => ({
        url: `api/organize/update/`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["organize"],
    }),
    deleteOrganize: builder.mutation({
      query: ({ post }) => ({
        url: `api/organize/delete/`,
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
