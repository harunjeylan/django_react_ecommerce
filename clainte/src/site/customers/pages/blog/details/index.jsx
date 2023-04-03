import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  CardMedia,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetBlogDetailsQuery,
  useAddBlogCommentMutation,
} from "../../../../../features/services/blogApiSlice";
import { tokens } from "../../../../../theme";
import Header2 from "../../../../../components/Header2";
import RelatedBlogs from "./RelatedBlogs";
import CommentForm from "../../../../../components/CommentForm";
import Comments from "../../../../../components/Comments";

const BlogDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { blogSlug } = useParams();
  const { data: blog, isFetching: isFetchingBlog } = useGetBlogDetailsQuery({
    blogSlug,
  });
  const [addBlogComment] = useAddBlogCommentMutation();
  const handleCommentFormSubmit = (values, { resetForm }) => {
    addBlogComment({ post: values, blogSlug }).then(() => resetForm());
  };
  return (
    <Box className={`flex flex-col gap-4 md:gap-8 mt-20 md:mt-40`}>
      <Box className={`md:container px-2 md:mx-auto md:px-auto md:max-w-4xl`}>
        {!isFetchingBlog && (
          <Header2 title={blog.title} subtitle={blog.headline} />
        )}
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto md:max-w-4xl`}>
        {!isFetchingBlog && blog.thumbnail ? (
          <CardMedia
            sx={{ height: 360, width: "100%" }}
            title={"the-blog" + blog.thumbnail}
            image={blog.thumbnail}
          />
        ) : (
          <Box
            sx={{
              height: 360,
              width: "100%",
              backgroundColor: colors.grey[200],
            }}
            className="flex justify-center items-center"
          >
            No Image
          </Box>
        )}
      </Box>

      <Box
        className={`md:container px-2 md:mx-auto md:px-auto md:max-w-4xl my-4`}
      >
        {!isFetchingBlog ? (
          <Box className={`flex flex-col gap-4 w-full`}>
            <Typography
              variant="p"
              color={colors.grey[100]}
              className={` p-4 text-left`}
            >
              {blog.body}
            </Typography>
            <Divider />
          </Box>
        ) : (
          <Box className="w-full flex mt-[20%] justify-center h-full min-h-40">
            <CircularProgress color="secondary" />
          </Box>
        )}
      </Box>
      {!isFetchingBlog && (
        <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
          <Box className={`flex flex-col gap-4 w-full`}>
            {blog?.comments?.map((comment, index) => (
              <Comments key={`comment-${index}`} comment={comment} />
            ))}
            <CommentForm handleCommentFormSubmit={handleCommentFormSubmit} />
          </Box>
        </Box>
      )}

      <Box className={`md:container px-2 md:mx-auto md:px-auto my-16`}>
        <Header2
          title="Sign up for our Newsletter"
          subtitle="Join our newsletter and get resources, curated content, and design
            inspiration delivered straight to your inbox."
        />
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Box className="max-w-lg mx-auto flex justify-between items-center gap-4">
          <TextField
            fullWidth
            placeholder="Email Address"
            variant="outlined"
            size="medium"
            color="secondary"
          />
          <Button
            color="secondary"
            variant="outlined"
            size="large"
            className="py-3"
          >
            Submit
          </Button>
        </Box>
      </Box>

      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <RelatedBlogs blogSlug={blogSlug} />
      </Box>
    </Box>
  );
};

export default BlogDetails;
