import { useState } from "react";
import { Box, Tabs, Typography, Tab, CardActionArea } from "@mui/material";
import ProductContent from "../../components/ProductContent";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";

import { EffectCards } from "swiper";

const ProductContent2 = ({ product }) => {
  const [value, setValue] = useState("description");
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      className={`md:h-[360px] md:my-[40px] overflow-visible grid grid-cols-1 md:grid-cols-2 md:gap-[50px]
      bg-opacity-[90%] mx-4 pt-[40px] md:pt-0 bg-white/5 mb-[180px] md:mt-[100px] rounded-lg rounded-b-[50%] rounded-t-lg`}
    >
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className={`mySwiper w-[300px] md:-mt-[20px] h-[400px] mx-auto rounded-lg md:overflow-hidden md:overflow-visible
                hover:scale-[90%] ease-in-out duration-300 `}
      >
        <SwiperSlide>
          {" "}
          <img
            style={{}}
            src={product?.thumbnail}
            className={`h-[100%] max-w-[100%] inset-0 rounded-lg
                    ease-in-out duration-300`}
          />
        </SwiperSlide>
        {product?.images.map((image, index) => (
          <SwiperSlide key={index} className={`relative h-[90%] w-[90%]`}>
            <img
              style={{}}
              src={image}
              className={`absolute  h-[100%] w-[100%] inset-0 rounded-lg
                    ease-in-out duration-300`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Box
        className={`p-[12px] m-[12px] md:-mt-[20px] max-w-[300px] md:h-[400px] mx-auto  rounded-lg bg-opacity-[90%]  bg-white/5 
            hover:scale-105  ease-in-out duration-300 -mb-[40px] 
            rounded-[30px]`}
      >
        <ProductContent product={product} showDescriptions={true} />
      </Box>
    </Box>
  );
};
export default ProductContent2;
