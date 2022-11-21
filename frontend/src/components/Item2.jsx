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
const Item = ({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { category, price, title, images } = item;
  return (
    <>
      <CardActionArea
        className={`
            absolute 
            xs:w-[100%] h-[100%]  md:w-[45%] md:h-[110%] 
            md:-inset-y-[5%] md:right-[0] 
            xs:z-10 xs:hover:z-0
            cursor-pointer rounded-lg p-2 m-0
            bg-opacity-[90%]  backdrop-blur-xs bg-white/5
            md:hover:scale-105  ease-in-out duration-300 
          `}
      >
        <img
          src={item?.thumbnail}
          alt={`${title} image`}
          onClick={() => navigate(`/item/${item.id}`)}
          className={`w-[100%] h-[100%] rounded-lg `}
        />
      </CardActionArea>
      <CardActionArea
        className={`
          absolute  md:ml-4 md:w-[45%] md:inset-y-[5%] p-2
          w-auto h-[100%]  md:h-[90%]
          xs:z-0 xs:hover:z-10 
          flex flex-col rounded-lg justify-between
          bg-opacity-[90%]  ease-in-out duration-300
          xs:backdrop-blur-sm xs:bg-blue-900/50 
          md:bg-white/5  md:backdrop-blur-0 
         `}
      >
        <Box
          onClick={() => navigate(`/item/${item.id}`)}
          className="flex-col w-full px-4 py-2 md:px-2 md:py-1 duration-300"
        >
          <Typography gutterBottom variant="h5" className={``}>
            {item.title}
          </Typography>
          <Typography gutterBottom variant="subtitle" className={``}>
            {item.brand}
          </Typography>
          <Typography gutterBottom variant="subtitle2" className={``}>
            {item.category}
          </Typography>
          <Rating name="read-only" value={item?.rating} readOnly />
          <Typography variant="body2" color="text.secondary" className={``}>
            {item.description}
          </Typography>
        </Box>
        <Box className="flex-col w-full px-4 py-2 md:px-2 md:py-1">
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
          <Box className="w-full w-full px-4 py-2 md:px-2 md:py-1">
            <Button
              startIcon={<AddShoppingCartIcon />}
              variant="contained"
              onClick={() => {
                dispatch(addToCart({ item: { ...item, count } }));
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
      </CardActionArea>
    </>
  );
};

export default Item;
