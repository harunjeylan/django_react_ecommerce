import React from 'react'
import { Typography, Box, useTheme, Divider } from '@mui/material'
import { tokens } from '../theme'

const OrderSummery = ({ deliveryMethod, totalPrice, tax }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const getTotalPrice = () => {
    let total_price = totalPrice
    if (deliveryMethod) {
      total_price += deliveryMethod.pricing
    }
    if (tax) {
      total_price += tax
    }
    return total_price
  }
  return (
    <Box
      backgroundColor={colors.primary[400]}
      className="flex flex-col gap-4 drop-shadow-lg  rounded-lg py-2"
    >
      <Box className="px-4 pt-2">
        <Typography
          variant="h1"
          color={colors.grey[100]}
          fontWeight="bold"
          className={`text-xl md:text-2xl  text-left`}
        >
          Order Summary
        </Typography>
      </Box>
      <Divider />
      <Box className="flex flex-col gap-4 px-4 py-2 ">
        <Typography variant="h5" fontWeight="bold">
          Order Summary
        </Typography>
        <Typography className="">
          Shipping and additional costs are calculated based on values you have
          entered.
        </Typography>
        <Box className="flex justify-between mt-4">
          <Typography variant="h5" fontWeight="bold">
            Order Subtotal
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            ${totalPrice}
          </Typography>
        </Box>
      </Box>
      <Divider />
      {deliveryMethod && (
        <Box className=" px-4 pt-2 flex flex-col gap-2">
          <Box className="flex justify-between">
            <Typography variant="h5" fontWeight="bold">
              Delivery
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              ${deliveryMethod.pricing}
            </Typography>
          </Box>
          <Typography variant="h5" fontWeight="bold">
            {deliveryMethod.name}
          </Typography>
          <Typography className="">{deliveryMethod.description}</Typography>
          <Divider />
        </Box>
      )}
      <Box className="flex justify-between px-4 pt-2 ">
        <Typography variant="h5" fontWeight="bold">
          Tax
        </Typography>
        <Typography variant="h5" fontWeight="bold">
          ${tax || 0}
        </Typography>
      </Box>
      <Divider />
      <Box className="flex justify-between px-4 pt-2 ">
        <Typography variant="h5" fontWeight="bold">
          Total
        </Typography>
        <Typography variant="h5" fontWeight="bold">
          ${getTotalPrice()}
        </Typography>
      </Box>
    </Box>
  )
}

export default OrderSummery
