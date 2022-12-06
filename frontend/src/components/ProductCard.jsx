import { useState, useEffect } from "react";
import { Box, Checkbox, IconButton, Rating, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import { addToCart } from "../redux/services/cartReducer";
import { toggleWishlist } from "../redux/services/wishlistReducer";
import { useSelector, useDispatch } from "react-redux";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LaunchIcon from "@mui/icons-material/Launch";
const ProductCard = ({ product }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const findInWishlist = (product) => {
    const itemsFoundedIndex = wishlist.find(
      (wishlistProduct) => wishlistProduct.id === product.id
    );
    return itemsFoundedIndex !== undefined;
  };
  const [isInWishlist, setIsInWishlist] = useState(findInWishlist(product));
  const changeWishlist = () => {
    dispatch(toggleWishlist({ product }));
  };
  useEffect(() => {
    setIsInWishlist(findInWishlist(product));
  }, [wishlist]);

  return (
    <Box
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      className={`rounded-md ease-in-out duration-300
        bg-opacity-80
        ${theme.palette.mode === "dark" ? "bg-white/5" : "bg-black/10"} `}
    >
      <Box
        className={`relative overflow-hidden rounded-t-md w-[100%] h-[300px]`}
      >
        <img
          style={{
            objectFit: "cover",
            backgroundAttachment: "fixed",
          }}
          alt={`${product?.title} image`}
          className={`absolute top-0 left-0 rounded-t-md w-[100%] h-[300px] hover:scale-105  ease-in-out duration-500 ${
            isHovered ? "opacity-0" : "opacity-100"
          } `}
          src={product?.thumbnail}
        />
        <img
          style={{
            objectFit: "cover",
            backgroundAttachment: "fixed",
          }}
          alt={`${product?.title} image`}
          className={`absolute  top-0 left-0  rounded-t-md w-[100%] h-[300px] hover:scale-105  ease-in-out duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          } `}
          src={product?.images[0]}
        />

        <Box
          className={` absolute bottom-0 flex justify-between w-full max-w-[100%] items-center ${
            isHovered ? "h-[60px] " : "lg:h-0 h-[60px]"
          } overflow-hidden ease-in-out duration-300 px-[4px] 
          ${
            theme.palette.mode === "dark" ? "bg-black/70" : "bg-white/70"
          } bg-opacity-90`}
        >
          <Box className="mx-auto">
            <IconButton
              onClick={() => {
                dispatch(addToCart({ product: { ...product, count: 1 } }));
              }}
              className={`w-full`}
            >
              <AddShoppingCartIcon />
            </IconButton>
          </Box>
          <Box className="mx-auto">
            <Checkbox
              color="secondary"
              inputProps={{ "aria-label": "Checkbox demo" }}
              icon={<FavoriteBorderOutlinedIcon color={colors.grey[100]} />}
              checkedIcon={<FavoriteIcon color={colors.grey[100]} />}
              checked={isInWishlist}
              onChange={changeWishlist}
            />
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
        <Box className="flex justify-between items-center">
          <Typography className="text-gray-600 text-sm">
            <s className="me-2 text-gray-500 mr-1">$40.00</s>
            <span>${product?.price}</span>
          </Typography>
          <Rating name="read-only" value={product?.rating} readOnly />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
