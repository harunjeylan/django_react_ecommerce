import { authApi } from "../../app/api/authApi";

export const productApi = authApi.injectEndpoints({
  tagTypes: [
    "products",
    "recommended-products",
    "categoreis",
    "products-by-category",
    "brands",
    "variants",
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
    getAllCategory: builder.query({
      query: () => `api/products/categories/`,
      providesTags: ["categoreis"],
    }),
    getProductsByCategory: builder.query({
      query: ({ category }) =>
        category === "all"
          ? "api/products/"
          : `api/products/category/${category}/`,
      providesTags: ["products-by-category"],
    }),
    addBrand: builder.mutation({
      query: ({ post }) => ({
        url: `api/products/brands/add/`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["brands"],
    }),
    getAllBrands: builder.query({
      query: () => `api/products/brands/`,
      providesTags: ["brands"],
    }),
    getAllVariants: builder.query({
      query: () => `api/products/variants/`,
      providesTags: ["variants"],
    }),
  }),
});

export const {
  useAddBrandMutation,
  useAddProductMutation,

  useGetAllVariantsQuery,

  useGetAllProductsQuery,
  useGetRecommendedProductsQuery,
  useGetProductsDetailesQuery,
  useGetProductsByCategoryQuery,
  useGetAllCategoryQuery,
  useSearchAndFilterProductsQuery,
  useGetAllBrandsQuery,
} = productApi;
