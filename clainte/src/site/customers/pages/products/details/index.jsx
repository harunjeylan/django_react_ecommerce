import React from 'react'
import { useTheme } from '@emotion/react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { Box, Button, Typography, Breadcrumbs } from '@mui/material'

import Service from '../../../../../components/Service'
import Subscribe from '../../../components/Subscribe'

import RelatedProducts from './RelatedProducts'
import { tokens } from '../../../../../theme'
import ProductDetails from '../../../../../components/ProductDetails'

const ProductDetailsPage = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  const { productId } = useParams()
  return (
    <Box className={`flex flex-col gap-4 md:gap-8 mt-20 md:mt-40`}>
      <Box className={`md:container px-4 md:mx-auto md:px-auto`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            onClick={() => navigate(`/`)}
            variant="text"
            color="secondary"
          >
            Home
          </Button>
          <Button
            onClick={() => navigate(`/shopping`)}
            variant="text"
            color="secondary"
            className={`bg-opacity-0 hover:bg-opacity-100 px-4 py-2 ${
              'hover:bg-' + colors.greenAccent[400]
            }`}
          >
            shopping
          </Button>
          <Typography color="text.primary">#{productId}</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`md:container px-4 md:mx-auto md:px-auto`}>
        <ProductDetails productId={productId} />
      </Box>
      <RelatedProducts productId={productId} />
      <Box
        backgroundColor={colors.primary[400]}
        className="px-2 md:px-4 flex justify-center lg:px-auto py-[80px] items-center mb-[50px]"
      >
        <Service />
      </Box>
      <Box className={`md:container px-4 md:mx-auto md:px-auto`}>
        <Box className="max-w-lg mx-auto flex justify-between items-center gap-4">
          <Subscribe />
        </Box>
      </Box>
    </Box>
  )
}

export default ProductDetailsPage
