import { useState } from 'react'
import {
  Box,
  Divider,
  useTheme,
  Avatar,
  IconButton,
  Collapse,
  useMediaQuery,
} from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import { tokens } from '../../../../../theme'

import DeleteIcon from '@mui/icons-material/Delete'
import UnpublishedIcon from '@mui/icons-material/Unpublished'
// import PublishedIcon from '@mui/icons-material/Published'
import dateFormatter from '../../../../../helpers/dateFormatter'
import {
  useDeleteBlogMutation,
  useToggleBlogPublishMutation,
} from '../../../../../features/services/blogApiSlice'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'

const BlogInformation = ({ blog, isEditing }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  const isNoneMobile = useMediaQuery('(min-width:1024px)')
  const { enqueueSnackbar } = useSnackbar()
  const [openInfo, setOpenInfo] = useState(false)
  const [openAction, setOpenAction] = useState(false)
  const [openRevision, setOpenRevision] = useState(false)
  const [deleteBlog] = useDeleteBlogMutation()
  const [toggleBlogPublish] = useToggleBlogPublishMutation()
  const handlePublish = () => {
    toggleBlogPublish({ post: { id: blog?.id } }).then((data) => {
      if (!data?.error?.data) {
        enqueueSnackbar(`You ${blog.status} the blog successfully!`, {
          variant: 'success',
        })
      }
    })
  }

  const handelDelete = () => {
    deleteBlog({ post: { id: blog?.id } }).then((data) => {
      if (!data?.error?.data) {
        enqueueSnackbar(`Blog is deleted  successfully!`, {
          variant: 'success',
        })
        navigate('/admin/blogs')
      }
    })
  }
  return (
    <Box className="w-full">
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
        <Box className="w-full px-4 flex flex-col gap-2 py-2">
          <Typography
            fontWeight={'bold'}
            variant="h5"
            sx={{ color: colors.grey[200] }}
            className=""
          >
            Post ID
          </Typography>
          <Typography fontWeight={'bold'} variant="h5">
            {blog.id}
          </Typography>
        </Box>
        <Divider />
        <Box className="w-full px-4 flex flex-col gap-2 py-2">
          <Typography
            fontWeight={'bold'}
            variant="h5"
            sx={{ color: colors.grey[200] }}
            className=""
          >
            Status
          </Typography>
          <Typography fontWeight={'bold'} variant="h5">
            {blog.status}
          </Typography>
        </Box>
        <Divider />
        <Box className="w-full px-4 flex flex-col gap-2 py-2">
          <Typography
            fontWeight={'bold'}
            variant="h5"
            sx={{ color: colors.grey[200] }}
            className=""
          >
            Created by
          </Typography>
          <Box className="flex justify-start items-center gap-4">
            <Avatar>A</Avatar>

            <Typography fontWeight={'bold'} variant="h5">
              Admin
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box className="w-full px-4 flex flex-col gap-2 py-2">
          <Typography
            fontWeight={'bold'}
            variant="h5"
            sx={{ color: colors.grey[200] }}
            className=""
          >
            Created at
          </Typography>
          <Typography fontWeight={'bold'} variant="h5">
            {dateFormatter(new Date(blog.created))}
          </Typography>
        </Box>
        <Divider />
        <Divider />

        <Box className="w-full px-4 flex flex-col gap-2 py-2">
          <Typography
            fontWeight={'bold'}
            variant="h5"
            sx={{ color: colors.grey[200] }}
            className=""
          >
            Last update
          </Typography>
          <Typography fontWeight={'bold'} variant="h5">
            {dateFormatter(new Date(blog.updated))}
          </Typography>
        </Box>
        <Divider />

        <Box className="w-full px-4 flex flex-col gap-2 py-2">
          <Typography
            fontWeight={'bold'}
            variant="h5"
            sx={{ color: colors.grey[200] }}
            className=""
          >
            Last Published
          </Typography>
          <Typography fontWeight={'bold'} variant="h5">
            {dateFormatter(new Date(blog.published))}
          </Typography>
        </Box>
      </Collapse>
      {!isEditing && (
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
          <Box className="w-full px-4 flex justify-between items-center gap-2 py-2">
            <Typography
              fontWeight={'bold'}
              variant="h5"
              sx={{ color: colors.grey[200] }}
              className=""
            >
              {blog.status === 'published' ? 'Unpublished' : 'Published'}
            </Typography>
            <IconButton onClick={handlePublish}>
              <UnpublishedIcon
                color={blog.status === 'published' ? 'warning' : 'success'}
              />
            </IconButton>
          </Box>
          <Divider />
          <Box className="w-full px-4 flex justify-between items-center gap-2 py-2">
            <Typography
              fontWeight={'bold'}
              variant="h5"
              sx={{ color: colors.grey[200] }}
              className=""
            >
              Delete
            </Typography>
            <IconButton onClick={handelDelete}>
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
          <Divider />
        </Collapse>
      )}

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
        <Box className="w-full px-4 flex justify-between items-center gap-2 py-2">
          <Typography
            fontWeight={'bold'}
            variant="h5"
            sx={{ color: colors.grey[200] }}
            className=""
          >
            {dateFormatter(new Date(blog.published))}
          </Typography>
          <Typography fontWeight={'bold'} variant="h5">
            Published
          </Typography>
        </Box>
        <Divider />
      </Collapse>
    </Box>
  )
}

export default BlogInformation
