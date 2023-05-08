import React from 'react'
import { Box, Button } from '@mui/material'
import Variant from './Variant'
const VariantList = ({
  selected,
  variants,
  setEditingVariant,
  handleSetVariant,
  handleAddVariant,
  setMessages,
}) => {
  return (
    <Box className="w-full">
      <Box className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {variants?.map((variant, index) => (
          <Variant
            key={`variant-${variant.name}-variants-${variant.id}-${index}`}
            variant={variant}
            handleSetVariant={handleSetVariant}
            setEditingVariant={setEditingVariant}
            highlightVariantId={
              selected?.find(
                (selectedVariant) => selectedVariant.id === variant.id
              )?.id
            }
            setMessages={setMessages}
          />
        ))}
      </Box>
      <Button
        onClick={handleAddVariant}
        type="button"
        color="secondary"
        variant="outlined"
        className={`w-full mt-4`}
      >
        Add New Discount
      </Button>
    </Box>
  )
}
export default VariantList
