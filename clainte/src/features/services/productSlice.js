import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = [...state.products, action.payload.products];
    },
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;

export const selectProducts = (state) => state.product.products;
