import React from 'react'
import {
  Box,
  ButtonGroup,
  CircularProgress,
  Divider,
  useTheme,
} from '@mui/material'
import { Breadcrumbs, Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useNavigate, useParams } from 'react-router-dom'
import { tokens } from '../../../../../theme'
import Header from '../../../../../components/Header'
import { useGetAdminBlogDetailsQuery } from '../../../../../features/services/blogApiSlice'
import Header2 from '../../../../../components/Header2'
import Comments from '../../../../../components/Comments'
import BlogInformation from '../components/BlogInformation'

const AdminBlogDetails = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  const { blogSlug } = useParams()
  const { data: blog, isFetching: isFetchingBlog } =
    useGetAdminBlogDetailsQuery({
      blogSlug,
    })
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
        <Box
          className={`w-full md:w-3/4 flex flex-col items-center gap-4 md:gap-8`}
        >
          <Box className={`px-2  md:px-auto md:max-w-4xl`}>
            {!isFetchingBlog && blog && (
              <Header2 title={blog.title} subtitle={blog.headline} />
            )}
          </Box>
          <Box
            className={`w-full flex justify-center items-center  px-2 md:mx-auto md:px-auto`}
          >
            {!isFetchingBlog && blog && blog.thumbnail ? (
              <img
                style={{
                  height: 360,
                  backgroundColor: colors.grey[200],
                }}
                alt={'the-blog' + blog.thumbnail}
                src={blog.thumbnail}
                className="w-fit"
              />
            ) : (
              <Box
                sx={{
                  height: 360,
                  width: 800,
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
                  style={{ color: colors.grey[100] }}
                  className={`w-full prose lg:prose-xl `}
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

        {!isFetchingBlog && blog && (
          <Box className="w-full md:w-1/4 flex flex-col gap-4">
            {' '}
            <BlogInformation blog={blog} />{' '}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default AdminBlogDetails
