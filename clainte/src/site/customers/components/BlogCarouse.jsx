import BlogCard from "./BlogCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box } from "@mui/material";
import "swiper/css";

import { Autoplay } from "swiper";
const BlogCarouse = ({ blogs }) => {
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
        {blogs?.map((blog, index) => (
          <SwiperSlide key={`carousel-${index}`} className={`h-auto w-[440px]`}>
            <BlogCard blog={blog} key={`${blog?.title}-${blog?.slug}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default BlogCarouse;
