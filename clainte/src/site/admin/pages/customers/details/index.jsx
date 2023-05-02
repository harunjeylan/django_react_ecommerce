import React from 'react'

import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import * as yup from 'yup'
import { Formik } from 'formik'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import {
  Box,
  Button,
  Typography,
  Breadcrumbs,
  useTheme,
  TextField,
  FormControl,
  FormLabel,
  FormGroup,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
} from '@mui/material'

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'

import {
  useAddCustomerNoteMutation,
  useGetCustomerDetailsQuery,
} from '../../../../../features/services/customerApiSlice'
import { tokens } from '../../../../../theme'
import Header from '../../../../../components/Header'
import useAlert from '../../../../../components/ui/useAlert'
import { useSnackbar } from 'notistack'
import dateFormatter from '../../../../../helpers/dateFormatter'
import userAvatar from '../../../../../assets/user-avatar.png'
const CustomerDetails = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  const { customerId } = useParams()
  const [CustomAlert, setMessages] = useAlert()
  const { enqueueSnackbar } = useSnackbar()
  const [addCustomerNote] = useAddCustomerNoteMutation()
  const { data: customerData, isFetching: isFetchingCustomerData } =
    useGetCustomerDetailsQuery({
      customerId,
    })
  const notesOnCustomerInitialValues = {
    description: '',
  }
  const notesOnCustomerSchema = yup.object().shape({
    description: yup.string().required('Required'),
  })
  const handleFormSubmit = (values, { resetForm }) => {
    addCustomerNote({ post: { ...values, customer: customerId } }).then(
      (data) => {
        if (data?.error?.data) {
          Object.keys(data.error.data).forEach((key) => {
            setMessages((prev) => [
              ...prev,
              {
                id: key,
                title: key,
                variant: 'error',
                description: data.error.data[key],
              },
            ])
          })
        } else {
          resetForm()
          enqueueSnackbar(`Note is added successfully!`, {
            variant: 'success',
          })
        }
      }
    )
  }
  const productColumns = [
    {
      field: 'title',
      headerName: 'Product Name',
      width: 200,
      height: 200,
      renderCell: ({ row: { id, title, thumbnail } }) => {
        return (
          <Box className="flex gap-4 items-center py-2 w-full h-full">
            <Link to={`/admin/products/${id}`}>
              <img
                style={{ backgroundColor: colors.primary[400] }}
                className="h-[60px] w-[60px] pointer rounded-md border-[1px]"
                src={thumbnail}
                alt={`${title}`}
              />
            </Link>
            <Link to={`/admin/products/${id}`}>
              <Typography color={colors.greenAccent[500]}>{title}</Typography>
            </Link>
          </Box>
        )
      },
    },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'collection', headerName: 'Collection', width: 150 },
    { field: 'date', headerName: 'Date', width: 200 },
    {
      field: 'sale_pricing',
      headerName: 'sale_pricing',
      renderCell: ({ row: { sale_pricing } }) => {
        return <Typography>{sale_pricing}</Typography>
      },
    },
    {
      field: 'discount',
      headerName: 'Discount',
      width: 200,
      renderCell: ({ row: { discount } }) => {
        return discount ? (
          <Box className="flex flex-col">
            <Typography variant="p">
              <strong>Name: {discount?.name}</strong>
            </Typography>
            <Typography variant="p">
              <strong>Discount: </strong>
              {discount?.amount}%
            </Typography>
            <Typography variant="p">
              <strong>Date: from </strong>
              {discount?.start_date}
              <strong> to </strong>
              {discount?.end_date}
            </Typography>
          </Box>
        ) : (
          <Typography variant="p">
            <strong>No Discount</strong>
          </Typography>
        )
      },
    },
    { field: 'brand', headerName: 'Brand', width: 100 },
  ]
  const orderColumns = [
    {
      field: 'id',
      headerName: 'ORDER',
      width: 100,
      renderCell: ({ row: { id } }) => {
        return (
          <Link to={`/admin/orders/${id}`}>
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
      field: 'total_price',
      headerName: 'Total',
      width: 100,
      renderCell: ({ row: { total_price } }) => {
        return <Typography>${total_price}</Typography>
      },
    },

    {
      field: 'fulfillment_status',
      headerName: 'Fulfillment status',
      width: 200,
    },
    { field: 'delivery_method', headerName: 'Delivery Method', width: 200 },
    {
      field: 'date',
      headerName: 'Date',
      width: 200,
      renderCell: ({ row: { date } }) => {
        return <Typography>{dateFormatter(new Date(date))}</Typography>
      },
    },
  ]

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
          <Typography color="text.primary">Customer details</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header
          title={`Customer details`}
          subtitle={`Customer ID : ${customerId}`}
        />
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Box className="flex flex-col xl:flex-row gap-4">
          <Box className="w-full xl:w-[40%]">
            <Box className="flex flex-col gap-4">
              <Box className="flex flex-col md:flex-row xl:flex-col gap-4">
                <Box className="w-full  md:w-[70%] xl:w-full">
                  <Box
                    backgroundColor={colors.primary[400]}
                    className="w-full flex flex-col gap-2 drop-shadow-lg  rounded-lg p-4"
                  >
                    <Box className="w-full flex items-center gap-4">
                      <Box
                        backgroundColor={colors.primary[500]}
                        className="rounded-full h-[200px] w-[200px]"
                      >
                        <img
                          className="rounded-full h-[200px] w-[200px] border bg-slate-300 "
                          alt="customer avatar"
                          src={customerData?.customer?.image || userAvatar}
                        />
                      </Box>
                      <Box>
                        <Typography
                          variant="h1"
                          color={colors.grey[100]}
                          fontWeight="bold"
                          className={`text-xl md:text-2xl  text-left my-1`}
                        >
                          {customerData?.customer?.first_name}{' '}
                          {customerData?.customer?.last_name}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color={colors.grey[200]}
                          className={`text-left my-1`}
                        >
                          {customerData?.customer?.date_joined}
                        </Typography>
                      </Box>
                    </Box>
                    <Divider />
                    <Box className="w-full flex justify-between items-center py-4 px-8">
                      <Box>
                        <Typography
                          variant="h1"
                          color={colors.grey[100]}
                          fontWeight="bold"
                          className={`text-xl md:text-2xl  text-left my-1`}
                        >
                          Orders
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color={colors.grey[200]}
                          className={`text-left my-1`}
                        >
                          {customerData?.orders?.length}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="h1"
                          color={colors.grey[100]}
                          fontWeight="bold"
                          className={`text-xl md:text-2xl  text-left my-1`}
                        >
                          Wishlist
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color={colors.grey[200]}
                          className={`text-left my-1`}
                        >
                          {customerData?.wishlists?.length}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="h1"
                          color={colors.grey[100]}
                          fontWeight="bold"
                          className={`text-xl md:text-2xl  text-left my-1`}
                        >
                          Ratings & reviews
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color={colors.grey[200]}
                          className={`text-left my-1`}
                        >
                          {customerData?.reviews?.length}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box className="w-full  md:w-[30%] xl:w-full">
                  <Box
                    className="w-full flex flex-col gap-2 drop-shadow-lg rounded-lg p-4 "
                    backgroundColor={colors.primary[400]}
                  >
                    <Typography
                      variant="h1"
                      color={colors.grey[100]}
                      fontWeight="bold"
                      className={`text-xl md:text-2xl  text-left my-4`}
                    >
                      Customer details
                    </Typography>
                    <List className="w-full">
                      <ListItem>
                        <ListItemIcon>
                          <PersonOutlineOutlinedIcon size="large" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Customer"
                          secondary={
                            <Typography sx={{ color: colors.greenAccent[500] }}>
                              {customerData?.customer?.first_name}{' '}
                              {customerData?.customer?.last_name}
                            </Typography>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <EmailOutlinedIcon size="large" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Email"
                          secondary={
                            <Typography sx={{ color: colors.greenAccent[500] }}>
                              {customerData?.customer?.email}
                            </Typography>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <LocalPhoneOutlinedIcon size="large" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Phone"
                          secondary={
                            <Typography sx={{ color: colors.greenAccent[500] }}>
                              {customerData?.customer?.phone_number}
                            </Typography>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <HomeOutlinedIcon size="large" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Address"
                          secondary={
                            <Typography>
                              {customerData?.customer?.street1}
                              {', '}
                              {customerData?.customer?.country}
                              {', '}
                              {customerData?.customer?.city}
                              {', '}
                              {customerData?.customer?.state}
                              {', '}
                              {customerData?.customer?.zipcode}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </List>
                  </Box>
                </Box>
              </Box>
              <Box className="w-full">
                <Box
                  backgroundColor={colors.primary[400]}
                  className="w-full flex flex-col gap-4 drop-shadow-lg  rounded-lg p-4"
                >
                  <CustomAlert />
                  <Formik
                    backgroundColor={colors.primary[400]}
                    className="drop-shadow-lg  rounded-lg p-4"
                    onSubmit={handleFormSubmit}
                    initialValues={notesOnCustomerInitialValues}
                    validationSchema={notesOnCustomerSchema}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                      setFieldValue,
                    }) => (
                      <>
                        <form onSubmit={handleSubmit}>
                          <FormControl
                            className="h-full w-full"
                            component="fieldset"
                            variant="standard"
                          >
                            <FormLabel>
                              <Typography
                                variant="h1"
                                color={colors.grey[100]}
                                fontWeight="bold"
                                className={`text-xl md:text-2xl  text-left my-4`}
                              >
                                Notes on Customer
                              </Typography>
                            </FormLabel>
                            <FormGroup className="w-full">
                              <FormControl variant="filled" className="w-full">
                                <TextField
                                  color="secondary"
                                  fullWidth
                                  variant="filled"
                                  type="text"
                                  label="Notes on Customer"
                                  multiline
                                  rows={4}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.description}
                                  name="description"
                                  error={
                                    !!touched.description &&
                                    !!errors.description
                                  }
                                  helperText={
                                    touched.description && errors.description
                                  }
                                  sx={{ gridColumn: 'span 4' }}
                                />
                              </FormControl>
                            </FormGroup>
                            <Button
                              type="submit"
                              color="secondary"
                              variant="outlined"
                              className={`w-full mt-4`}
                            >
                              Add Note
                            </Button>
                          </FormControl>
                        </form>
                      </>
                    )}
                  </Formik>
                  <Box className="w-full flex flex-col gap-4">
                    <Box className="">
                      <Typography
                        variant="subtitle1"
                        color={colors.grey[200]}
                        className={`text-left my-1`}
                      >
                        Gave us a nice feedback
                      </Typography>
                    </Box>
                    {!isFetchingCustomerData &&
                      customerData?.notes.map((note) => (
                        <Box key={note.id} className="">
                          <Typography
                            variant="subtitle1"
                            color={colors.grey[200]}
                            className={`text-right my-1`}
                          >
                            {note.date}
                          </Typography>
                          <Divider />
                          <Typography
                            variant="subtitle1"
                            color={colors.grey[200]}
                            className={`text-left my-1`}
                          >
                            {note.description}
                          </Typography>
                        </Box>
                      ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="w-full xl:w-[60%]">
            <Box className="flex flex-col gap-8">
              <Box
                backgroundColor={colors.primary[400]}
                className="w-full flex flex-col gap-4 drop-shadow-lg  rounded-lg p-4"
              >
                <Typography
                  variant="h1"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  className={`text-xl md:text-2xl  text-left my-4`}
                >
                  Orders ({customerData?.orders?.length})
                </Typography>
                <Box
                  className="h-[400px]"
                  height="400px"
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
                    '& .MuiDataGrid-cell': {
                      width: '100%',
                    },
                  }}
                >
                  {!isFetchingCustomerData ? (
                    customerData?.orders?.length ? (
                      <DataGrid
                        density="comfortable"
                        rows={customerData?.orders}
                        columns={orderColumns}
                        autoPageSize
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
              <Box
                backgroundColor={colors.primary[400]}
                className="w-full flex flex-col gap-4 drop-shadow-lg  rounded-lg p-4"
              >
                <Typography
                  variant="h1"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  className={`text-xl md:text-2xl  text-left my-4`}
                >
                  Wishlist ({customerData?.wishlists?.length})
                </Typography>
                <Box
                  className="h-[400px]"
                  height="400px"
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
                    '& .MuiDataGrid-cell': {
                      width: '100%',
                    },
                  }}
                >
                  {!isFetchingCustomerData ? (
                    customerData?.wishlists?.length ? (
                      <DataGrid
                        density="comfortable"
                        rows={customerData?.wishlists}
                        columns={productColumns}
                        autoPageSize
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
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default CustomerDetails
