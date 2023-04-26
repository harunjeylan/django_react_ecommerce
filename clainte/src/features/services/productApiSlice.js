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
        url: `product/add/`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["products", "recommended-products"],
    }),
    updateProduct: builder.mutation({
      query: ({ post, productId }) => ({
        url: `product/${productId}/edit/`,
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
      query: () => "product/",
      providesTags: ["products"],
    }),

    getRecommendedProducts: builder.query({
      query: () => "product/recommended/",
      providesTags: ["recommended-products"],
    }),
    searchAndFilterProducts: builder.query({
      query: ({ searchAndFilter }) =>
        `product/search-and-filter/${searchAndFilter}`,
      providesTags: ["products-by-searchAndFilter"],
    }),
    searchProducts: builder.query({
      query: ({ search }) => `product/search/?${search}`,
      providesTags: ["products-by-search"],
    }),
    getProductsDetails: builder.query({
      query: ({ productId }) => `product/${productId}/`,
      providesTags: ["products_details"],
    }),
    getProductsByCategory: builder.query({
      query: ({ category }) => `product/category/${category}/`,
      providesTags: ["products-by-category"],
    }),
    getRelatedProducts: builder.query({
      query: ({ productId }) => `product/${productId}/related/`,
      providesTags: ["products-by-category"],
    }),

    getMostSealedProducts: builder.query({
      query: ({ limit }) => {
        let queryKey = "";
        queryKey = limit ? queryKey + `limit=${limit}&` : queryKey;
        return `product/most-sealed/?${queryKey}`;
      },
      providesTags: ["most-sealed-products"],
    }),
    getTopRatedProducts: builder.query({
      query: ({ limit }) => {
        let queryKey = "";
        queryKey = limit ? queryKey + `limit=${limit}&` : queryKey;
        return `product/top-rated/?${queryKey}`;
      },
      providesTags: ["top-rated-products"],
    }),

    uploadImage: builder.mutation({
      query: ({ post }) => ({
        url: `product/images/upload/`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["products"],
    }),
    addProductReview: builder.mutation({
      query: ({ post, productId }) => ({
        url: `product/${productId}/review/add/`,
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
      query: () => "product/ratings/",
    }),
    getProductsForAdmin: builder.query({
      query: () => "product/admin/",
      providesTags: ["admin_products"],
    }),
    deleteProduct: builder.mutation({
      query: ({ post }) => ({
        url: `product/delete/`,
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
    deleteMultiProducts: builder.mutation({
      query: ({ post }) => ({
        url: `product/multi-delete/`,
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
    changeMultiProductsDiscount: builder.mutation({
      query: ({ post }) => ({
        url: `product/discount/multi-change/`,
        method: "POST",
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
        url: `product/thumbnail/remove/`,
        method: "DELETE",
        body: post,
        invalidatesTags: ["products_data"],
      }),
    }),
    removeImage: builder.mutation({
      query: ({ post }) => ({
        url: `service/images/remove/`,
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
  useDeleteMultiProductsMutation,
  useChangeMultiProductsDiscountMutation,

  useRemoveImageMutation,
  useRemoveThumbnailMutation,
  useSearchProductsQuery,
  useGetProductsForAdminQuery,
  useGetTopRatedProductsQuery,
  useGetMostSealedProductsQuery,
} = productApi;
