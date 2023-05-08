import { useTheme } from '@emotion/react'
import { Box, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { tokens } from '../../theme'
import userAvatar from '../../assets/user-avatar.png'
import dateFormatter from '../../helpers/dateFormatter'
export const useOrderColumns = (params) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  let orderColumns = [
    {
      field: 'id',
      headerName: 'ORDER',
      width: 100,
      renderCell: ({ row: { id } }) => {
        return (
          <Link
            to={
              params?.isAdmin ? `/admin/orders/${id}` : `/profile/orders/${id}`
            }
          >
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
  ]
  if (params?.isAdmin) {
    orderColumns.push({
      field: 'first_name',
      headerName: 'Customer',
      width: 200,
      height: 200,
      renderCell: ({ row: { full_name, avatar } }) => {
        return (
          <Box className="flex justify-start gap-4 items-center py-2 w-full h-full">
            <Link to={`/admin/customers/${1}`}>
              <img
                className="h-[60px] w-[60px] cursor-pointer  rounded-full  border bg-slate-300 "
                src={avatar || userAvatar}
                alt={`${full_name}`}
              />{' '}
            </Link>
            <Link to={`/admin/customers/${1}`}>
              <Typography
                className="cursor-pointer"
                color={colors.greenAccent[500]}
              >
                {full_name || 'no name'}
              </Typography>
            </Link>
          </Box>
        )
      },
    })
  }
  return [
    ...orderColumns,
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
    {
      field: 'delivery_method',
      headerName: 'Delivery',
      width: 200,
      renderCell: ({ row: { delivery_method } }) => {
        return delivery_method ? (
          <Box className="flex flex-col">
            <Typography variant="p">
              <strong>Name: {delivery_method?.name}</strong>
            </Typography>
            <Typography variant="p">
              <strong>Pricing: </strong>${delivery_method?.pricing}
            </Typography>
          </Box>
        ) : (
          <Typography variant="p">
            <strong>No Delivery</strong>
          </Typography>
        )
      },
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 150,
      renderCell: ({ row: { date } }) => {
        return (
          <Typography>{dateFormatter(new Date(date)) || 'no order'}</Typography>
        )
      },
    },
    {
      field: 'products',
      headerName: 'Products',
      width: 100,
      renderCell: ({ row: { products } }) => {
        return <Typography>{products || 0}</Typography>
      },
    },
    {
      field: 'total_products',
      headerName: 'Total Products',
      width: 100,
      renderCell: ({ row: { total_products } }) => {
        return <Typography>{total_products || 0}</Typography>
      },
    },
  ]
}
