import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "swiper/css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import { useGetLimitAndSkipProductsQuery } from "../redux/services/products";
import ProductCard2 from "./ProductCard2";
import CircularProgress from "@mui/material/CircularProgress";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Autoplay } from "swiper";
import Header from "./Header";
const ProductCarouse = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNoneMobile = useMediaQuery("(min-width:768px)");
  const {
    data: products,
    isFetching,
    error,
  } = useGetLimitAndSkipProductsQuery({ limit: 10, skip: 10 });
  return (
    <Box className="max-w-screen">
      <Swiper
        grabCursor={true}
        centeredSlides={true}
        spaceBetween={80}
        slidesPerView={"auto"}
        className="mySwiper h-[260px] py-[30px] md:h-[380px]  md:py-[50px] w-full"
        effect={"coverflow"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
          pauseOnMouseEnter: false,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Autoplay]} //Autoplay
      >
        {isFetching ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : (
          products?.products.map((product, index) => (
            <SwiperSlide
              key={`carousel-${index}`}
              className={`relative h-[200px] w-[300px] md:h-[300px] md:w-[400px] rounded-lg
               bg-opacity-[90%] 
               ${
                 theme.palette.mode === "dark" ? "bg-white/5" : "bg-black/10"
               }   
               overflow-visible relative `}
            >
              <ProductCard2
                product={product}
                key={`${product?.title}-${product?.id}`}
              />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </Box>
  );
};

export default ProductCarouse;
