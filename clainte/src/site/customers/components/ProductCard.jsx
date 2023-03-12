import { useState, useEffect, useMemo } from "react";

import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { useSelector, useDispatch } from "react-redux";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LaunchIcon from "@mui/icons-material/Launch";
import { useToggleWishlistMutation } from "../../../features/services/wishlistApiSlice";
import {
  selectWishlists,
  setWishlist,
} from "../../../features/services/wishlistReducer";
import { toggleCart, selectCart } from "../../../features/services/cartReducer";
import {
  Box,
  Checkbox,
  IconButton,
  Rating,
  Typography,
  CardActionArea,
} from "@mui/material";

import { tokens, selectCurrentUser } from "../import";

const ProductCard = ({ product }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [toggleWishlist] = useToggleWishlistMutation();
  const user = useSelector(selectCurrentUser);
  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const carts = useSelector(selectCart);
  const wishlist = useSelector(selectWishlists);
  const findInCart = useMemo(() => {
    return (product) => {
      const itemsFounded = carts?.find(
        (cartProduct) => cartProduct?.id === product?.id
      );
      return !(itemsFounded === undefined);
    };
  }, [carts]);
  const findInWishlist = useMemo(() => {
    return (product) => {
      if (user) {
        const itemsFounded = wishlist?.find(
          (wishlistProduct) => wishlistProduct.id === product.id
        );
        return !(itemsFounded === undefined);
      }
    };
  }, [user, wishlist]);

  const changeCart = () => {
    dispatch(
      toggleCart({ product: { ...product, count: 1, selectedVariants: [] } })
    );
    setIsInCart(findInCart(product));
  };

  useEffect(() => {
    setIsInCart(findInCart(product));
  }, [carts, findInCart, product]);

  const changeWishlist = () => {
    if (user) {
      toggleWishlist({ post: { productId: product.id } })
        .unwrap()
        .then((wishlistProducts) => {
          console.log(wishlistProducts);
          dispatch(setWishlist({ products: wishlistProducts }));
          setIsInWishlist(findInWishlist(product));
        });
    }
  };

  useEffect(() => {
    setIsInWishlist(findInWishlist(product));
  }, [wishlist, product, findInWishlist]);

  return (
    <Box
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      className={`rounded-md ease-in-out duration-300
        bg-opacity-80 w-full
        ${theme.palette.mode === "dark" ? "bg-white/5" : "bg-black/10"} `}
    >
      <Box className={`relative overflow-hidden rounded-t-md w-full h-[280px]`}>
        <CardActionArea onClick={() => navigate(`/product/${product?.id}`)}>
          <img
            style={{
              objectFit: "cover",
              backgroundAttachment: "fixed",
            }}
            alt={`${product?.title} `}
            className={`absolute top-0 left-0 rounded-t-md w-full h-[280px] hover:scale-105  ease-in-out duration-500 ${
              isHovered ? "opacity-0" : "opacity-100"
            } `}
            src={product?.thumbnail}
          />
          <img
            style={{
              objectFit: "cover",
              backgroundAttachment: "fixed",
            }}
            alt={`${product?.title} `}
            className={`absolute  top-0 left-0  rounded-t-md w-full h-[280px] hover:scale-105  ease-in-out duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            } `}
            src={product?.images[0]?.image}
          />
        </CardActionArea>
        <Box
          className={` absolute bottom-0 flex justify-between w-full max-w-full items-center ${
            isHovered ? "h-[60px] " : "lg:h-0 h-[60px]"
          } overflow-hidden ease-in-out duration-300 px-[4px] 
          ${
            theme.palette.mode === "dark" ? "bg-black/70" : "bg-white/70"
          } bg-opacity-90`}
        >
          <Box className="mx-auto">
            <Checkbox
              color="secondary"
              inputProps={{ "aria-label": "Checkbox demo" }}
              icon={<AddShoppingCartIcon color={colors.grey[100]} />}
              checkedIcon={<RemoveShoppingCartIcon color={colors.grey[100]} />}
              checked={isInCart}
              onChange={changeCart}
            />
          </Box>
          <Box className="mx-auto">
            {user && (
              <Checkbox
                color="secondary"
                inputProps={{ "aria-label": "Checkbox demo" }}
                icon={<FavoriteBorderOutlinedIcon color={colors.grey[100]} />}
                checkedIcon={<FavoriteIcon color={colors.grey[100]} />}
                checked={isInWishlist}
                onChange={changeWishlist}
              />
            )}
            <IconButton onClick={() => navigate(`/product/${product?.id}`)}>
              <LaunchIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box className={`m-4 p-2`}>
        <Box className="h-auto">
          <Typography
            gutterBottom
            variant="h5"
            color={colors.greenAccent[400]}
            fontWeight="bold"
            className={`text-base md:text-lg `}
          >
            {product?.title}
          </Typography>
        </Box>
        <Box className="flex justify-between items-center mb-2">
          <Typography className="text-gray-200 text-sm">
            <s className="me-2 text-gray-100 mr-1">
              ${product?.regular_pricing}
            </s>
            <strong>${product?.sale_pricing}</strong>
          </Typography>
          <Rating name="read-only" defaultValue={product?.rating} readOnly />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
