import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartReducer";
import wishlistReducer from "./wishlistReducer";
import userReducer from "./users";

import { productApi } from "./products";
import { userApi } from "./users";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(userApi.middleware);
  },
});

export default store;
