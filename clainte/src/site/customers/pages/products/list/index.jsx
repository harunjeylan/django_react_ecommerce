import React from 'react'
import { useTheme } from '@emotion/react'
import { tokens } from '../../../../../theme'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useGetMostSealedProductsQuery,
  useGetTopRatedProductsQuery,
} from '../../../../../features/services/productApiSlice'
import {
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material'
import ProductsList from '../../../components/ProductsList'
import Header2 from '../../../../../components/Header2'

const ProductsListCustomer = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  const { productFilter } = useParams()
  const { data: topRatedProducts, isFetching: isFetchingTopRatedProducts } =
    useGetTopRatedProductsQuery({ limit: 100 })
  const { data: mostSealedProducts, isFetching: isFetchingMostSealedProducts } =
    useGetMostSealedProductsQuery({ limit: 100 })
  return (
    <Box className={`flex flex-col gap-4 md:gap-8 mt-4`}>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            onClick={() => navigate(`/`)}
            variant="text"
            color="secondary"
          >
            Home
          </Button>
          <Typography color="text.primary">{productFilter}</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        {productFilter === 'top-rated' ? (
          !isFetchingTopRatedProducts ? (
            topRatedProducts.length ? (
              <Box className="flex flex-col gap-8">
                <Header2
                  title="Most Sealed Product"
                  subtitle="Alif Newsroom  Newsroom"
                />
                <ProductsList products={topRatedProducts} />
              </Box>
            ) : (
              <Box className="flex flex-col gap-4 mt-[10%] justify-center  items-center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  className={`text-xl md:text-2xl  `}
                >
                  No Product found
                </Typography>
              </Box>
            )
          ) : (
            <Box className="w-full flex items-center justify-center h-full min-h-40">
              <CircularProgress color="secondary" />
            </Box>
          )
        ) : undefined}
        {productFilter === 'most-sealed' ? (
          !isFetchingMostSealedProducts ? (
            mostSealedProducts.length ? (
              <Box className="flex flex-col gap-8">
                <Header2
                  title="Get Alif Newsroom"
                  subtitle="Alif Newsroom Alif Newsroom"
                />
                <ProductsList products={mostSealedProducts} />
              </Box>
            ) : (
              <Box className="flex flex-col gap-4 mt-[10%] justify-center  items-center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  className={`text-xl md:text-2xl  `}
                >
                  No Product found
                </Typography>
              </Box>
            )
          ) : (
            <Box className="w-full flex items-center justify-center h-full min-h-40">
              <CircularProgress color="secondary" />
            </Box>
          )
        ) : undefined}
      </Box>
    </Box>
  )
}

export default ProductsListCustomer
