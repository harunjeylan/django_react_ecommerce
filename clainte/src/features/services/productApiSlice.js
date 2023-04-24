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
    "most-sealed-products",
    "top-rated-products",
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
    updateProduct: builder.mutation({
      query: ({ post, productId }) => ({
        url: `api/products/${productId}/edit/`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: [
        "products",
        "recommended-products",
        "products-by-category",
        "products_details",
        "brands",
        "admin_products",
        "products_data",
        "most-sealed-products",
        "top-rated-products",
      ],
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
    searchProducts: builder.query({
      query: ({ search }) => `api/products/search/?${search}`,
      providesTags: ["products-by-search"],
    }),
    getProductsDetails: builder.query({
      query: ({ productId }) => `api/products/${productId}/`,
      providesTags: ["products_details"],
    }),
    getProductsByCategory: builder.query({
      query: ({ category }) => `api/products/category/${category}/`,
      providesTags: ["products-by-category"],
    }),
    getRelatedProducts: builder.query({
      query: ({ productId }) => `api/products/${productId}/related/`,
      providesTags: ["products-by-category"],
    }),

    getMostSealedProducts: builder.query({
      query: ({ limit }) => {
        let queryKey = "";
        queryKey = limit ? queryKey + `limit=${limit}&` : queryKey;
        return `api/products/most-sealed/?${queryKey}`;
      },
      providesTags: ["most-sealed-products"],
    }),
    getTopRatedProducts: builder.query({
      query: ({ limit }) => {
        let queryKey = "";
        queryKey = limit ? queryKey + `limit=${limit}&` : queryKey;
        return `api/products/top-rated/?${queryKey}`;
      },
      providesTags: ["top-rated-products"],
    }),

    uploadImage: builder.mutation({
      query: ({ post }) => ({
        url: `api/products/images/upload/`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["products"],
    }),
    addProductReview: builder.mutation({
      query: ({ post, productId }) => ({
        url: `api/products/${productId}/review/add/`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: [
        "products",
        "recommended-products",
        "products-by-category",
        "products_details",
      ],
    }),
    getRatings: builder.query({
      query: () => "api/products/ratings/",
    }),
    getProductsForAdmin: builder.query({
      query: () => "api/admin/products/",
      providesTags: ["admin_products"],
    }),
    deleteProduct: builder.mutation({
      query: ({ post }) => ({
        url: `api/products/delete/`,
        method: "DELETE",
        body: post,
      }),
      invalidatesTags: [
        "products",
        "recommended-products",
        "products-by-category",
        "products_details",
        "brands",
        "admin_products",
        "products_data",
      ],
    }),
    removeThumbnail: builder.mutation({
      query: ({ post }) => ({
        url: `api/products/thumbnail/remove/`,
        method: "DELETE",
        body: post,
        invalidatesTags: ["products_data"],
      }),
    }),
    removeImage: builder.mutation({
      query: ({ post }) => ({
        url: `api/products/images/remove/`,
        method: "DELETE",
        body: post,
        invalidatesTags: ["products_data"],
      }),
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
  useUpdateProductMutation,
  useDeleteProductMutation,
  useRemoveImageMutation,
  useRemoveThumbnailMutation,
  useSearchProductsQuery,
  useGetProductsForAdminQuery,
  useGetTopRatedProductsQuery,
  useGetMostSealedProductsQuery,
} = productApi;
