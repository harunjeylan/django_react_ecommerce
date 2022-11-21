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
  Rating,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import { addToCart } from "../redux/services/cartReducer";
import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const ProductContent = ({ product }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  return (
    <>
      <Box className="flex-col w-full px-4 py-2 md:px-2 md:py-1 space-y-2 duration-300">
        <Box className={``} onClick={() => navigate(`/product/${product?.id}`)}>
          <Typography
            gutterBottom
            variant="h3"
            color={colors.greenAccent[400]}
            fontWeight="bold"
            className={``}
          >
            {product?.title}
          </Typography>
        </Box>
        <Box
          className={`border-b`}
          onClick={() => navigate(`/product/${product?.id}`)}
        >
          <Typography
            gutterBottom
            variant="subtitle"
            fontWeight="bold"
            color={colors.grey[100]}
            fontWeight="bold"
            className={``}
          >
            {product?.brand}
          </Typography>
        </Box>
        <Box className={``} onClick={() => navigate(`/product/${product?.id}`)}>
          <Typography
            gutterBottom
            color={colors.greenAccent[400]}
            variant="subtitle"
            className={``}
          >
            {product?.category}
          </Typography>
        </Box>
        <Box
          className={`border-b`}
          onClick={() => navigate(`/product/${product?.id}`)}
        >
          <Typography variant="body2" color="text.secondary">
            {product?.description}
          </Typography>
        </Box>
      </Box>
      <Box className="flex-col w-full px-4 py-2 md:px-2 md:py-1 space-y-2">
        <Box className="flex justify-between w-full">
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
            sx={{
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
            }}
            className="border-1"
          >
            <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
              <RemoveIcon />
            </IconButton>
            <IconButton className="px-4">
              <Typography>{count}</Typography>
            </IconButton>
            <IconButton onClick={() => setCount(count + 1)}>
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
            className={`w-full py-4 m-0
                text-[${colors.grey[100]}] 
                bg-[#3da58a] 
                hover:bg-[#2e7c67]`}
          >
            Add to Cart
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ProductContent;
