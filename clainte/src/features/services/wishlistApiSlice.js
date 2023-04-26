import { authApi } from "../auth/authApi";

export const wishlistApi = authApi.injectEndpoints({
  tagTypes: ["wishlists"],
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => `service/wishlists/`,
      providesTags: ["wishlists"],
    }),

    toggleWishlist: builder.mutation({
      query: ({ post }) => ({
        url: `service/wishlists/toggle/`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["wishlists"],
    }),
  }),
});

export const { useGetWishlistQuery, useToggleWishlistMutation } = wishlistApi;
export const { endpoints, reducerPath, reducer, middleware } = wishlistApi;
