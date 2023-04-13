import { Box, Button, Typography } from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { useTheme } from "@emotion/react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay } from "swiper";
import { tokens } from "../../../../theme";
import Header2 from "../../../../components/Header2";

const MainCarousel = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay]}
        className="mySwiper h-[600px]"
      >
        {Object.values(heroTexture).map((texture, index) => (
          <SwiperSlide key={`carousel-image-${index}`}>
            <Box className={`relative`}>
              <img
                src={texture.default}
                alt={`carousel-${index}`}
                className={`w-full h-[600px]`}
                style={{
                  objectFit: "cover",
                  backgroundAttachment: "fixed",
                }}
              />

              <Box
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                text-white p-[20px] 
                rounded-b-lg `}
              >
                <Box className={`md:container px-2 md:mx-auto md:px-auto mt-8`}>
                  <Box
                    className={`flex flex-col gap-2 w-full justify-start items-center text-border drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]`}
                  >
                    <Typography
                      variant="h1"
                      color={colors.grey[100]}
                      fontWeight="bold"
                      className={`text-3xl md:text-5xl text-center `}
                    >
                      STEP INTO SUMMER
                    </Typography>
                    <Typography
                      color={colors.greenAccent[400]}
                      variant="h3"
                      className={`text-md md:text-lg text-center`}
                    >
                      A look at our freshest find
                    </Typography>
                    <Button
                      onClick={() => navigate(`/shopping`)}
                      variant="outlined"
                      color="secondary"
                      className={` px-[40px] py-4`}
                    >
                      Shop now
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
const importAll = (r) =>
  r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item);
    return acc;
  }, {});

//  const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url)
//    .href;
export const heroTexture = importAll(
  require.context("../../../../assets", false, /\.(png|jpe?g|svg)$/)
);
export default MainCarousel;
