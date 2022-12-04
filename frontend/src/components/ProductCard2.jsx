import useMediaQuery from "@mui/material/useMediaQuery";
import {
  CardMedia,
  CardActionArea,
  Box,
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

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LaunchIcon from "@mui/icons-material/Launch";

const ProductCard3 = ({ product, width }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const isNoneMobile = useMediaQuery("(min-width:768px)");
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const { category, price, title, images } = product;
  return (
    <>
      <CardActionArea
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        className={`
            absolute w-[60%] h-[110%] 
            -inset-y-[5%] right-[-20%] 
            cursor-mouse rounded-md p-0 m-0
            hover:scale-105  ease-in-out duration-300 
          `}
      >
        <img
          src={product?.thumbnail}
          alt={`${title} image`}
          className={`w-[100%] h-[100%] rounded-md `}
        />
        <Box
          className={` absolute bottom-0 flex flex-col justify-center gap-4 h-full items-center ${
            isHovered ? "w-[60px] " : "lg:w-0 w-[60px]"
          } overflow-hidden ease-in-out duration-300 py-2  rounded-l-md h-[100%] left-0
          ${
            theme.palette.mode === "dark" ? "bg-black/70" : "bg-white/70"
          } bg-opacity-90`}
        >
          <IconButton onClick={() => navigate(`/product/${product?.id}`)}>
            <LaunchIcon />
          </IconButton>
          <Checkbox
            color="secondary"
            inputProps={{ "aria-label": "Checkbox demo" }}
            icon={<FavoriteBorderOutlinedIcon color={colors.grey[100]} />}
            checkedIcon={<FavoriteIcon color={colors.grey[100]} />}
          />
          <IconButton
            onClick={() => {
              dispatch(addToCart({ product: { ...product, count: 1 } }));
            }}
          >
            <AddShoppingCartIcon />
          </IconButton>
        </Box>
      </CardActionArea>
      <Box>
        <CardActionArea
          onMouseOver={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
          className={`
          absolute  ml-4 w-[50%] inset-y-[5%] p-2
           h-[100%]  h-[90%] z-10
          flex flex-col rounded-md justify-between
          bg-opacity-[90%]  ease-in-out duration-300
          ${theme.palette.mode === "dark" ? "bg-white/5" : "bg-black/10"} 
         `}
        >
          <Box
            className={`flex flex-col justify-between h-[100%] w-[100%] m-0 p-0`}
          >
            <Box className="relative flex-col w-full p-2 space-y-[2px] duration-300">
              <Box className={``}>
                <Typography
                  gutterBottom
                  variant="h5"
                  color={colors.greenAccent[400]}
                  fontWeight="bold"
                  className={`text-base md:text-lg `}
                >
                  {isNoneMobile ? product?.title : product?.title.slice(0, 15)}
                </Typography>
              </Box>
              <Box className={`border-b`}>
                <Typography
                  gutterBottom
                  variant="subtitle2"
                  fontWeight="bold"
                  color={colors.grey[100]}
                  className={`text-sm md:text-base`}
                >
                  {product?.brand}
                </Typography>
              </Box>
              <Box className={``}>
                <Typography
                  gutterBottom
                  color={colors.greenAccent[400]}
                  variant="subtitle2"
                  className={`text-sm md:text-base`}
                >
                  {product?.category}
                </Typography>
              </Box>

              <Rating name="read-only" value={product?.rating} readOnly />
            </Box>
          </Box>
        </CardActionArea>
      </Box>
    </>
  );
};

export default ProductCard3;
