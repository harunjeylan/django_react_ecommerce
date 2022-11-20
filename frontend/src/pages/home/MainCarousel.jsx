import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay } from "swiper";
// imports all images from assets folder
const importAll = (r) =>
  r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item);
    return acc;
  }, {});

export const heroTextureImports = importAll(
  require.context("../../assets", false, /\.(png|jpe?g|svg)$/)
);

const MainCarousel = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      className="mySwiper h-[400px] md:h-[600px]"
    >
      {Object.values(heroTextureImports).map((texture, index) => (
        <SwiperSlide key={`carousel-image-${index}`}>
          <Box>
            <img
              src={texture}
              alt={`carousel-${index}`}
              className={`w-100 h-[100%]`}
            />
            <Box
              color="white"
              padding="20px"
              borderRadius="1px"
              textAlign="left"
              backgroundColor="rgb(0, 0, 0, 0.4)"
              position="absolute"
              top="46%"
              left={isNonMobile ? "10%" : "0"}
              right={isNonMobile ? undefined : "0"}
              margin={isNonMobile ? undefined : "0 auto"}
              maxWidth={isNonMobile ? undefined : "260px"}
              className="rounded-lg hover:skew-y-6 ease-in-out duration-300 "
            >
              <Typography color={colors.greenAccent[200]}>
                -- NEW ITEMS
              </Typography>
              <Typography variant="h1">Summer Sale</Typography>
              <Typography
                fontWeight="bold"
                color={colors.greenAccent[300]}
                sx={{ textDecoration: "underline" }}
              >
                Discover More
              </Typography>
            </Box>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainCarousel;
