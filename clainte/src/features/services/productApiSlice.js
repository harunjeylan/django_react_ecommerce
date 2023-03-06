import { authApi } from "../../app/api/authApi";

export const productApi = authApi.injectEndpoints({
  tagTypes: [
    "products",
    "recommended-products",
    "products-by-category",
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
    }),
    getProductsByCategory: builder.query({
      query: ({ category }) =>
        category === "all"
          ? "api/products/"
          : `api/products/category/${category}/`,
      providesTags: ["products-by-category"],
    }),
  }),
});

export const {
  useAddProductMutation,

  useGetAllVariantsQuery,

  useGetAllProductsQuery,
  useGetRecommendedProductsQuery,
  useGetProductsDetailesQuery,
  useGetProductsByCategoryQuery,
  useGetAllCategoryQuery,
  useSearchAndFilterProductsQuery,
} = productApi;
