import React from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'
import { useTheme } from '@emotion/react'
import CloseIcon from '@mui/icons-material/Close'
import SaveAsIcon from '@mui/icons-material/SaveAs'
import * as yup from 'yup'
import { tokens } from '../../../../../../theme'

import { Formik } from 'formik'
import { useSnackbar } from 'notistack'
import {
  useAddDeliveryMutation,
  useUpdateDeliveryMutation,
} from '../../../../../../features/services/deliveryApiSlice'

const CreateEditDelivery = ({
  creatingDelivery,
  editingDelivery,
  setCreatingDelivery,
  setEditingDelivery,
  setMessages,
}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const { enqueueSnackbar } = useSnackbar()
  const [addDelivery] = useAddDeliveryMutation()
  const [updateDelivery, { isLoading: isUpdating }] =
    useUpdateDeliveryMutation()

  const discount = creatingDelivery || editingDelivery
  const initialDeliveryValues = discount
  const handleSaveDelivery = (values) => {
    if (creatingDelivery) {
      addDelivery({
        post: values,
      }).then((data) => {
        if (data?.error?.status) {
          Object.keys(data.error.data).forEach((key) => {
            setMessages((prev) => [
              ...prev,
              { id: key, variant: 'error', description: data.error.data[key] },
            ])
          })
        } else {
          enqueueSnackbar(
            `Delivery -> ${values.name} is created successfully!`,
            {
              variant: 'success',
            }
          )
        }
      })
    } else if (editingDelivery) {
      updateDelivery({
        post: values,
      }).then((data) => {
        if (data?.error?.status) {
          Object.keys(data.error.data).forEach((key) => {
            setMessages((prev) => [
              ...prev,
              { id: key, variant: 'error', description: data.error.data[key] },
            ])
          })
        } else {
          enqueueSnackbar(
            `Delivery -> ${values.name} is updated successfully!`,
            {
              variant: 'success',
            }
          )
        }
      })
    }
    setCreatingDelivery(undefined)
    setEditingDelivery(undefined)
  }

  const handleCancel = () => {
    setCreatingDelivery(undefined)
    setEditingDelivery(undefined)
  }
  return (
    <>
      <Formik
        initialValues={initialDeliveryValues}
        validationSchema={newDeliverySchema}
        onSubmit={handleSaveDelivery}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <Box
            borderColor={colors.grey[500]}
            className="flex flex-col gap-4 border p-4 rounded-md"
          >
            <Typography
              variant="h4"
              color={colors.grey[100]}
              fontWeight="bold"
              className={`text-lg md:text-xl text-left`}
            >
              Delivery
            </Typography>
            <TextField
              size="small"
              color="secondary"
              fullWidth
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              label="Name"
              onBlur={handleBlur}
              error={!!touched.name && !!errors.name}
              helperText={touched.name && errors.name}
            />

            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Enter Your Review"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.description}
              name="description"
              error={!!touched.description && !!errors.description}
              helperText={touched.description && errors.description}
              className={`col-span-2`}
              multiline
              minRows={3}
            />

            <TextField
              size="small"
              color="secondary"
              fullWidth
              type="number"
              name="pricing"
              value={values.pricing}
              onChange={handleChange}
              label="Amount"
              onBlur={handleBlur}
              error={!!touched.pricing && !!errors.pricing}
              helperText={touched.pricing && errors.pricing}
            />
            <Box className="flex gap-2">
              <Button
                type="button"
                color="secondary"
                variant="outlined"
                startIcon={<SaveAsIcon />}
                onClick={handleSubmit}
              >
                Save
              </Button>
              <Button
                type="button"
                color="warning"
                variant="outlined"
                startIcon={<CloseIcon />}
                onClick={handleCancel}
              >
                cancel
              </Button>
            </Box>
          </Box>
        )}
      </Formik>
    </>
  )
}
const newDeliverySchema = yup.object().shape({
  name: yup.string().required('require'),
  pricing: yup.number().required('require'),
  description: yup.string().required('require'),
})
export default CreateEditDelivery
