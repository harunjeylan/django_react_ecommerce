import { Box } from "@mui/material";

import { useGetLimitAndSkipProductsQuery } from "../redux/services/products";
import ProductCard from "./ProductCard";
import CircularProgress from "@mui/material/CircularProgress";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Autoplay } from "swiper";
const ProductCarouse = () => {
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
        disableOnInteraction: true,
      }}
      modules={[Autoplay]} //Autoplay
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
