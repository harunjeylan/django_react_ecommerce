import React from 'react'
import { Box, CardActionArea, IconButton, Typography } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

import { useTheme } from '@emotion/react'
import { useSnackbar } from 'notistack'
import { useDeleteVariantMutation } from '../../../../../../features/services/variantApiSlice'
import { tokens } from '../../../../../../theme'

const Variant = ({
  variant,
  highlightVariantId,
  setEditingVariant,
  setMessages,
  handleSetVariant = (...rest) => {},
}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const { enqueueSnackbar } = useSnackbar()

  const [deleteVariant] = useDeleteVariantMutation()
  const handleDelete = () => {
    deleteVariant({ post: { id: variant.id } }).then((data) => {
      if (data?.error?.status) {
        Object.keys(data.error.data).forEach((key) => {
          setMessages((prev) => [
            ...prev,
            { id: key, variant: 'error', description: data.error.data[key] },
          ])
        })
      } else {
        enqueueSnackbar(
          `Variant -> ${variant.label} is deleted successfully!`,
          {
            variant: 'success',
          }
        )
      }
    })
  }
  return (
    <Box className="flex flex-col  w-full  bg-slate-400/10 rounded-lg">
      <Box
        className="flex justify-between items-center p-2 h-10 rounded-t-lg"
        backgroundColor={
          highlightVariantId === variant.id
            ? colors.greenAccent[600]
            : colors.primary[300]
        }
      >
        <Typography variant="h5" fontWeight="bold">
          {variant.label}
        </Typography>
        <Box className="flex gap-1">
          <IconButton
            color="warning"
            onClick={() => setEditingVariant(variant)}
          >
            <EditOutlinedIcon />
          </IconButton>
          <IconButton color="error" onClick={handleDelete}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
      <CardActionArea
        onClick={() => handleSetVariant(variant.id)}
        className="h-full w-full p-2"
      >
        <Box className={`w-full grid grid-cols-2 gap-4 `}>
          {variant?.options?.map((option, index2) => (
            <Typography
              key={`variant-${option.label}-options-${option.id}-${index2}`}
              backgroundColor={colors.primary[400]}
              sx={{
                border: `1.5px solid ${colors.neutral[500]}`,
              }}
              className="flex justify-center items-center p-2 rounded-sm"
            >
              {option.label}
            </Typography>
          ))}
        </Box>
      </CardActionArea>
    </Box>
  )
}

export default Variant
