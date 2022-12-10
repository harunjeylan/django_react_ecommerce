import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartReducer from "./cartReducer";
import wishlistReducer from "./wishlistReducer";
import userReducer from "./users";

import { productApi } from "./products";
import { userApi } from "./users";


const cartConfig = { key: "cart", storage, version: 1 };
const userConfig = { key: "user", storage, version: 1 };
const wishlistsConfig = { key: "wishlists", storage, version: 1 };
const ProductConfig = { key: "products", storage, version: 1 };

const persistedUserReducer = persistReducer(userConfig, userApi.reducer);
const persistedProductsReducer = persistReducer(userConfig, productApi.reducer);
const persistedCartReducer = persistReducer(cartConfig, cartReducer);
const persistedWishlistReducer = persistReducer(
  wishlistsConfig,
  wishlistReducer
);

const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    user: persistedUserReducer,
    wishlist: persistedWishlistReducer,
    [productApi.reducerPath]: persistedProductsReducer,
    [userApi.reducerPath]: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(productApi.middleware)
      .concat(userApi.middleware);
  },
});

export default store;
