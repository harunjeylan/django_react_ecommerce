import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "swiper/css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useGetLimitAndSkipProductsQuery } from "../../redux/services/products";
import Item2 from "../../components/Item2";
import CircularProgress from "@mui/material/CircularProgress";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Autoplay } from "swiper";

const ItemCarouse = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {
    data: items,
    isFetching,
    error,
  } = useGetLimitAndSkipProductsQuery({ limit: 10, skip: 10 });
  return (
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
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[EffectCoverflow, Autoplay]}

      //
    >
      {isFetching ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        items?.products.map((item, index) => (
          <SwiperSlide
            key={`carousel-${index}`}
            className={`relative xs:h-[260px] md:h-[300px] xs:w-[100%]  md:w-[640px] rounded-lg
               bg-opacity-[90%] backdrop-blur-sm bg-white/5  overflow-visible relative `}
          >
            <Item2 item={item} key={`${item?.title}-${item?.id}`} />
          </SwiperSlide>
        ))
      )}
    </Swiper>
  );
};

export default ItemCarouse;
