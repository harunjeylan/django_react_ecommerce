import React, { useEffect, useState } from 'react'
import { useTheme } from '@emotion/react'
import { tokens } from '../../../../../theme'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import {
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material'
import ProductsList from '../../../components/ProductsList'
import Header2 from '../../../../../components/Header2'
import { useFilterItemsQuery } from '../../../../../features/services/searchApiSlice'

const ProductsListCustomer = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  const { productFilter } = useParams()
  const [searchParams] = useSearchParams()
  const [filter, setFilter] = useState('')
  useEffect(() => {
    let searchAndFilterValue = ''
    for (const entry of searchParams.entries()) {
      const [param, value] = entry
      searchAndFilterValue = searchAndFilterValue + `${param}=${value}&`
    }
    setFilter(searchAndFilterValue)
  }, [searchParams.entries()])

  const {
    data: searchAndFilterProducts = [],
    isFetching: isFetchingSearchAndFilterProducts,
  } = useFilterItemsQuery({
    filter,
  })

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
        {!isFetchingSearchAndFilterProducts ? (
          searchAndFilterProducts.length ? (
            <Box className="flex flex-col gap-8">
              <Header2
                title="Most Sealed Product"
                subtitle="Alif Newsroom  Newsroom"
              />
              <ProductsList products={searchAndFilterProducts} />
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
        )}
      </Box>
    </Box>
  )
}

export default ProductsListCustomer
