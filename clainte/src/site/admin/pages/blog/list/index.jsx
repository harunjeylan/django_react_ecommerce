import { useState } from 'react'
import {
  Box,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from '@mui/material'
import { Breadcrumbs, Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Link, useNavigate } from 'react-router-dom'
import { tokens } from '../../../../../theme'
import Header from '../../../../../components/Header'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import {
  useChangeMultiBlogStatusMutation,
  useDeleteBlogMutation,
  useGetAllAdminBlogsQuery,
  useToggleBlogPinMutation,
} from '../../../../../features/services/blogApiSlice'
import dateFormatter from '../../../../../helpers/dateFormatter'
import { useSnackbar } from 'notistack'

const PinToTop = ({ row: { id, pin_to_top }, enqueueSnackbar }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [toggleBlogPin] = useToggleBlogPinMutation()
  const handleCheck = () => {
    toggleBlogPin({ post: { id } }).then((data) => {
      if (!data?.error?.data) {
        enqueueSnackbar(`Blog Pin is updated  successfully!`, {
          variant: 'success',
        })
      }
    })
  }
  return (
    <Box className="flex flex-col gap-1 items-center py-2 w-full h-full">
      <FormControlLabel
        control={
          <Checkbox
            color="secondary"
            onChange={handleCheck}
            checked={pin_to_top}
            name="fragileProduct"
          />
        }
        label="Pin To Top"
      />
    </Box>
  )
}
const AdminListBlog = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [rowSelectionModel, setRowSelectionModel] = useState([])
  const [selectedAction, setSelectedAction] = useState('')
  const { data: blogs, isFetching: isFetchingBlogData } =
    useGetAllAdminBlogsQuery()
  const [deleteBlog] = useDeleteBlogMutation()

  const [changeMultiBlogStatus] = useChangeMultiBlogStatusMutation()

  const handelDelete = (id) => {
    console.log(id)
    deleteBlog({ post: { id } }).then((data) => {
      if (!data?.error?.data) {
        enqueueSnackbar(`Blog is deleted  successfully!`, {
          variant: 'success',
        })
      }
    })
  }

  const handleAction = () => {
    console.log(selectedAction)
    if (rowSelectionModel.length) {
      if (selectedAction) {
        changeMultiBlogStatus({
          post: { blogIds: rowSelectionModel, status: selectedAction },
        }).then((data) => {
          if (!data?.error?.data) {
            enqueueSnackbar(`Blogs Status was updated  successfully!`, {
              variant: 'success',
            })
          }
        })
      }
    }
  }
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      renderCell: ({ row: { id, slug } }) => {
        return (
          <Link to={`/admin/blogs/${slug}`}>
            <Typography
              className="cursor-pointer"
              color={colors.greenAccent[500]}
            >
              # {id}
            </Typography>
          </Link>
        )
      },
    },
    {
      field: 'title',
      headerName: 'Blog',
      width: 300,
      renderCell: ({ row: { id, title, thumbnail, slug } }) => {
        return (
          <Box className="flex gap-4 items-center py-2 w-full h-full">
            <Link to={`/admin/blogs/${slug}`}>
              <img
                style={{ backgroundColor: colors.primary[400] }}
                className="h-[60px] w-[60px] pointer rounded-md border-[1px]"
                src={thumbnail}
                alt={`${title}`}
              />
            </Link>
            <Link to={`/admin/blogs/${slug}`}>
              <Typography color={colors.greenAccent[500]}>{title}</Typography>
              <Typography color={colors.greenAccent[500]}>{slug}</Typography>
            </Link>
          </Box>
        )
      },
    },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'headline', headerName: 'Headline', width: 150 },

    { field: 'status', headerName: 'Status', width: 150 },

    {
      field: 'pin_to_top',
      headerName: 'Pin To Top',
      width: 150,
      renderCell: (props) => (
        <PinToTop {...props} enqueueSnackbar={enqueueSnackbar} />
      ),
    },
    {
      field: 'published',
      headerName: 'Published',
      width: 150,
      renderCell: ({ row: { published } }) => {
        return (
          <Typography>
            {dateFormatter(new Date(published)) || 'not published'}
          </Typography>
        )
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 360,
      renderCell: ({ row: { slug } }) => {
        return (
          <Box className="flex gap-4 items-center py-2 w-full h-full">
            <Link to={`/admin/blogs/${slug}/edit`}>
              <Button color="secondary" variant="outlined">
                edit
              </Button>
            </Link>
            <Button
              onClick={() => handelDelete(slug)}
              color="error"
              variant="outlined"
            >
              Delete
            </Button>
          </Box>
        )
      },
    },
  ]
  return (
    <Box className={`flex flex-col gap-4 md:gap-8 md:mt-20 mb-10`}>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            onClick={() => navigate(`/admin`)}
            variant="text"
            color="secondary"
          >
            Admin Dashboard
          </Button>
          <Typography color="text.primary">New Blog</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header title="AdminFAQ" subtitle="Frequently Asked Questions Page" />
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Box
          backgroundColor={colors.primary[400]}
          className="h-[80vh] rounded-lg p-4"
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: 'none',
            },
            '& .MuiCheckbox-root': {
              color: `${colors.greenAccent[200]} !important`,
            },
            '& .MuiChackbox-root': {
              color: `${colors.greenAccent[200]} !important`,
            },
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: 'none',
            },
            '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          <Box className="flex gap-4 w-fit mb-4 items-center">
            <Typography>Action: </Typography>
            <FormControl size="small" className="w-60" fullWidth>
              <InputLabel id="demo-simple-select-label">option</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                color="secondary"
                variant="outlined"
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'published'}>{'Published'}</MenuItem>
                <MenuItem value={'scheduled'}>{'Scheduled'}</MenuItem>
                <MenuItem value={'draft'}>{'Draft'}</MenuItem>
                <MenuItem value={'delete'}>{'Delete'}</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              size="medium"
              color="secondary"
              onClick={handleAction}
            >
              Go
            </Button>
          </Box>
          {!isFetchingBlogData ? (
            blogs?.length ? (
              <DataGrid
                density="comfortable"
                rows={blogs}
                columns={columns}
                autoPageSize
                checkboxSelection
                onRowSelectionModelChange={(newRowSelectionModel) => {
                  setRowSelectionModel(newRowSelectionModel)
                }}
                rowSelectionModel={rowSelectionModel}
                components={{ Toolbar: GridToolbar }}
              />
            ) : (
              <Box className="w-full flex items-center justify-center h-full min-h-40">
                <Typography>No data</Typography>
              </Box>
            )
          ) : (
            <Box className="w-full flex items-center justify-center h-full min-h-40">
              <CircularProgress color="secondary" />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default AdminListBlog
