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
  MenuItem,
  InputLabel,
  FormControl,
  FormLabel,
  FormGroup,
  Select,
  CircularProgress,
} from '@mui/material'

import {
  useGetOrderDetailsQuery,
  useUpdateOrderMutation,
} from '../../../../../features/services/orderApiSlice'
import { tokens } from '../../../../../theme'
import Header from '../../../../../components/Header'
import OrderSummery from '../../../../../components/OrderSummery'
import useAlert from '../../../../../components/ui/useAlert'
import { useSnackbar } from 'notistack'
import OrderAddressInformation from '../../../../../components/OrderAddressInformation'
import { useProductColumns } from '../../../../../components/dataGridColumns/useProductColumns'

const OrderDetailsForAdmin = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  const { orderId } = useParams()
  const [CustomAlert, setMessages] = useAlert()
  const { enqueueSnackbar } = useSnackbar()
  const [updateOrder] = useUpdateOrderMutation()
  const { data: orderData, isFetching: isFetchingOrder } =
    useGetOrderDetailsQuery({
      orderId: orderId,
    })
  const orderStateInitialValues = {
    payment_status: orderData?.payment_status || '',
    fulfillment_status: orderData?.fulfillment_status || '',
  }
  const orderStateSchema = yup.object().shape({
    payment_status: yup.string().required('Required'),
    fulfillment_status: yup.string().required('Required'),
  })
  const handleFormSubmit = (values, { resetForm }) => {
    updateOrder({ post: { id: orderId, ...values } }).then((data) => {
      if (data?.error?.data) {
        Object.keys(data.error.data).forEach((key) => {
          setMessages((prev) => [
            ...prev,
            {
              id: key,
              variant: 'error',
              description: data.error.data[key],
            },
          ])
        })
      } else {
        enqueueSnackbar(`Order is updated successfully!`, {
          variant: 'success',
        })
      }
    })
  }

  const columns = useProductColumns({isAdmin:true})

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
          <Typography color="text.primary">Order # {orderId}</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header title={`Order # ${orderId}`} subtitle="Customer ID : 2364847" />
      </Box>
      <Box
        className={`md:container px-2 md:mx-auto md:px-auto flex flex-col gap-8`}
      >
        <Box className="grid  lg:grid-cols-3 gap-4">
          <Box className="w-full col-span-2">
            <Box
              height="80vh"
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
              {!isFetchingOrder ? (
                orderData?.products?.length ? (
                  <DataGrid
                    density="comfortable"
                    rows={orderData?.products}
                    columns={columns}
                    autoPageSize
                    // checkboxSelection
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
          <Box className="w-full col-span-2 lg:col-span-1">
            <Box className="flex flex-col gap-4">
              {!isFetchingOrder && (
                <OrderSummery
                  totalPrice={orderData?.total_price}
                  deliveryMethod={orderData?.delivery_method}
                />
              )}
              <Box
                backgroundColor={colors.primary[400]}
                className="drop-shadow-lg  rounded-lg p-4"
              >
                <CustomAlert />
                <Formik
                  onSubmit={handleFormSubmit}
                  initialValues={orderStateInitialValues}
                  validationSchema={orderStateSchema}
                  enableReinitialize
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
                              Order Status
                            </Typography>
                          </FormLabel>
                          <FormGroup className="w-full grid grid-cols-2  lg:grid-cols-1 xl:grid-cols-2 gap-2">
                            <Box className="w-full">
                              <Box className="w-full px-1">
                                <Typography
                                  variant="h6"
                                  fontWeight="bold"
                                  className="my-2"
                                >
                                  Payment status
                                </Typography>
                              </Box>
                              <FormControl variant="filled" className="w-full">
                                <InputLabel id="payment_status-select-label">
                                  Payment status
                                </InputLabel>
                                <Select
                                  fullWidth
                                  color="secondary"
                                  labelId="payment_status-select-label"
                                  id="payment_status-select"
                                  variant="filled"
                                  value={values.payment_status}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  name="payment_status"
                                >
                                  <MenuItem value="">----------</MenuItem>
                                  <MenuItem value="cancelled">
                                    Cancelled
                                  </MenuItem>
                                  <MenuItem value="pending">Pending</MenuItem>
                                  <MenuItem value="failed">Failed</MenuItem>
                                  <MenuItem value="complete">Complete</MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                            <Box className="w-full">
                              <Box className="w-full px-1">
                                <Typography
                                  variant="h6"
                                  fontWeight="bold"
                                  className="my-2"
                                >
                                  Fulfillment status
                                </Typography>
                              </Box>
                              <FormControl variant="filled" className="w-full">
                                <InputLabel id="fulfillment_status-select-label">
                                  Fulfillment status
                                </InputLabel>
                                <Select
                                  fullWidth
                                  color="secondary"
                                  labelId="fulfillment_status-select-label"
                                  id="fulfillment_status-select"
                                  variant="filled"
                                  value={values.fulfillment_status}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  name="fulfillment_status"
                                >
                                  <MenuItem value="">----------</MenuItem>
                                  <MenuItem value="cancelled">
                                    Cancelled
                                  </MenuItem>
                                  <MenuItem value="pending">Pending</MenuItem>
                                  <MenuItem value="failed">Failed</MenuItem>
                                  <MenuItem value="complete">Complete</MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                          </FormGroup>
                          <Button
                            type="submit"
                            color="secondary"
                            variant="outlined"
                            className={`w-full mt-4`}
                          >
                            save updates
                          </Button>
                        </FormControl>
                      </form>
                    </>
                  )}
                </Formik>
              </Box>
            </Box>
          </Box>
        </Box>
        <OrderAddressInformation orderData={orderData} />
      </Box>
    </Box>
  )
}

export default OrderDetailsForAdmin
