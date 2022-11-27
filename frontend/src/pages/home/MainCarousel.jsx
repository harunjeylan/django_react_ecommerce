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
      spaceBetween={0}
      loop={true}
      autoplay={{
        delay: 6000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      modules={[Autoplay]}
      className="mySwiper h-[800px] mt-[60px]"
    >
      {Object.values(heroTextureImports).map((texture, index) => (
        <SwiperSlide key={`carousel-image-${index}`}>
          <Box className={`relative`}>
            <img
              src={texture}
              alt={`carousel-${index}`}
              className={`w-[100%] h-[800px]`}
              style={{
                objectFit: "cover",
                backgroundAttachment: "fixed",
              }}
            />
            <Box
              className={`absolute bottom-0 h-[90%] sm:h-[80%] md:h-[70%] lg:h-[60%] left-[5%]
              backdrop-blur-sm bg-black-900/50  text-white p-[20px] 
              rounded-b-lg `}
            >
              <Typography
                className={`hover:skew-x-6 sm:text-2xl md:text-4xl lg:text-6xl ease-in-out duration-300`}
                color={colors.greenAccent[200]}
                variant="h2"
              >
                -- NEW ITEMS
              </Typography>
              <Typography
                className={`hover:skew-x-6  sm:text-4xl md:text-6xl lg:text-9xl ease-in-out duration-300`}
                variant="h1"
              >
                Summer Sale
              </Typography>
              <Typography
                className={`hover:skew-x-6 sm:text-2xl md:text-4xl lg:text-6xl ease-in-out duration-300`}
                variant="h2"
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
