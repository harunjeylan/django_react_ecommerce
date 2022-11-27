import {
  CardContent,
  CardMedia,
  CardActionArea,
  Box,
  Button,
  Checkbox,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import { useState } from "react";
import { addToCart } from "../redux/services/cartReducer";
import { useDispatch } from "react-redux";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import ProductContent from "./ProductContent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LaunchIcon from "@mui/icons-material/Launch";
const ProductCard = ({ product, width }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const { category, price, title, images } = product;
  return (
    <Box
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      className="relative rounded-md ease-in-out duration-300
        bg-opacity-80   bg-white/5  "
    >
      <Box className={``}>
        <CardMedia
          component="img"
          alt={`${title} image`}
          className="rounded-t-lg ease-in-out duration-30  h-[380px] min-w-[100%] md:h-[300px]"
          image={isHovered ? product?.thumbnail : images[0]}
        />
      </Box>
      <Box
        className={` absolute bottom-[76px] flex justify-between w-full items-center ${
          isHovered ? "h-[60px] " : "lg:h-0 h-[60px]"
        } overflow-hidden ease-in-out duration-300 px-2 
        bg-black/70 bg-opacity-90`}
      >
        <Box className="my-2">
          <IconButton
            onClick={() => {
              dispatch(addToCart({ product: { ...product, count: 1 } }));
            }}
            className={`w-full`}
          >
            <AddShoppingCartIcon />
          </IconButton>
        </Box>
        <Box>
          <Checkbox
            color="secondary"
            inputProps={{ "aria-label": "Checkbox demo" }}
            icon={<FavoriteBorderOutlinedIcon color={colors.grey[100]} />}
            checkedIcon={<FavoriteIcon color={colors.grey[100]} />}
          />
          <IconButton onClick={() => navigate(`/product/${product.id}`)}>
            <LaunchIcon />
          </IconButton>
        </Box>
      </Box>
      <Box className="flex justify-between items-center h-[60px] m-4 p-2">
        <Box>
          <Typography className="text-base mb-1">
            <a className="text-dark" href="detail-1.html">
              Skull Tee
            </a>
          </Typography>
          <Typography className="text-gray-600 text-sm">
            <s className="me-2 text-gray-500">$40.00</s>
            <span>$20.00</span>
          </Typography>
        </Box>
        <Box className="">
          <Rating name="read-only" value={product?.rating} readOnly />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
