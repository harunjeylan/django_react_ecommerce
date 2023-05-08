import { Box } from "@mui/material";
import "swiper/css";
import { useTheme } from "@emotion/react";
import { useGetLimitAndSkipProductsQuery } from "../redux/services/products";
import ProductCard2 from "./ProductCard2";
import CircularProgress from "@mui/material/CircularProgress";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Autoplay } from "swiper";

const ProductCarouse = () => {
  const theme = useTheme();
  const { data: products, isFetching } = useGetLimitAndSkipProductsQuery({
    limit: 10,
    skip: 10,
  });
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
        modules={[EffectCoverflow, Autoplay, Navigation]} //Autoplay
      >
        {isFetching ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : (
          products?.products.map((product, index) => (
            <SwiperSlide
              key={`carousel-${index}`}
              className={`relative rounded-lg
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
