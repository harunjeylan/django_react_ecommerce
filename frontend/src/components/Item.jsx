import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  IconButton,
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
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, CardActions } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
const Item = ({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { category, price, title, images } = item;
  return (
    <CardActionArea
      className={`rounded-lg hover:scale-105 ease-in-out duration-300
        bg-opacity-80 backdrop-blur-sm  bg-white/5`}
    >
      <CardMedia
        onClick={() => navigate(`/item/${item.id}`)}
        component="img"
        image={item?.thumbnail}
        alt={`${title} image`}
        className="max-w-[80] rounded-t-lg max-h-52 h-52"
      />
      <CardContent className="w-auto">
        <Box
          borderColor={colors.grey[600]}
          className="flex justify-between border-b my-2"
        >
          <Box>
            <Typography
              variant="h5"
              color={colors.grey[100]}
              fontWeight="bold"
              sx={{ mb: "5px" }}
            >
              {item.title}
            </Typography>
            <Typography variant="h6" color={colors.greenAccent[400]}>
              {item.brand}
            </Typography>
          </Box>
          <Rating name="read-only" value={item?.rating} readOnly />
        </Box>
        <Box borderColor={colors.grey[600]} className="border-b my-1">
          <Typography
            gutterBottom
            color={colors.greenAccent[400]}
            variant="h5"
            component="div"
          >
            {item.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </Box>
        <Box className="flex-col">
          <Box className="flex justify-between w-full p-1">
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
                ${item?.price * count}
              </Typography>
            </Box>
          </Box>
          <Box className="w-full m-1">
            <Button
              startIcon={<AddShoppingCartIcon />}
              variant="contained"
              onClick={() => {
                dispatch(addToCart({ item: { ...item, count } }));
              }}
              className={`w-full p-4 
                text-[${colors.grey[100]}] 
                bg-[#3da58a] 
                hover:bg-[#2e7c67]`}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </CardContent>
    </CardActionArea>
  );
};

export default Item;
