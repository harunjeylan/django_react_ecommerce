import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Typography,
  Box,
  useTheme,
  Breadcrumbs,
  Button,
  CircularProgress,
} from '@mui/material'
import ProfileCard from '../global/ProfileCard'
import { useGetAllOrdersQuery } from '../../../../../features/services/orderApiSlice'
import { tokens } from '../../../../../theme'
import Header from '../../../../../components/Header'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import dateFormatter from '../../../../../helpers/dateFormatter'
const OrdersListCustomer = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const { data: orders, isFetching: isFetchingOrders } = useGetAllOrdersQuery()
  const orderColumns = [
    {
      field: 'id',
      headerName: 'ORDER',
      width: 100,
      renderCell: ({ row: { id } }) => {
        return (
          <Link to={`/profile/orders/${id}`}>
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
          <Typography color="text.primary">Order</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header
          title="Your Orders"
          subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt."
        />
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Box className="flex flex-col-reverse  gap-8 md:flex-row">
          <Box
            className="w-full md:max-w-[60%] lg:max-w-[70%] h-[400px]"
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
            {!isFetchingOrders ? (
              orders?.length ? (
                <DataGrid
                  density="comfortable"
                  rows={orders}
                  columns={orderColumns}
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
              )
            ) : (
              <Box className="w-full flex items-center justify-center h-full min-h-40">
                <CircularProgress color="secondary" />
              </Box>
            )}
          </Box>
          <Box className="w-full md:max-w-[40%] lg:max-w-[30%] ">
            <ProfileCard />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default OrdersListCustomer
