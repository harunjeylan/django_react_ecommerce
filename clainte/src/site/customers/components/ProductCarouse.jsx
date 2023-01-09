import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box } from "@mui/material";
import "swiper/css";

import { Autoplay } from "swiper";
const ProductCarouse = ({ products }) => {
  return (
    <Box sx={{ maxWidth: "calc(var(--vw, 1vw)*100 - 5px )" }}>
      <Swiper
        centeredSlides={true}
        grabCursor={true}
        spaceBetween={40}
        slidesPerView={"auto"}
        className="mySwiper h-auto w-[100%]"
        // effect={"coverflow"}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        modules={[Autoplay]} //Autoplay
      >
        {products?.products.map((product, index) => (
          <SwiperSlide key={`carousel-${index}`} className={`h-auto w-[240px]`}>
            <ProductCard
              product={product}
              key={`${product?.title}-${product?.id}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ProductCarouse;
