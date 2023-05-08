import React from 'react'
import { Box, CardContent, IconButton, Typography } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { tokens } from '../../../../../../theme'
import { useTheme } from '@emotion/react'
import { useDeleteDeliveryMutation } from '../../../../../../features/services/deliveryApiSlice'
import { useSnackbar } from 'notistack'
const Delivery = ({ delivery, readOnly, setMessages, setEditingDelivery }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const { enqueueSnackbar } = useSnackbar()
  const [deleteDelivery, { isLoading: isDeleting }] =
    useDeleteDeliveryMutation()

  const handleDelete = () => {
    deleteDelivery({ post: { id: delivery.id } }).then((data) => {
      if (data?.error?.status) {
        Object.keys(data.error.data).forEach((key) => {
          setMessages((prev) => [
            ...prev,
            { id: key, variant: 'error', description: data.error.data[key] },
          ])
        })
      } else {
        enqueueSnackbar(
          `Delivery -> ${delivery.name} is deleted successfully!`,
          {
            variant: 'success',
          }
        )
      }
    })
  }
  return (
    <Box
      key={delivery.id}
      className="flex flex-col  w-full  bg-slate-400/10 rounded-lg"
    >
      <Box
        className="flex justify-between items-center p-2 h-10 rounded-t-lg"
        backgroundColor={colors.primary[300]}
      >
        <Typography variant="h5" fontWeight="bold">
          {delivery.name}
        </Typography>
        {!readOnly && (
          <Box className="flex gap-1">
            <IconButton
              color="warning"
              onClick={() => setEditingDelivery(delivery)}
            >
              <EditOutlinedIcon />
            </IconButton>
            <IconButton color="error" onClick={handleDelete}>
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </Box>
        )}
      </Box>
      <CardContent className="flex flex-col items-start gap-4 px-4 py-2">
        <Typography variant="h5" fontWeight="bold">
          <strong>Pricing: </strong>
          {delivery.pricing}
        </Typography>
        <Typography variant="p">{delivery.description}</Typography>
      </CardContent>
    </Box>
  )
}

export default Delivery
