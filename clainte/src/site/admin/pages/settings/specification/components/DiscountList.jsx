import React from 'react'
import { Box, Button } from '@mui/material'
import Discount from './Discount'
const DiscountList = ({
  discounts,
  readOnly,
  setEditingDiscount,
  handleAddDiscount,
  handleSetDiscount,
  highlightDiscountId,
  setMessages,
}) => {
  return (
    <Box className="w-full">
      <Box className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {discounts?.map((discount, index) => (
          <Discount
            key={`discount-${discount.name}-discounts-${discount.id}-${index}`}
            discount={discount}
            highlightDiscountId={highlightDiscountId}
            handleSetDiscount={handleSetDiscount}
            setEditingDiscount={setEditingDiscount}
            setMessages={setMessages}
            readOnly={readOnly}
          />
        ))}
      </Box>
      {!readOnly && (
        <Button
          onClick={handleAddDiscount}
          type="button"
          color="secondary"
          variant="outlined"
          className={`w-full mt-4`}
        >
          Add New
        </Button>
      )}
    </Box>
  )
}

export default DiscountList
