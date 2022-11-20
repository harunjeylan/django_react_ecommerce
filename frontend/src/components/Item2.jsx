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
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { category, price, title, images } = item;
  return (
    <>
      <Box
        className={`
            absolute 
            xs:w-[100%] h-[100%]  md:w-[45%] md:h-[110%] 
            md:-top-[5%] md:right-[0] 
            xs:z-10 xs:hover:z-0
            cursor-pointer rounded-lg p-2
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
      </Box>
      <Box
        className={`
          absolute  md:ml-4 md:w-[45%] md:top-[2.5%] p-2
          w-[100%] h-[100%] max-h-[300px] md:h-[90%]
          xs:z-0 xs:hover:z-10 
          flex flex-col rounded-lg justify-between
          bg-opacity-[90%]  ease-in-out duration-300
          xs:backdrop-blur-sm xs:bg-blue-900/50 
          md:bg-white/5  md:backdrop-blur-0 
         `}
      >
        <Box
          onClick={() => navigate(`/item/${item.id}`)}
          className="p-4 duration-300"
        >
          <Typography gutterBottom variant="h5" component="div">
            {item.title}
          </Typography>
          <Typography gutterBottom variant="subtitle" component="div">
            {item.brand}
          </Typography>
          <Typography gutterBottom variant="subtitle2" component="div">
            {item.category}
          </Typography>
          <Rating name="read-only" value={item?.rating} readOnly />
        </Box>
        <Box className="p-4 duration-300">
          <Box className="flex items-center justify-between mb-2">
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
              sx={{
                backgroundColor: colors.primary[400],
                color: colors.grey[100],
              }}
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

            <Typography gutterBottom variant="h4" component="div">
              ${item?.price * count}
            </Typography>
          </Box>
          <Button
            className="w-full m-2"
            startIcon={<AddShoppingCartIcon />}
            variant="contained"
            onClick={() => {
              dispatch(addToCart({ item: { ...item, count } }));
            }}
            className={`w-full p-2 
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

export default Item;
