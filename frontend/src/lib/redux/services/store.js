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

import { productApi } from "./products";
import { userAuth } from "./authReducer";

const cartConfig = { key: "cart", storage, version: 1 };
const wishlistsConfig = { key: "wishlists", storage, version: 1 };

const userConfig = { key: "user", storage, version: 1 };
const ProductConfig = { key: "products", storage, version: 1 };

const persistedCartReducer = persistReducer(cartConfig, cartReducer);
const persistedWishlistReducer = persistReducer(
  wishlistsConfig,
  wishlistReducer
);

const persistedUserAuthReducer = persistReducer(userConfig, userAuth.reducer);
const persistedProductsReducer = persistReducer(
  ProductConfig,
  productApi.reducer
);

const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    wishlist: persistedWishlistReducer,

    [userAuth.reducerPath]: persistedUserAuthReducer,
    [productApi.reducerPath]: persistedProductsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(userAuth.middleware)
      .concat(productApi.middleware);
  },
});

export default store;
