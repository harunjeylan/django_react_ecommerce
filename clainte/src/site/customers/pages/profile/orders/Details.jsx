import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Typography,
  Box,
  useTheme,
  Breadcrumbs,
  Button,
  CircularProgress,
} from '@mui/material'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import { useGetOrderDetailsQuery } from '../../../../../features/services/orderApiSlice'
import ProfileCard from '../global/ProfileCard'
import { tokens } from '../../../../../theme'
import Header from '../../../../../components/Header'
import OrderSummery from '../../../../../components/OrderSummery'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import OrderAddressInformation from '../../../../../components/OrderAddressInformation'
import { useProductColumns } from '../../../../../components/dataGridColumns/useProductColumns'
const OrderDetailsCustomer = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const { orderId } = useParams()
  const { data: order, isFetching: isFetchingOrder } = useGetOrderDetailsQuery({
    orderId: orderId,
  })
  const productColumns = useProductColumns()
  return (
    <Box className={`flex flex-col gap-4 md:gap-8 mt-20 md:mt-40`}>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            onClick={() => navigate(`/`)}
            variant="text"
            color="secondary"
            className={` px-4 py-2 ${'hover:bg-' + colors.greenAccent[400]}`}
          >
            Home
          </Button>
          <Button
            onClick={() => navigate(`/orders`)}
            variant="text"
            color="secondary"
            className={` px-4 py-2 ${'hover:bg-' + colors.greenAccent[400]}`}
          >
            orders
          </Button>
          <Typography color="text.primary">Order {orderId}</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header
          title={`Order #${orderId}`}
          subtitle={`Order #${orderId} was placed on ${order?.date} and is currently Being ${order?.fulfillment_status}.`}
        />
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Box className="flex flex-col-reverse  gap-8 md:flex-row">
          {!isFetchingOrder ? (
            order?.products?.length ? (
              <Box className=" w-full md:max-w-[60%] lg:max-w-[70%]   drop-shadow-md">
                <Box
                  className="w-full h-[400px]"
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
                  {order?.products?.length ? (
                    <DataGrid
                      density="comfortable"
                      rows={order?.products}
                      columns={productColumns}
                      autoPageSize
                      components={{ Toolbar: GridToolbar }}
                    />
                  ) : (
                    <Box
                      backgroundColor={colors.primary[400]}
                      className={`container mx-auto py-[80px] rounded-lg`}
                    >
                      <Box className="flex flex-col gap-4 justify-center items-center">
                        <ShoppingBagOutlinedIcon
                          size="large"
                          className="text-8xl"
                        />
                        <Typography
                          variant="h2"
                          color={colors.grey[100]}
                          fontWeight="bold"
                          className={`text-4xl md:text-6xl  `}
                        >
                          Empty List
                        </Typography>
                        <Button
                          onClick={() => navigate(`/shopping`)}
                          variant="outlined"
                          color="secondary"
                          className={` px-[40px] py-2`}
                        >
                          Go Shop now
                        </Button>
                      </Box>
                    </Box>
                  )}
                </Box>
                <Box className="flex flex-col xl:flex-row justify-between gap-4 py-2 mt-4">
                  {!isFetchingOrder && (
                    <>
                      <OrderSummery
                        totalPrice={order?.total_price}
                        deliveryMethod={order?.delivery_method}
                      />
                      <OrderAddressInformation orderData={order} />
                    </>
                  )}
                </Box>
              </Box>
            ) : (
              <Box
                backgroundColor={colors.primary[400]}
                className={`container mx-auto py-[80px] rounded-lg`}
              >
                <Box className="flex flex-col gap-4 justify-center items-center">
                  <ShoppingBagOutlinedIcon size="large" className="size-lg" />
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    className={`text-4xl md:text-6xl  `}
                  >
                    No Product Found
                  </Typography>
                  <Button
                    onClick={() => navigate(`/shopping`)}
                    variant="outlined"
                    color="secondary"
                    className={` px-[40px] py-2 ${
                      'hover:bg-' + colors.greenAccent[400]
                    }`}
                  >
                    Go Bay now
                  </Button>
                </Box>
              </Box>
            )
          ) : (
            <Box className="w-full flex items-center justify-center h-40">
              <CircularProgress color="secondary" />
            </Box>
          )}

          <Box className="w-full md:max-w-[40%] lg:max-w-[30%] ">
            <ProfileCard />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default OrderDetailsCustomer
