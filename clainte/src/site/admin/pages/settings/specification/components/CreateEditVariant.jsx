import React, { useEffect, useRef } from 'react'
import { Box, Button, Typography, TextField, Divider } from '@mui/material'
import {
  useAddVariantMutation,
  useUpdateVariantMutation,
  useDeleteOptionMutation,
} from '../../../../../../features/services/variantApiSlice'
import CloseIcon from '@mui/icons-material/Close'
import SaveAsIcon from '@mui/icons-material/SaveAs'
import Option from './Option'
import { useTheme } from '@emotion/react'
import { useSnackbar } from 'notistack'
import { tokens } from '../../../../../../theme'

const CreateEditVariant = ({
  creatingVariant,
  editingVariant,
  setCreatingVariant,
  setEditingVariant,
  setMessages,
}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const { enqueueSnackbar } = useSnackbar()

  const variantInputRef = useRef()
  const [addVariant] = useAddVariantMutation()
  const [updateVariant] = useUpdateVariantMutation()

  const [deleteOption] = useDeleteOptionMutation()
  useEffect(() => {
    if (creatingVariant) {
      variantInputRef.current.value = creatingVariant.label
    } else if (editingVariant) {
      variantInputRef.current.value = editingVariant.label
    }
  }, [])
  const handleSaveVariantLabel = () => {
    if (creatingVariant) {
      setCreatingVariant((prev) => ({
        ...prev,
        label: variantInputRef.current.value,
      }))
    } else if (editingVariant) {
      setEditingVariant((prev) => ({
        ...prev,
        label: variantInputRef.current.value,
      }))
    }
  }
  const handleAddOptionLabel = () => {
    if (creatingVariant) {
      setCreatingVariant((prev) => ({
        ...prev,
        options: [
          ...prev.options,
          { label: '', index: prev.options.length + 1 },
        ],
      }))
    } else if (editingVariant) {
      setEditingVariant((prev) => ({
        ...prev,
        options: [
          ...prev.options,
          { label: '', index: prev.options.length + 1 },
        ],
      }))
    }
  }
  const handleUpdateOptionLabel = ({ option, newLabel }) => {
    if (creatingVariant) {
      setCreatingVariant((prev) => {
        let changedOption = prev.options.find(
          (opt) => opt.index === option.index
        )
        let otherOptions = prev.options.filter(
          (opt) => opt.index !== option.index
        )
        return {
          ...prev,
          options: [...otherOptions, { ...changedOption, label: newLabel }],
        }
      })
    } else if (editingVariant) {
      setEditingVariant((prev) => {
        let changedOption = prev.options.find((opt) => {
          if (opt.id && option.id) {
            return opt.id === option.id
          } else if (opt.index && option.index) {
            return opt.index === option.index
          } else {
            return false
          }
        })
        let otherOptions = prev.options.filter((opt) => {
          if (opt.id && option.id) {
            return opt.id !== option.id
          } else if (opt.index && option.index) {
            return opt.index !== option.index
          } else {
            return true
          }
        })
        return {
          ...prev,
          options: [...otherOptions, { ...changedOption, label: newLabel }],
        }
      })
    }
  }
  const handleDeleteOption = ({ variant, option }) => {
    if (creatingVariant) {
      setCreatingVariant((prev) => {
        let otherOptions = prev.options.filter(
          (opt) => opt.index !== option.index
        )
        return {
          ...prev,
          options: otherOptions,
        }
      })
    } else if (editingVariant) {
      if (option.id) {
        deleteOption({
          post: { variantId: editingVariant.id, optionId: option.id },
        }).then((data) => {
          if (data?.error?.status) {
            Object.keys(data.error.data).forEach((key) => {
              setMessages((prev) => [
                ...prev,
                {
                  id: key,
                  variant: 'error',
                  description: data.error.data[key],
                },
              ])
            })
          } else {
            enqueueSnackbar(
              `Variant Option -> ${option.label} is deleted successfully!`,
              {
                variant: 'success',
              }
            )
          }
        })
      }
      setEditingVariant((prev) => {
        let otherOptions = prev.options.filter((opt) => opt.id !== option.id)
        return {
          ...prev,
          options: otherOptions,
        }
      })
    }
  }
  const handleSaveVariant = () => {
    if (creatingVariant) {
      addVariant({ post: creatingVariant }).then((data) => {
        if (data?.error?.status) {
          Object.keys(data.error.data).forEach((key) => {
            setMessages((prev) => [
              ...prev,
              { id: key, variant: 'error', description: data.error.data[key] },
            ])
          })
        } else {
          setCreatingVariant(undefined)
          setEditingVariant(undefined)
          enqueueSnackbar(
            `Variant -> ${creatingVariant.label} is created successfully!`,
            {
              variant: 'success',
            }
          )
        }
      })
    } else if (editingVariant) {
      updateVariant({ post: editingVariant }).then((data) => {
        if (data?.error?.status) {
          Object.keys(data.error.data).forEach((key) => {
            setMessages((prev) => [
              ...prev,
              { id: key, variant: 'error', description: data.error.data[key] },
            ])
          })
        } else {
          setCreatingVariant(undefined)
          setEditingVariant(undefined)
          enqueueSnackbar(
            `Variant -> ${editingVariant.label} is updated successfully!`,
            {
              variant: 'success',
            }
          )
        }
      })
    }
  }

  const handleCancel = () => {
    setCreatingVariant(undefined)
    setEditingVariant(undefined)
  }
  return (
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
        Variant
      </Typography>
      <Box>
        <Typography variant="h5" fontWeight="bold" className="py-2">
          Name
        </Typography>
        <Divider />
        <Box className="flex justify-between items-center gap-2 mb-4">
          <TextField
            size="small"
            color="secondary"
            fullWidth
            variant="filled"
            type="text"
            label="Variant"
            name="variant"
            inputRef={variantInputRef}
            onChange={handleSaveVariantLabel}
            required
          />
        </Box>
        <Divider />
        <Typography variant="h5" fontWeight="bold" className="py-2">
          Options
        </Typography>
        <Box className="flex flex-col gap-4 mb-4">
          {editingVariant &&
            editingVariant?.options?.map((option, index) => (
              <Option
                key={`options-${index}`}
                option={option}
                creatingVariant={creatingVariant}
                editingVariant={editingVariant}
                handleUpdateOptionLabel={handleUpdateOptionLabel}
                handleDeleteOption={handleDeleteOption}
              />
            ))}
          {creatingVariant &&
            creatingVariant?.options?.map((option, index) => (
              <Option
                key={`options-${index}`}
                option={option}
                creatingVariant={creatingVariant}
                editingVariant={editingVariant}
                handleUpdateOptionLabel={handleUpdateOptionLabel}
                handleDeleteOption={handleDeleteOption}
              />
            ))}
          <Box className="flex justify-between items-center gap-2">
            <Button
              fullWidth
              type="button"
              color="secondary"
              variant="outlined"
              className={` mt-4`}
              onClick={handleAddOptionLabel}
            >
              new option
            </Button>
          </Box>
        </Box>
        <Divider />

        <Box className="flex gap-2 mt-4 ">
          <Button
            type="button"
            color="secondary"
            variant="outlined"
            startIcon={<SaveAsIcon />}
            onClick={handleSaveVariant}
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
    </Box>
  )
}
export default CreateEditVariant
