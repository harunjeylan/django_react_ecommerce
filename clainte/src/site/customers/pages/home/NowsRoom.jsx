import React from "react";
import { useGetPinToTopBlogsQuery } from "../../../../features/services/blogApiSlice";
import { Box, CircularProgress, Typography } from "@mui/material";
import BlogCard from "../../components/BlogCard";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../../theme";

const NowsRoom = ({ header, footer }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data: blogs = [], isFetching: isFetchingBlogs } =
    useGetPinToTopBlogsQuery();
  return (
    <Box className="w-full px-2">
      {!isFetchingBlogs ? (
        blogs.length ? (
          <Box>
            {header}
            <Box className="w-full flex flex-col md:flex-row my-8 gap-8">
              <Box className="w-full grid grid-cols-4 flex-col gap-8 ">
                {blogs.map((blog, index) => (
                  <BlogCard
                    key={`${blog.slug}-${index}`}
                    blog={blog}
                    imageHight={200}
                  />
                ))}
              </Box>
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
              No Blog Found
            </Typography>
          </Box>
        )
      ) : (
        <Box className="w-full flex justify-center h-full min-h-40">
          <CircularProgress color="secondary" />
        </Box>
      )}
    </Box>
  );
};

export default NowsRoom;
