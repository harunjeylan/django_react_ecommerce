import { useTheme } from '@emotion/react'
import { Box, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { tokens } from '../../theme'

export const useProductColumns = (params) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  let productColumns = []
  if (params?.isAdmin) {
  }
  return [
    {
      field: 'title',
      headerName: 'Product Name',
      width: 200,
      height: 200,
      renderCell: ({ row: { id, title, thumbnail } }) => {
        return (
          <Box className="flex gap-4 items-center py-2 w-full h-full">
            <Link
              to={params?.isAdmin ? `/admin/products/${id}` : `/product/${id}`}
            >
              <img
                style={{ backgroundColor: colors.primary[400] }}
                className="h-[60px] w-[60px] pointer rounded-md border-[1px]"
                src={thumbnail}
                alt={`${title}`}
              />
            </Link>
            <Link
              to={params?.isAdmin ? `/admin/products/${id}` : `/product/${id}`}
            >
              <Typography color={colors.greenAccent[500]}>{title}</Typography>
            </Link>
          </Box>
        )
      },
    },
    { field: 'category', headerName: 'Category', width: 100 },
    { field: 'collection', headerName: 'Collection', width: 100 },
    { field: 'count', headerName: 'Count', width: 100 },
    {
      field: 'sale_pricing',
      headerName: 'pricing',
      renderCell: ({ row: { sale_pricing } }) => {
        return <Typography>{sale_pricing}</Typography>
      },
    },
    {
      field: 'Variants',
      headerName: 'Variants',
      width: 200,
      renderCell: ({ row: { variants } }) => {
        return variants?.length ? (
          <Box className="flex flex-col">
            {variants.map((variant, index) => (
              <Typography key={`${variant.id}-${index}`} variant="p">
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
}
