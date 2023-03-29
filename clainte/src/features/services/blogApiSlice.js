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
    "blog-collections",
    "blog-filter",
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
      query: ({ searchAndFilter }) =>
        `blogs/search-and-filter/?${searchAndFilter}`,
      providesTags: ["blogs-by-searchAndFilter"],
    }),
    getBlogCollections: builder.query({
      query: () => `blogs/collections/`,
      providesTags: ["blog-collections"],
    }),
    getPinToTopBlogs: builder.query({
      query: () => `blogs/pin/`,
      providesTags: ["pin-to-top-blogs"],
    }),
    getLastBlogs: builder.query({
      query: () => `blogs/last/`,
      providesTags: ["last-blogs"],
    }),
    getRecentBlogs: builder.query({
      query: () => `blogs/recent/`,
      providesTags: ["recent-blogs"],
    }),

    getBlogFilter: builder.query({
      query: () => `blogs/filter/`,
      providesTags: ["blog-filter"],
    }),
    getArchives: builder.query({
      query: () => `blogs/archives/`,
      providesTags: ["blogs-archives"],
    }),
    getAllCategory: builder.query({
      query: () => `blogs/categories/`,
      providesTags: ["blogs-categories"],
    }),
    getAllTags: builder.query({
      query: () => `blogs/tags/`,
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
  useGetBlogCollectionsQuery,
  useGetLastBlogsQuery,
  useGetRecentBlogsQuery,
  useGetArchivesQuery,
  useGetBlogFilterQuery,
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
