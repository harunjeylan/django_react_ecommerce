import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, IconButton, Typography } from "@mui/material";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../theme";
const ProductCarouse = ({ products, header, footer }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return products ? (
    <Box>
      {header}
      <Box
        sx={{
          maxWidth: "calc(var(--vw, 1vw)*100 - 5px )",
          "& .swiper-button-prev, & .swiper-button-next": {
            color: colors.greenAccent[400],
          },
        }}
        className="my-8"
      >
        <Swiper
          centeredSlides={true}
          grabCursor={true}
          spaceBetween={40}
          slidesPerView={"auto"}
          className="mySwiper h-auto w-[100%]"
          navigation
          pagination={{
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
          modules={[Autoplay, Pagination, Navigation]} //Autoplay
        >
          {products?.map((product, index) => (
            <SwiperSlide
              key={`carousel-${index}`}
              className={`h-auto w-[240px]`}
            >
              <ProductCard
                product={product}
                key={`${product?.title}-${product?.id}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      {footer}
    </Box>
  ) : (
    <Box className="w-full flex justify-center h-full">
      <Typography
        variant="h4"
        color={colors.grey[100]}
        fontWeight="bold"
        className={`text-lg md:text-xl px-4 text-left`}
      >
        No Product Found
      </Typography>
    </Box>
  );
};

export default ProductCarouse;
