import { authApi } from "../auth/authApi";

export const blogApi = authApi.injectEndpoints({
  tagTypes: [
    "blogs",
    "blogs-details",
    "blogs-data",
    "blogs-by-searchAndFilter",
    "pin-to-top-blogs",
    "recent-blogs",
    "blogs-archives",
    "blogs-categories",
    "blogs-tags",
  ],
  endpoints: (builder) => ({
    addBlog: builder.mutation({
      query: ({ post }) => ({
        url: `blogs/add/`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["blogs"],
    }),
    getBlogForAdmin: builder.query({
      query: ({ blogId }) => {
        return `blogs/${blogId}/admin`;
      },
      providesTags: ["blogs-data"],
    }),
    getBlogDetails: builder.query({
      query: ({ blogId }) => `blogs/${blogId}/`,
      providesTags: ["blogs-details"],
    }),
    uploadImage: builder.mutation({
      query: ({ post }) => ({
        url: `blogs/images/upload/`,
        method: "POST",
        body: post,
        invalidatesTags: ["blogs"],
      }),
    }),
    addBlogReview: builder.mutation({
      query: ({ post, blogId }) => ({
        url: `blogs/${blogId}/review/add/`,
        method: "POST",
        body: post,
        invalidatesTags: ["blogs", "blogs-details"],
      }),
    }),
    getRatings: builder.query({
      query: () => "blogs/ratings/",
    }),

    getAllBlogs: builder.query({
      query: () => `blogs/`,
      providesTags: ["blogs"],
    }),

    searchAndFilterBlogs: builder.query({
      query: ({ searchAndFilter }) => `search-and-filter/?${searchAndFilter}`,
      providesTags: ["blogs-by-searchAndFilter"],
    }),
    getPinToTopBlogs: builder.query({
      query: () => `pin-to-top/`,
      providesTags: ["pin-to-top-blogs"],
    }),
    getLastBlogs: builder.query({
      query: () => `last/`,
      providesTags: ["last-blogs"],
    }),
    getRecentBlogs: builder.query({
      query: () => `recent/`,
      providesTags: ["recent-blogs"],
    }),
    getArchives: builder.query({
      query: () => `archives/`,
      providesTags: ["blogs-archives"],
    }),
    getAllCategory: builder.query({
      query: () => `categories/`,
      providesTags: ["blogs-categories"],
    }),
    getAllTags: builder.query({
      query: () => `tags/`,
      providesTags: ["blogs-tags"],
    }),

    updateBlog: builder.mutation({
      query: ({ post }) => ({
        url: `blogs/update/`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["blogs"],
    }),
    deleteBlog: builder.mutation({
      query: ({ post }) => ({
        url: `blogs/delete/`,
        method: "DELETE",
        body: post,
      }),
      invalidatesTags: ["blogs"],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,

  useSearchAndFilterBlogsQuery,
  useGetPinToTopBlogsQuery,
  useGetLastBlogsQuery,
  useGetRecentBlogsQuery,
  useGetArchivesQuery,
  useGetAllCategoryQuery,
  useGetAllTagsQuery,

  useAddBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useUploadImageMutation,
  useAddBlogReviewMutation,
  useGetRatingsQuery,
  useGetBlogDetailsQuery,
  useGetBlogForAdminQuery,
} = blogApi;
