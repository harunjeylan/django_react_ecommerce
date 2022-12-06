import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      state.wishlist = [...state.wishlist, action.payload.product];
    },

    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (product) => product.id !== action.payload.product.id
      );
    },
    toggleWishlist: (state, action) => {
      const item = state.wishlist.find((product) => {
        console.log(product.id);
        return product.id === action.payload.product.id;
      });

      if (item !== undefined) {
        state.wishlist = state.wishlist.filter(
          (product) => product.id !== action.payload.product.id
        );
      } else {
        state.wishlist = [...state.wishlist, action.payload.product];
      }
    },

  },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
