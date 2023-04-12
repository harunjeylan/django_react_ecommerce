import { useState } from "react";
import {
  Avatar,
  Box,
  ButtonGroup,
  CardMedia,
  CircularProgress,
  Collapse,
  Divider,
  IconButton,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Accordion, Breadcrumbs, Button } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate, useParams } from "react-router-dom";
import { tokens } from "../../../../../theme";
import Header from "../../../../../components/Header";
import { useGetAdminBlogDetailsQuery } from "../../../../../features/services/blogApiSlice";
import Header2 from "../../../../../components/Header2";
import Comments from "../../../../../components/Comments";
import DeleteIcon from "@mui/icons-material/Delete";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
// import ReactHtmlParser, { attributesToProps } from "react-html-parser";
// const reactHtmlParserOptions = {
//   replace: (domNode) => {
//     if (domNode.attribs) {
//       const props = attributesToProps(domNode.attribs);
//       return <div {...props} />;
//     }
//   },
// };
const AdminBlogDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { blogSlug } = useParams();
  const isNoneMobile = useMediaQuery("(min-width:1024px)");
  const [openInfo, setOpenInfo] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [openRevision, setOpenRevision] = useState(false);

  const { data: blog, isFetching: isFetchingBlog } =
    useGetAdminBlogDetailsQuery({
      blogSlug,
    });
  return (
    <Box className={`flex flex-col gap-4 md:gap-8 md:mt-20 mb-10`}>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            onClick={() => navigate(`/`)}
            variant="text"
            color="secondary"
          >
            Admin Dashboard
          </Button>
          <Typography color="text.primary">Blog Details</Typography>
        </Breadcrumbs>
      </Box>
      <Box
        className={`md:container px-2 md:mx-auto md:px-auto flex justify-between items-center`}
      >
        <Header
          title={`Product details`}
          subtitle={`Product Slug : ${blogSlug}`}
        />
        <ButtonGroup>
          <Button
            onClick={() => navigate(`/admin/blogs/${blogSlug}/edit`)}
            color="secondary"
            variant="outlined"
            size="large"
          >
            Edit
          </Button>
          <Button
            onClick={() => navigate(`/admin/blogs/new`)}
            color="secondary"
            variant="outlined"
            size="large"
          >
            Add New
          </Button>
        </ButtonGroup>
      </Box>
      <Box
        className={`md:container px-2 md:mx-auto md:px-auto flex flex-col-reverse md:flex-row gap-4`}
      >
        <Box className={`w-full md:w-3/4 flex flex-col gap-4 md:gap-8`}>
          <Box className={`px-2  md:px-auto md:max-w-4xl`}>
            {!isFetchingBlog && blog && (
              <Header2 title={blog.title} subtitle={blog.headline} />
            )}
          </Box>
          <Box className={`w-full px-2 md:px-auto md:max-w-4xl`}>
            {!isFetchingBlog && blog && blog.thumbnail ? (
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
            className={`w-full px-2 md:px-auto md:max-w-4xl my-4 overflow-x-clip`}
          >
            {!isFetchingBlog ? (
              blog && (
                <div
                  className={`flex flex-col gap-4 w-full prose lg:prose-xl `}
                  dangerouslySetInnerHTML={{ __html: blog.body }}
                />
              )
            ) : (
              <Box className="w-full flex mt-[20%] justify-center h-full min-h-40">
                <CircularProgress color="secondary" />
              </Box>
            )}
            <Divider />
          </Box>
          {!isFetchingBlog && blog && (
            <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
              <Box className={`flex flex-col gap-4 w-full`}>
                {blog?.comments?.map((comment, index) => (
                  <Comments key={`comment-${index}`} comment={comment} />
                ))}
              </Box>
            </Box>
          )}
        </Box>
        <Box className="w-full md:w-1/4 flex flex-col gap-4">
          {!isNoneMobile && (
            <Box className="w-full flex gap-4">
              <Button
                variant="text"
                sx={{ color: colors.grey[100] }}
                endIcon={
                  openInfo ? (
                    <ExpandLess color={colors.grey[100]} />
                  ) : (
                    <ExpandMore color={colors.grey[100]} />
                  )
                }
                onClick={() => setOpenInfo(!openInfo)}
              >
                Post Info
              </Button>
              <Button
                variant="text"
                sx={{ color: colors.grey[100] }}
                endIcon={
                  openAction ? (
                    <ExpandLess color={colors.grey[100]} />
                  ) : (
                    <ExpandMore color={colors.grey[100]} />
                  )
                }
                onClick={() => setOpenAction(!openAction)}
              >
                Actions
              </Button>
              <Button
                variant="text"
                sx={{ color: colors.grey[100] }}
                endIcon={
                  openRevision ? (
                    <ExpandLess color={colors.grey[100]} />
                  ) : (
                    <ExpandMore color={colors.grey[100]} />
                  )
                }
                onClick={() => setOpenRevision(!openRevision)}
              >
                Revision History
              </Button>
            </Box>
          )}
          <Collapse
            in={isNoneMobile || openInfo}
            timeout="auto"
            unmountOnExit
            className="w-full rounded-md py-4 flex flex-col gap-4"
            sx={{
              backgroundColor: colors.primary[400],
            }}
          >
            <Box className="w-full flex-col">
              <Typography
                variant="h1"
                color={colors.grey[100]}
                fontWeight="bold"
                className={`text-xl md:text-2xl p-4 text-left`}
              >
                Post Info
              </Typography>
              <Divider />
            </Box>
            <Box className="w-full px-4 flex flex-col gap-2">
              <Typography
                fontWeight={"bold"}
                variant="h5"
                sx={{ color: colors.grey[200] }}
                className=""
              >
                Post ID
              </Typography>
              <Typography fontWeight={"bold"} variant="h5">
                8693637308
              </Typography>
            </Box>
            <Divider />
            <Box className="w-full px-4 flex flex-col gap-2">
              <Typography
                fontWeight={"bold"}
                variant="h5"
                sx={{ color: colors.grey[200] }}
                className=""
              >
                Status
              </Typography>
              <Typography fontWeight={"bold"} variant="h5">
                Published (unsaved changes)
              </Typography>
            </Box>
            <Divider />
            <Box className="w-full px-4 flex flex-col gap-2">
              <Typography
                fontWeight={"bold"}
                variant="h5"
                sx={{ color: colors.grey[200] }}
                className=""
              >
                Created by
              </Typography>
              <Box className="flex justify-start items-center gap-4">
                <Avatar>A</Avatar>

                <Typography fontWeight={"bold"} variant="h5">
                  Admin
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Box className="w-full px-4 flex flex-col gap-2">
              <Typography
                fontWeight={"bold"}
                variant="h5"
                sx={{ color: colors.grey[200] }}
                className=""
              >
                Created at
              </Typography>
              <Typography fontWeight={"bold"} variant="h5">
                Jul 30, 2:21 PM
              </Typography>
            </Box>
            <Divider />
            <Box className="w-full px-4 flex flex-col gap-2">
              <Typography
                fontWeight={"bold"}
                variant="h5"
                sx={{ color: colors.grey[200] }}
                className=""
              >
                First published at
              </Typography>
              <Typography fontWeight={"bold"} variant="h5">
                Jul 30, 2:21 PM
              </Typography>
            </Box>
            <Divider />

            <Box className="w-full px-4 flex flex-col gap-2">
              <Typography
                fontWeight={"bold"}
                variant="h5"
                sx={{ color: colors.grey[200] }}
                className=""
              >
                Last update
              </Typography>
              <Typography fontWeight={"bold"} variant="h5">
                Jul 30, 2:21 PM
              </Typography>
            </Box>
            <Divider />

            <Box className="w-full px-4 flex flex-col gap-2">
              <Typography
                fontWeight={"bold"}
                variant="h5"
                sx={{ color: colors.grey[200] }}
                className=""
              >
                Last Published
              </Typography>
              <Typography fontWeight={"bold"} variant="h5">
                Jul 30, 2:21 PM
              </Typography>
            </Box>
          </Collapse>

          <Collapse
            in={isNoneMobile || openAction}
            timeout="auto"
            unmountOnExit
            className="w-full rounded-md py-4 flex flex-col gap-4"
            sx={{
              backgroundColor: colors.primary[400],
            }}
          >
            <Box className="w-full flex-col">
              <Typography
                variant="h1"
                color={colors.grey[100]}
                fontWeight="bold"
                className={`text-xl md:text-2xl p-4 text-left`}
              >
                Actions
              </Typography>
              <Divider />
            </Box>
            <Box className="w-full px-4 flex justify-between items-center gap-2">
              {blog?.status === "published" ? (
                <>
                  <Typography
                    fontWeight={"bold"}
                    variant="h5"
                    sx={{ color: colors.grey[200] }}
                    className=""
                  >
                    Unpublished
                  </Typography>
                  <IconButton>
                    <UnpublishedIcon color="warning" />
                  </IconButton>
                </>
              ) : (
                <>
                  <Typography
                    fontWeight={"bold"}
                    variant="h5"
                    sx={{ color: colors.grey[200] }}
                    className=""
                  >
                    Published
                  </Typography>
                  <IconButton>
                    <PublishOutlinedIcon color="warning" />
                  </IconButton>
                </>
              )}
            </Box>
            <Divider />
            <Box className="w-full px-4 flex justify-between items-center gap-2">
              <Typography
                fontWeight={"bold"}
                variant="h5"
                sx={{ color: colors.grey[200] }}
                className=""
              >
                Delete
              </Typography>
              <IconButton>
                <DeleteIcon color="error" />
              </IconButton>
            </Box>
            <Divider />
          </Collapse>

          <Collapse
            in={isNoneMobile || openRevision}
            timeout="auto"
            unmountOnExit
            className="w-full rounded-md py-4 flex flex-col gap-4"
            sx={{
              backgroundColor: colors.primary[400],
            }}
          >
            <Box className="w-full flex-col">
              <Typography
                variant="h1"
                color={colors.grey[100]}
                fontWeight="bold"
                className={`text-xl md:text-2xl p-4 text-left`}
              >
                Revision History
              </Typography>
              <Divider />
            </Box>
            <Box className="w-full px-4 flex justify-between items-center gap-2">
              <Typography
                fontWeight={"bold"}
                variant="h5"
                sx={{ color: colors.grey[200] }}
                className=""
              >
                Aug 31, 12:21 PM
              </Typography>
              <Typography fontWeight={"bold"} variant="h5">
                Published
              </Typography>
            </Box>
            <Divider />
          </Collapse>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminBlogDetails;
