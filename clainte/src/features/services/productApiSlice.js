import { authApi } from "../auth/authApi";

export const productApi = authApi.injectEndpoints({
  tagTypes: [
    "products",
    "recommended-products",
    "products-by-category",
    "products_detaile",
    "brands",
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
    getProductsDetailes: builder.query({
      query: ({ productId }) => `api/products/${productId}/`,
      providesTags: ["products_detaile"],
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
        invalidatesTags: ["products_detaile"],
      }),
    }),
  }),
});

export const {
  useAddProductMutation,
  useUploadImageMutation,
  useAddProductReviewMutation,

  useGetAllVariantsQuery,

  useGetAllProductsQuery,
  useGetRecommendedProductsQuery,
  useGetRelatedProductsQuery,
  useGetProductsDetailesQuery,
  useGetProductsByCategoryQuery,
  useGetAllCategoryQuery,
  useSearchAndFilterProductsQuery,
} = productApi;
