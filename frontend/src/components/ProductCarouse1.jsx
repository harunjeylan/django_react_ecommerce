import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "swiper/css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import { useGetLimitAndSkipProductsQuery } from "../redux/services/products";
import ProductCard from "./ProductCard";
import CircularProgress from "@mui/material/CircularProgress";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Autoplay } from "swiper";
import Header from "./Header";
const ProductCarouse = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNoneMobile = useMediaQuery("(min-width:768px)");
  const { data: products, isFetching } = useGetLimitAndSkipProductsQuery({
    limit: 30,
    skip: 10,
  });
  return (
    <Swiper
      centeredSlides={false}
      grabCursor={true}
      spaceBetween={40}
      slidesPerView={"auto"}
      className="mySwiper h-auto w-[100%]"
      // effect={"coverflow"}
      autoplay={{
        delay: 5000,
        //   disableOnInteraction: false,
      }}
      //modules={[Autoplay]} //Autoplay
    >
      {isFetching ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        products?.products.map((product, index) => (
          <SwiperSlide key={`carousel-${index}`} className={`h-auto w-[260px]`}>
            <ProductCard
              product={product}
              key={`${product?.title}-${product?.id}`}
            />
          </SwiperSlide>
        ))
      )}
    </Swiper>
  );
};

export default ProductCarouse;
