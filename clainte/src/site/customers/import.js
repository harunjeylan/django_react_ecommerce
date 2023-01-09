export { tokens, ColorModeContext } from "../../theme";

export { mockDataReviews } from "../../data/mockData";

export {
  useGetAllProductsQuery,
  useGetAllCategoryQuery,
  useGetProductsByCategoryQuery,
  useGetLimitAndSkipProductsQuery,
  useGetProductsDetailesQuery,
} from "../../features/services/products";
export { useGetAllProductsQuery as useGetProductsQuery } from "../../features/services/productApiSlice";
export {
  useLoginMutation,
  useGetUseDataQuery,
  useUpdatePersonalInfoMutation,
} from "../../features/auth/authApiSlice";
export { authApi } from "../../app/api/authApi";
export {
  decreaseCount,
  setCount,
  addToCart,
  increaseCount,
  removeFromCart,
  toggleCart,
  setIsCartOpen,
} from "../../features/services/cartReducer";

export {
  toggleWishlist,
  removeFromWishlist,
} from "../../features/services/wishlistReducer";

export {
  selectCurrentToken,
  selectCurrentUser,
  setUserData,
  logOut,
} from "../../features/auth/authSlice";

export { UserLoginForm, UserRegisterForm } from "../../components/UserAuthForm";
export { default as Header } from "../../components/Header";
export { default as Header2 } from "../../components/Header2";
export { default as Header3 } from "../../components/Header3";
export { default as Reviews } from "../../components/Reviews";
export { default as ReviewForm } from "../../components/ReviewForm";
export { default as OrderSummery } from "../../components/OrderSummery";

export { default as manImage } from "../../data/images/man.webp";
export { default as childerenImage } from "../../data/images/childeren.webp";
export { default as womenImage } from "../../data/images/women.webp";
export { default as userImage } from "../../data/images/user.png";

export { default as logo } from "../../data/logo.png";

const importAll = (r) =>
  r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item);
    return acc;
  }, {});

export const heroTexture = importAll(
  require.context("../../assets", false, /\.(png|jpe?g|svg)$/)
);
