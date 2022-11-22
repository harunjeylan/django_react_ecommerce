import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  IconButton,
  CardActionArea,
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
  Button,
  ButtonGroup,
  useMediaQuery,
  Rating,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import { addToCart } from "../redux/services/cartReducer";
import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const ProductContent = ({
  product,
  showDescriptions = false,
  showAddToCartButton = true,
  sliceTitle = false,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const isNoneMobile = useMediaQuery("(min-width:768px)");

  return (
    <Box className={`flex flex-col justify-between h-[100%] w-[100%] m-0 p-0`}>
      <Box className="flex-col w-full p-2 space-y-[2px] duration-300">
        <Box className={``}>
          <Typography
            gutterBottom
            variant="h5"
            color={colors.greenAccent[400]}
            fontWeight="bold"
            className={`text-base md:text-lg `}
          >
            {sliceTitle
              ? isNoneMobile
                ? product?.title.slice(0, 25)
                : product?.title.slice(0, 15)
              : product?.title}
          </Typography>
        </Box>
        <Box className={`border-b`}>
          <Typography
            gutterBottom
            variant="subtitle2"
            fontWeight="bold"
            color={colors.grey[100]}
            fontWeight="bold"
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
        {showDescriptions && (
          <Box className={`border-b`}>
            <Typography variant="body2" color="text.secondary">
              {product?.description}
            </Typography>
          </Box>
        )}
        <Rating name="read-only" value={product?.rating} readOnly />
      </Box>
      {showAddToCartButton && (
        <Box className="flex-col w-full px-4  md:px-2 md:py-1 space-y-2">
          <Box className="flex justify-between items-center w-full">
            <ButtonGroup
              size="small"
              variant="contained"
              aria-label="outlined primary button group"
              sx={{
                backgroundColor: colors.primary[400],
                color: colors.grey[100],
              }}
              className="border-1"
            >
              <IconButton
                size="small"
                onClick={() => setCount(Math.max(count - 1, 1))}
              >
                <RemoveIcon />
              </IconButton>
              <IconButton size="small" disabled={true} className="px-auto">
                <Typography>{count}</Typography>
              </IconButton>
              <IconButton size="small" onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </ButtonGroup>
            <Box>
              <Typography gutterBottom variant="h4" component="div">
                ${product?.price * count}
              </Typography>
            </Box>
          </Box>
          <Box className="flex justify-between w-full">
            <Button
              startIcon={<AddShoppingCartIcon />}
              variant="contained"
              onClick={() => {
                dispatch(addToCart({ product: { ...product, count } }));
              }}
              className={`w-full
                text-[${colors.grey[100]}] 
                bg-[#3da58a] 
                hover:bg-[#2e7c67]`}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProductContent;
