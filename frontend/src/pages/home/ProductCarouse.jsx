import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "swiper/css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useGetLimitAndSkipProductsQuery } from "../../redux/services/products";
import ProductCard2 from "../../components/ProductCard2";
import CircularProgress from "@mui/material/CircularProgress";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Autoplay } from "swiper";
import Header from "../../components/Header";
const ProductCarouse = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {
    data: products,
    isFetching,
    error,
  } = useGetLimitAndSkipProductsQuery({ limit: 10, skip: 10 });
  return (
    <Box>
      <Header
        title="Now Product List"
        subtitle="welcome to you Shopping List"
      />
      <Swiper
        grabCursor={true}
        centeredSlides={true}
        spaceBetween={30}
        slidesPerView={"auto"}
        className="mySwiper py-[30px] md:py-[50px]"
        effect={"coverflow"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
          pauseOnMouseEnter: true,
        }}
        // autoplay={{
        //   delay: 5000,
        //   disableOnInteraction: false,
        // }}
        modules={[EffectCoverflow]} //Autoplay
      >
        {isFetching ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : (
          products?.products.map((product, index) => (
            <SwiperSlide
              key={`carousel-${index}`}
              className={`relative xs:h-[300px] md:h-[360px] xs:w-[100%]  md:w-[640px] rounded-lg
               bg-opacity-[90%] backdrop-blur-sm bg-white/5  overflow-visible relative `}
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
