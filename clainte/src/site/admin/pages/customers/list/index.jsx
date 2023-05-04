import React from 'react'
import { Link } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Typography,
  Breadcrumbs,
  useTheme,
  CircularProgress,
} from '@mui/material'
import { tokens } from '../../../../../theme'
import Header from '../../../../../components/Header'
import { useGetAllCustomersQuery } from '../../../../../features/services/customerApiSlice'
import userAvatar from '../../../../../assets/user-avatar.png'
import dateFormatter from '../../../../../helpers/dateFormatter'
const CustomersList = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  const { data: customerData, isFetching: isFetchingCustomer } =
    useGetAllCustomersQuery()
  const customerColumns = [
    {
      field: 'first_name',
      headerName: 'Customer',
      width: 200,
      height: 200,
      renderCell: ({ row: { id, full_name, image } }) => {
        return (
          <Box className="flex gap-4 items-center py-2 w-full h-full">
            <Link to={`/admin/customers/${id}`}>
              <img
                className="h-[60px] w-[60px] pointer rounded-full  border bg-slate-300 "
                src={image || userAvatar}
                alt={`${full_name}`}
              />
            </Link>
            <Link to={`/admin/customers/${id}`}>
              <Typography color={colors.greenAccent[500]}>
                {full_name || 'no name'}
              </Typography>
            </Link>
          </Box>
        )
      },
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      renderCell: ({ row: { id, email } }) => {
        return (
          <Link to={`/admin/customers/${id}`}>
            <Typography color={colors.greenAccent[500]}>
              {email || 'no email'}
            </Typography>
          </Link>
        )
      },
    },
    {
      field: 'username',
      headerName: 'Username',
      width: 200,
      renderCell: ({ row: { id, username } }) => {
        return (
          <Link to={`/admin/customers/${id}`}>
            <Typography color={colors.greenAccent[500]}>{username}</Typography>
          </Link>
        )
      },
    },
    {
      field: 'orders',
      headerName: 'Orders',
      width: 150,
      renderCell: ({ row: { orders } }) => {
        return <Typography>{orders || 0}</Typography>
      },
    },
    {
      field: 'phone_number',
      headerName: 'Phone Number',
      width: 150,
      renderCell: ({ row: { phone_number } }) => {
        return <Typography>{phone_number || 'no number'}</Typography>
      },
    },

    {
      field: 'total_spent',
      headerName: 'Total spent',
      width: 100,
      renderCell: ({ row: { total_spent } }) => {
        return (
          <Typography color={colors.greenAccent[500]}>
            ${total_spent || 0}
          </Typography>
        )
      },
    },
    {
      field: 'last_order',
      headerName: 'Last order',
      width: 200,
      renderCell: ({ row: { last_order } }) => {
        return (
          <Typography>
            {dateFormatter(new Date(last_order)) || 'no order'}
          </Typography>
        )
      },
    },
    {
      field: 'date_joined',
      headerName: 'Date Joined',
      width: 200,
      renderCell: ({ row: { date_joined } }) => {
        return <Typography>{dateFormatter(new Date(date_joined))}</Typography>
      },
    },
  ]

  return (
    <Box className={`flex flex-col gap-4 md:gap-8 md:mt-20`}>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            onClick={() => navigate(`/`)}
            variant="text"
            color="secondary"
            className={`bg-opacity-0 hover:bg-opacity-100 px-4 py-2`}
          >
            Admin Dashboard
          </Button>
          <Typography color="text.primary">Customers</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header title="Customers" subtitle="welcome to you Customers" />
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
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
          {!isFetchingCustomer ? (
            customerData?.length ? (
              <DataGrid
                density="comfortable"
                rows={customerData}
                columns={customerColumns}
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
    </Box>
  )
}

export default CustomersList
