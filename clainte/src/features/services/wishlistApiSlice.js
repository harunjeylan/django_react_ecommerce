import { authApi } from "../auth/authApi";

export const wishlistApi = authApi.injectEndpoints({
  tagTypes: ["wishlists"],
  endpoints: (builder) => ({
    setGetWishlist: builder.mutation({
      query: ({ post }) => ({
        url: `api/wishlists/set-get/`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["wishlists"],
      providesTags: ["wishlists"],
    }),

    toggleWishlist: builder.mutation({
      query: ({ post }) => ({
        url: `api/wishlists/toggle/`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["wishlists"],
    }),
  }),
});

export const { useSetGetWishlistMutation, useToggleWishlistMutation } =
  wishlistApi;
export const { endpoints, reducerPath, reducer, middleware } = wishlistApi;
