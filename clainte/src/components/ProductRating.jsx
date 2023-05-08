import React from 'react'
import { Box, Typography } from '@mui/material'

import StarIcon from '@mui/icons-material/Star'
import { useTheme } from '@emotion/react'
import { tokens } from '../theme'

const ProductRating = ({ product }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <Box className=" w-full flex flex-col  sm:flex-row gap-4 items-center">
      <Box className="w-fit flex flex-col gap-4 justify-center items-center">
        <Box className="w-fit flex">
          <StarIcon fontSize="large" className="text-yellow-500 text-6xl" />
          <Typography
            variant="h1"
            color={colors.greenAccent[400]}
            className=" text-6xl"
          >
            {product?.rating?.average}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" color={colors.greenAccent[400]}>
            {product?.rating?.total} Reviews
          </Typography>
        </Box>
      </Box>

      <Box className=" w-full flex flex-col gap-2">
        {product?.rating?.values?.map((rating) => (
          <Box key={rating.rating} className={`flex gap-2 w-full items-center`}>
            <Typography>
              <strong>{rating.rating}</strong>
            </Typography>
            <Box
              backgroundColor={colors.primary[400]}
              className="w-full h-4 outline-1 flex justify-start items-center rounded-md"
            >
              <span
                style={{ width: `${rating?.average}%` }}
                className={`py1 bg-yellow-500 h-full rounded-md`}
              />
            </Box>
            <strong>{rating?.total}</strong>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default ProductRating
