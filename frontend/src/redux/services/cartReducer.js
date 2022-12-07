import { createSlice } from "@reduxjs/toolkit";
const cartItems =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
const initialState = {
  isCartOpen: false,
  cart: cartItems,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.cart.find((product) => {
        console.log(product.id);
        return product.id === action.payload.product.id;
      });

      if (item === undefined) {
        state.cart = [...state.cart, action.payload.product];
      }
      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cart.map((item) => item))
      );
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload.id
      );
      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cart.map((item) => item))
      );
    },

    increaseCount: (state, action) => {
      state.cart = state.cart.map((product) => {
        if (product.id === action.payload.id) {
          product.count++;
        }
        return product;
      });
      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cart.map((item) => item))
      );
    },

    decreaseCount: (state, action) => {
      state.cart = state.cart.map((product) => {
        if (product.id === action.payload.id && product.count > 1) {
          product.count--;
        }
        return product;
      });
      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cart.map((item) => item))
      );
    },

    setCount: (state, action) => {
      state.cart = state.cart.map((product) => {
        if (product.id === action.payload.id) {
          product.count = action.payload.count;
          if (product.count < 1) product.count = 1;
        }
        return product;
      });
      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cart.map((item) => item))
      );
    },

    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const {
  addToCart,
  setCount,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;
