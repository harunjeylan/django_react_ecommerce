import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  Typography,
  Divider,
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
const OrderDetailsCustomer = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const { orderId } = useParams()
  const { data: order, isFetching: isFetchingOrder } = useGetOrderDetailsQuery({
    orderId: orderId,
  })
  const productColumns = [
    {
      field: 'title',
      headerName: 'Product Name',
      width: 150,
      height: 200,
      renderCell: ({ row: { id, title, thumbnail } }) => {
        return (
          <Box className="flex gap-4 items-center py-2 w-full h-full">
            <Link to={`/product/${id}`}>
              <img
                style={{ backgroundColor: colors.primary[400] }}
                className="h-[60px] w-[60px] pointer rounded-md border-[1px]"
                src={thumbnail}
                alt={`${title}`}
              />
            </Link>
            <Link to={`/product/${id}`}>
              <Typography color={colors.greenAccent[500]}>{title}</Typography>
            </Link>
          </Box>
        )
      },
    },
    { field: 'category', headerName: 'Category', width: 100 },
    { field: 'collection', headerName: 'Collection', width: 100 },

    {
      field: 'variant',
      headerName: 'Variants',
      width: 150,
      renderCell: ({ row: { variants } }) => {
        return variants.length ? (
          <Box className="flex flex-col">
            {variants.map((variant) => (
              <Typography key={variant.id} variant="p">
                <strong>
                  {variant?.variantLabel}: {variant?.optionLabel}
                </strong>
              </Typography>
            ))}
          </Box>
        ) : (
          <Typography variant="p">
            <strong>No Variants</strong>
          </Typography>
        )
      },
    },
    {
      field: 'sale_pricing',
      headerName: 'pricing',
      renderCell: ({ row: { sale_pricing } }) => {
        return <Typography>{sale_pricing}</Typography>
      },
    },

    { field: 'brand', headerName: 'Brand', width: 100 },
  ]
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
                <Box className="flex flex-col lg:flex-row justify-between gap-4 py-2 mt-4">
                  <Box className="w-full">
                    <OrderSummery totalPrice={order?.total_price} />
                  </Box>
                  <Box className="w-full">
                    <Box
                      backgroundColor={colors.primary[400]}
                      className="flex flex-col gap-4 drop-shadow-lg  rounded-lg py-2"
                    >
                      <Box className="px-4 pt-2 ">
                        <Typography
                          variant="h1"
                          color={colors.grey[100]}
                          fontWeight="bold"
                          className={`text-xl md:text-2xl  text-left`}
                        >
                          Billing Address
                        </Typography>
                      </Box>
                      <Divider />
                      <Box className="flex flex-col gap-4 px-4 py-2">
                        <Typography variant="h5" fontWeight="bold">
                          {order?.billing_address?.first_name}{' '}
                          {order?.billing_address?.last_name}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold">
                          {order?.billing_address?.email}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold">
                          {order?.billing_address?.phone_number}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold">
                          {order?.billing_address?.street1}
                          {order?.billing_address?.street2 &&
                            ` or ${order?.billing_address?.street2}`}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold">
                          {order?.billing_address?.city}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold">
                          {order?.billing_address?.state}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold">
                          {order?.billing_address?.country}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box className="w-full">
                    <Box
                      backgroundColor={colors.primary[400]}
                      className="flex flex-col gap-4 drop-shadow-lg  rounded-lg py-2"
                    >
                      <Box className="px-4 pt-2 ">
                        <Typography
                          variant="h1"
                          color={colors.grey[100]}
                          fontWeight="bold"
                          className={`text-xl md:text-2xl  text-left`}
                        >
                          Shipping Address
                        </Typography>
                      </Box>
                      <Divider />
                      <Box className="flex flex-col gap-4 px-4 py-2">
                        <Typography variant="h5" fontWeight="bold">
                          {order?.shipping_address?.first_name}{' '}
                          {order?.shipping_address?.last_name}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold">
                          {order?.shipping_address?.email}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold">
                          {order?.shipping_address?.phone_number}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold">
                          {order?.shipping_address?.street1}
                          {order?.billing_address?.street2 &&
                            ` or ${order?.billing_address?.street2}`}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold">
                          {order?.shipping_address?.city}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold">
                          {order?.shipping_address?.state}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold">
                          {order?.shipping_address?.country}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
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
