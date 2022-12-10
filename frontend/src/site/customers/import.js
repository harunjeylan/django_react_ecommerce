export { tokens, ColorModeContext } from "../../theme";

export { mockDataReviews } from "../../data/mockData";

export {
  useGetAllProductsQuery,
  useGetAllCategoryQuery,
  useGetProductsByCategoryQuery,
  useGetLimitAndSkipProductsQuery,
  useGetProductsDetailesQuery,
} from "../../lib/redux/services/products";

export {
  decreaseCount,
  setCount,
  addToCart,
  increaseCount,
  removeFromCart,
  toggleCart,
  setIsCartOpen,
} from "../../lib/redux/services/cartReducer";

export {
  toggleWishlist,
  removeFromWishlist,
} from "../../lib/redux/services/wishlistReducer";

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

const importAll = (r) =>
  r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item);
    return acc;
  }, {});

export const heroTexture = importAll(
  require.context("../../assets", false, /\.(png|jpe?g|svg)$/)
);
