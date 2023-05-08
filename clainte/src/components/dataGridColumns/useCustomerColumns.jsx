import { useTheme } from '@emotion/react'
import { Box, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { tokens } from '../../theme'
import userAvatar from '../../assets/user-avatar.png'
import dateFormatter from '../../helpers/dateFormatter'

export const useCustomerColumns = (params) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  let customerColumns = []
  if (params?.isAdmin) {
  }
  return [
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
}
