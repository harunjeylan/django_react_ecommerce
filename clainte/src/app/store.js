import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
// ===================================================================

import { authApi } from "../features/auth/authApi";

import authReducer from "../features/auth/authSlice";
// ===================================================================

import { productApi } from "../features/services/productApiSlice";
import { organizeApi } from "../features/services/organizeApiSlice";
import { variantApi } from "../features/services/variantApiSlice";
import { brandApi } from "../features/services/brandApiSlice";
import { orderApi } from "../features/services/orderApiSlice";
import { wishlistApi } from "../features/services/wishlistApiSlice";

import productReducer from "../features/services/productSlice";
import cartReducer from "../features/services/cartReducer";
import wishlistReducer from "../features/services/wishlistReducer";
// ===================================================================

import { dashboardApi } from "../features/main/dashboardApiSlice";
// ===================================================================

const cartConfig = { key: "cart", storage, version: 1 };
const wishlistsConfig = { key: "wishlists", storage, version: 1 };

const userConfig = { key: "auth", storage, version: 1 };
const ProductConfig = { key: "product", storage, version: 1 };
// ===================================================================

const persistedUserAuthReducer = persistReducer(userConfig, authReducer);
const persistedProductReducer = persistReducer(ProductConfig, productReducer);

const persistedCartReducer = persistReducer(cartConfig, cartReducer);
const persistedWishlistReducer = persistReducer(
  wishlistsConfig,
  wishlistReducer
);

const store = configureStore({
  reducer: {
    auth: persistedUserAuthReducer,

    cart: persistedCartReducer,
    wishlist: persistedWishlistReducer,
    product: persistedProductReducer,
    [productApi.reducerPath]: productApi.reducer,
    [organizeApi.reducerPath]: organizeApi.reducer,
    [variantApi.reducerPath]: variantApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,

    [wishlistApi.reducerPath]: wishlistApi.reducer,

    [dashboardApi.reducerPath]: dashboardApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(organizeApi.middleware)
      .concat(variantApi.middleware)
      .concat(productApi.middleware)
      .concat(brandApi.middleware)
      .concat(authApi.middleware)
      .concat(orderApi.middleware)
      .concat(dashboardApi.middleware)
      .concat(wishlistApi.middleware);
  },
  devTools: true,
});

export default store;
