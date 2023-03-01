import { authApi } from "../../app/api/authApi";

export const organizeApi = authApi.injectEndpoints({
  tagTypes: ["organize"],
  endpoints: (builder) => ({
    getAllOrganize: builder.query({
      query: () => "api/organize/",
      providesTags: ["organize"],
    }),

    addOrganize: builder.mutation({
      query: ({ post }) => ({
        url: `api/organize/add/`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["organize"],
    }),
  }),
});

export const { useGetAllOrganizeQuery, useAddOrganizeMutation } = organizeApi;
