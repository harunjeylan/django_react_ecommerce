import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      state.wishlist = action.payload.products;
    },
  },
});

export const { setWishlist } = wishlistSlice.actions;
export const selectWishlists = (state) => state.wishlist.wishlist;

export default wishlistSlice.reducer;
