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
import ProductCard from "../../components/ProductCard";
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
import ProductContent2 from "./ProductContent2";
import {
  useGetProductsByCategoryQuery,
  useGetProductsDetailesQuery,
} from "../../redux/services/products";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";

import { EffectCards } from "swiper";
import { useDispatch } from "react-redux";
import { tokens } from "../../theme";
import damyProduct from "../home/damyData";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(productId);
  const {
    data: product,
    isFetching: productIsFetching,
    error: productError,
  } = useGetProductsDetailesQuery({ productId });
  const {
    data: productsData,
    isFetching: productsIsFetching,
    error: productsError,
  } = useGetProductsByCategoryQuery({
    category: product?.category,
  });

  return (
    <Container maxWidth="lg" className="mt-[60px]">
      <Box ClassName="bg-opacity-[90%] bg-white/5 md:p-[20]">
        {/* <Box
          className={`relative h-[260px] w-[80%] md:h-[360px] mx-auto px-[10%] rounded-lg mt-[160px]
               bg-opacity-[90%] bg-white/5  overflow-visible relative `}
        >
          <ProductContent2 product={product} />
        </Box> */}

        <Box
          className={`flex flex-col md:flex-row w-[100%] mt-[60px] mx-auto space-[40px]`}
        >
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className={`mySwiper w-[100%] my-4 md:mx-4 md:w-[50%]  h-[400px]  rounded-lg 
                ease-in-out duration-300 bg-opacity-[90%] bg-white/5 p-[40px]`}
          >
            <SwiperSlide>
              {" "}
              <img
                style={{}}
                src={product?.thumbnail}
                className={`h-[100%] max-w-[100%] inset-0 rounded-lg
                    ease-in-out duration-300`}
              />
            </SwiperSlide>
            {product?.images.map((image, index) => (
              <SwiperSlide key={index} className={`relative h-[90%] w-[90%]`}>
                <img
                  style={{}}
                  src={image}
                  className={`absolute  h-[100%] w-[100%] inset-0 rounded-lg
                    ease-in-out duration-300`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Box className="py-[2%] px-[5%] md:px-[10px] my-4 lg:mx-4 md:w-[50%] rounded-lg bg-opacity-[90%] bg-white/5">
            <Box
              className={`flex h-full flex-col md:flex-row justify-between `}
            >
              <Box
                className={`md:w-[50%] h-[100%] w-full flex flex-col justify-between my-2 md:mx-4 `}
              >
                <Box>
                  <Header title={product?.title} subtitle={product?.brand} />
                  <Typography
                    gutterBottom
                    color={colors.greenAccent[400]}
                    variant="subtitle2"
                    className={`text-sm md:text-base`}
                  >
                    {product?.category}
                  </Typography>
                  <Rating name="read-only" value={product?.rating} readOnly />
                </Box>

                <Box className="flex-col w-full  mx-0 my-2 md:px-2 md:py-1 space-y-2 mt-auto">
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
                      <IconButton
                        size="small"
                        disabled={true}
                        className="px-auto"
                      >
                        <Typography>{count}</Typography>
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => setCount(count + 1)}
                      >
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
              </Box>
              <Box className={`md:w-[50%]`}>
                <Tabs value={value} onChange={handleChange}>
                  <Tab label="DESCRIPTION" value="description" />
                  <Tab label="REVIEWS" value="reviews" />
                </Tabs>
                <Box display="flex" flexWrap="wrap" gap="15px">
                  {value === "description" && <div>{product?.description}</div>}
                  {value === "reviews" && <div>reviews</div>}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* RELATED ITEMS */}
      <Box m="20px 0">
        <Header title="Related Products" subtitle="Related Products" />
        <Grid container spacing={{ xs: 4, md: 4 }}>
          {productsIsFetching ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            productsData?.products.map((product) => (
              <Grid
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={`${product?.title}-${product?.id}`}
              >
                <ProductCard product={product} />
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductDetails;
