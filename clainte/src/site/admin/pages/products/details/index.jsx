import React, { useState, useEffect } from 'react'
import { useTheme } from '@emotion/react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import {
  Box,
  CardActionArea,
  Button,
  Typography,
  Breadcrumbs,
  Tabs,
  Tab,
  CircularProgress,
  ButtonGroup,
  Chip,
} from '@mui/material'
import { useGetProductsDetailsQuery } from '../../../../../features/services/productApiSlice'
import { tokens } from '../../../../../theme'
import Header from '../../../../../components/Header'
import Reviews from '../../../../../components/Reviews'
import ProductRating from '../../../../../components/ProductRating'
import ProductDetails from '../../../../../components/ProductDetails'

const ProductDetailsPage = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  const { productId } = useParams()
  const [value, setValue] = useState('description')

  const { data: product = {}, isFetching: isFetchingProduct } =
    useGetProductsDetailsQuery({ productId })

  const [activeImage, setActiveImage] = useState(product?.thumbnail)

  useEffect(() => {
    setActiveImage(product?.thumbnail)
  }, [product?.thumbnail])

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
          <Typography color="text.primary">Product Details</Typography>
        </Breadcrumbs>
      </Box>
      <Box
        className={`md:container px-2 md:mx-auto md:px-auto flex justify-between items-center`}
      >
        <Header
          title={`Product details`}
          subtitle={`Product ID : ${productId}`}
        />
        <ButtonGroup>
          <Button
            onClick={() => navigate(`/admin/products/${productId}/edit`)}
            color="secondary"
            variant="outlined"
            size="large"
          >
            Edit
          </Button>
          <Button
            onClick={() => navigate(`/admin/products/new`)}
            color="secondary"
            variant="outlined"
            size="large"
          >
            Add New
          </Button>
        </ButtonGroup>
      </Box>
      <Box className={`md:container px-4 md:mx-auto md:px-auto`}>
        <ProductDetails productId={productId} isAdminPage />
      </Box>
    </Box>
  )
}

export default ProductDetailsPage
