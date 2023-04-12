import { useTheme } from "@emotion/react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  List,
  CardMedia,
  CircularProgress,
  Divider,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetBlogDetailsQuery,
  useAddBlogCommentMutation,
  useGetBlogCollectionsQuery,
} from "../../../../../features/services/blogApiSlice";
import { tokens } from "../../../../../theme";
import Header2 from "../../../../../components/Header2";
import RelatedBlogs from "./RelatedBlogs";
import CommentForm from "../../../../../components/CommentForm";
import Comments from "../../../../../components/Comments";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
const BlogDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNoneMobile = useMediaQuery("(min-width:1024px)");
  const navigate = useNavigate();
  const { blogSlug } = useParams();
  const { data: blog, isFetching: isFetchingBlog } = useGetBlogDetailsQuery({
    blogSlug,
  });
  const { data: collection, isFetching: isFetchingCollection } =
    useGetBlogCollectionsQuery();
  const [addBlogComment] = useAddBlogCommentMutation();
  const handleCommentFormSubmit = (values, { resetForm }) => {
    addBlogComment({ post: values, blogSlug }).then(() => resetForm());
  };
  return (
    <Box className={`flex flex-col gap-4 md:gap-8 mt-20 md:mt-40`}>
      <Box
        className={`md:container w-full px-2 md:mx-auto md:px-auto my-4 flex flex-col md:flex-row`}
      >
        <Box className="w-full px-2 md:mx-auto md:px-auto flex flex-col gap-4">
          <Box className={`w-full px-2 md:mx-auto md:px-auto`}>
            {!isFetchingBlog && (
              <Header2 title={blog.title} subtitle={blog.headline} />
            )}
          </Box>
          <Box className={`w-full px-2 md:mx-auto md:px-auto`}>
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

          {!isFetchingBlog ? (
            <div
              className={`flex flex-col gap-4 w-full prose lg:prose-xl`}
              dangerouslySetInnerHTML={{ __html: blog.body }}
            />
          ) : (
            <Box className="w-full flex mt-[20%] justify-center h-full min-h-40">
              <CircularProgress color="secondary" />
            </Box>
          )}
          <Divider />
          {!isFetchingBlog && (
            <Box className={`w-full md:px-auto`}>
              <Box className={`flex flex-col gap-4 w-full`}>
                {blog?.comments?.map((comment, index) => (
                  <Comments key={`comment-${index}`} comment={comment} />
                ))}
                <CommentForm
                  handleCommentFormSubmit={handleCommentFormSubmit}
                />
              </Box>
            </Box>
          )}
        </Box>
        <Box className="w-full md:w-1/4 flex flex-col gap-4">
          <Accordion
            sx={{ backgroundColor: colors.primary[400] }}
            className="w-full"
            defaultExpanded={isNoneMobile}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                variant="h4"
                color={colors.grey[100]}
                fontWeight="bold"
                className={`text-lg md:text-xl px-4 text-left`}
              >
                Pin
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List className={`flex flex-col gap-2`}>
                {!isFetchingCollection &&
                  collection?.pin_blogs.map((blog) => (
                    <Link key={`blogs-${blog.slug}`} to={`/blogs/${blog.slug}`}>
                      <Typography
                        variant="p"
                        fontWeight="bold"
                        className={`hover:text-green-400 flex justify-between items-center`}
                      >
                        {blog.title}
                        <ArrowRightAltIcon fontSize="large" />
                      </Typography>
                    </Link>
                  ))}
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{ backgroundColor: colors.primary[400] }}
            className="w-full"
            defaultExpanded={isNoneMobile}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                variant="h4"
                color={colors.grey[100]}
                fontWeight="bold"
                className={`text-lg md:text-xl px-4 text-left`}
              >
                Recent Posts
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List className={`flex flex-col gap-2`}>
                {!isFetchingCollection &&
                  collection?.recent_blogs.map((blog) => (
                    <Link key={`blogs-${blog.slug}`} to={`/blogs/${blog.slug}`}>
                      <Typography
                        variant="p"
                        fontWeight="bold"
                        className={`hover:text-green-400 flex justify-between items-center`}
                      >
                        {blog.title}
                        <ArrowRightAltIcon fontSize="large" />
                      </Typography>
                    </Link>
                  ))}
              </List>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>

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
