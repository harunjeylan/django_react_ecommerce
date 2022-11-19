import {
  Box,
  Button,
  IconButton,
  useTheme,
  Typography,
  Container,
  ButtonGroup,
  Rating,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Item from "../../components/Item";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { addToCart } from "../../redux/services/cartReducer";
import Grid from "@mui/material/Unstable_Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Header from "../../components/Header";
import {
  useGetProductsByCategoryQuery,
  useGetProductsDetailesQuery,
} from "../../redux/services/products";

import { useDispatch } from "react-redux";
import { tokens } from "../../theme";
import damyProduct from "../home/damyData";
const ItemDetails = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(itemId);
  const {
    data: item,
    isFetching: itemIsFetching,
    error: itemError,
  } = useGetProductsDetailesQuery({ itemId });
  const {
    data: items,
    isFetching: itemsIsFetching,
    error: itemsError,
  } = useGetProductsByCategoryQuery({
    category: item?.category,
  });

  return (
    <Container maxWidth="xl" className="mt-20">
      <Header title={item?.title} subtitle={item?.category} />
      {itemIsFetching ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid xs={12} sm={12} md={6} lg={5}>
            <ImageList variant="masonry" cols={2} gap={8}>
              {item?.images.map((img, index) => (
                <ImageListItem key={index}>
                  <img
                    className="rounded-lg drop-shadow-lg hover:scale-95 ease-in-out duration-300"
                    src={`${img}?w=248&fit=crop&auto=format`}
                    srcSet={`${img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={`${item.title} image`}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={7}>
            <Box mb="40px">
              <Box display="flex" justifyContent="space-between">
                <Box>Home/Item</Box>
                <Box>Prev Next</Box>
              </Box>

              <Box m="65px 0 25px 0" className="border-b my-2">
                <Typography variant="h3">{item?.title}</Typography>
                <Rating name="read-only" value={item?.rating} readOnly />
              </Box>
              <Box className="border-b my-2">
                <Typography
                  color={colors.greenAccent[400]}
                  gutterBottom
                  variant="h4"
                  component="div"
                >
                  Category
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {item?.category}
                </Typography>
              </Box>
              <Box className="border-b my-2">
                <Typography
                  color={colors.greenAccent[400]}
                  gutterBottom
                  variant="h4"
                  component="div"
                >
                  Brand
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {item?.brand}
                </Typography>
              </Box>
              <Box className="border-b my-2">
                <Typography
                  color={colors.greenAccent[400]}
                  gutterBottom
                  variant="h4"
                  component="div"
                >
                  Description
                </Typography>
                <Typography sx={{ mt: "20px" }}>{item?.description}</Typography>
              </Box>

              <Box display="flex" alignItems="center" minHeight="50px">
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
                    <IconButton
                      onClick={() => setCount(Math.max(count - 1, 1))}
                    >
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
              </Box>
              <Box className="w-full mt-4">
                <Button
                  startIcon={<AddShoppingCartIcon />}
                  variant="contained"
                  onClick={() => {
                    dispatch(addToCart({ item: { ...item, count } }));
                  }}
                  className={`w-full p-4 t
                    ext-[${colors.grey[100]}] 
                    bg-[${colors.greenAccent[700]}] 
                    hover:bg-[${colors.greenAccent[500]}]`}
                >
                  Add to Cart
                </Button>
              </Box>

              <Box>
                <Box m="20px 0 5px 0" display="flex">
                  <FavoriteBorderOutlinedIcon />
                  <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
                </Box>
                <Typography>CATEGORIES: {item?.category}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}

      {/* INFORMATION */}
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="DESCRIPTION" value="description" />
          <Tab label="REVIEWS" value="reviews" />
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === "description" && <div>{item?.description}</div>}
        {value === "reviews" && <div>reviews</div>}
      </Box>

      {/* RELATED ITEMS */}
      <Box m="20px 0">
        <Typography variant="h3" fontWeight="bold">
          Related Products
        </Typography>

        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {itemsIsFetching ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            items.products.map((item) => (
              <Grid xs={12} sm={12} md={6} lg={4} xl={3} key={item.id}>
                <Item item={item} key={`${item.title}-${item.id}`} />
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default ItemDetails;
