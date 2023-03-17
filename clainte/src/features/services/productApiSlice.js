import { authApi } from "../auth/authApi";

export const productApi = authApi.injectEndpoints({
  tagTypes: [
    "products",
    "recommended-products",
    "products-by-category",
    "products_details",
    "brands",
    "admin_products",
    "products_data",
  ],
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: ({ post }) => ({
        url: `api/products/add/`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["products", "recommended-products"],
    }),
    getAllProducts: builder.query({
      query: () => "api/products/",
      providesTags: ["products"],
    }),

    getRecommendedProducts: builder.query({
      query: () => "api/products/recommended/",
      providesTags: ["recommended-products"],
    }),
    searchAndFilterProducts: builder.query({
      query: ({ searchAndFilter }) =>
        `api/products/search-and-filter/${searchAndFilter}`,
      providesTags: ["products-by-searchAndFilter"],
    }),
    getProductsDetails: builder.query({
      query: ({ productId }) => `api/products/${productId}/`,
      providesTags: ["products_details"],
    }),
    getProductsData: builder.query({
      query: ({ productId }) => `api/admin/products/${productId}/`,
      providesTags: ["products_data"],
    }),
    getProductsByCategory: builder.query({
      query: ({ category }) => `api/products/category/${category}/`,
      providesTags: ["products-by-category"],
    }),
    getRelatedProducts: builder.query({
      query: ({ productId }) => `api/products/${productId}/related/`,
      providesTags: ["products-by-category"],
    }),
    uploadImage: builder.mutation({
      query: ({ post }) => ({
        url: `api/products/images/upload/`,
        method: "POST",
        body: post,
        invalidatesTags: ["products"],
      }),
    }),
    addProductReview: builder.mutation({
      query: ({ post, productId }) => ({
        url: `api/products/${productId}/review/add/`,
        method: "POST",
        body: post,
        invalidatesTags: [
          "products",
          "recommended-products",
          "products-by-category",
          "products_details",
        ],
      }),
    }),
    getRatings: builder.query({
      query: () => "api/products/ratings/",
    }),
    getProductsForAdmin: builder.query({
      query: () => "api/admin/products/",
      providesTags: ["admin_products"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useUploadImageMutation,
  useAddProductReviewMutation,
  useGetAllProductsQuery,
  useGetRecommendedProductsQuery,
  useGetRelatedProductsQuery,
  useGetRatingsQuery,
  useGetProductsDetailsQuery,
  useGetProductsByCategoryQuery,
  useGetAllCategoryQuery,
  useSearchAndFilterProductsQuery,

  useGetProductsForAdminQuery,
} = productApi;
