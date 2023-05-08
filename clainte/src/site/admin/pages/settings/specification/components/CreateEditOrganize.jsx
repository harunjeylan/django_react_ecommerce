import React, { useEffect, useRef } from 'react'
import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import { useTheme } from '@emotion/react'
import { tokens } from '../../../../../../theme'
import { useSnackbar } from 'notistack'
import CloseIcon from '@mui/icons-material/Close'
import SaveAsIcon from '@mui/icons-material/SaveAs'

import {
  useAddOrganizeMutation,
  useDeleteOrganizeMutation,
  useUpdateOrganizeMutation,
} from '../../../../../../features/services/organizeApiSlice'
const Item = ({ item, itemName, handleUpdate, handleDelete }) => {
  const InputRef = useRef()

  useEffect(() => {
    InputRef.current.value = item.name
  }, [item.name])

  return (
    <Box className="flex justify-between items-center gap-2">
      <TextField
        size="small"
        color="secondary"
        fullWidth
        type="text"
        // value={item.value}
        defaultValue={item.name}
        label={itemName}
        inputRef={InputRef}
      />
      <IconButton
        onClick={() =>
          handleUpdate({
            name: itemName,
            id: item.id,
            value: InputRef.current.value,
          })
        }
      >
        <SaveAsIcon />
      </IconButton>
      <IconButton onClick={() => handleDelete({ name: itemName, id: item.id })}>
        <CloseIcon />
      </IconButton>
    </Box>
  )
}
const CreateEditOrganize = ({
  editingOrganize,
  setEditingOrganize,
  setMessages,
  organize,
}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const { enqueueSnackbar } = useSnackbar()
  const [addOrganize] = useAddOrganizeMutation()
  const [updateOrganize] = useUpdateOrganizeMutation()
  const [deleteOrganize] = useDeleteOrganizeMutation()

  const inputRef = useRef()
  const handleCancel = () => {
    setEditingOrganize(undefined)
  }
  const handleAdd = () => {
    const postData = {
      name: editingOrganize,
      label: inputRef.current.value,
    }
    addOrganize({ post: postData }).then((data) => {
      if (data?.error?.status) {
        Object.keys(data.error.data).forEach((key) => {
          setMessages((prev) => [
            ...prev,
            { id: key, variant: 'error', description: data.error.data[key] },
          ])
        })
      } else {
        enqueueSnackbar(
          `${postData.name} -> ${postData.label} is created successfully!`,
          {
            variant: 'success',
          }
        )
      }
    })

    inputRef.current.value = ''
  }
  const handleUpdate = ({ id, name, value }) => {
    const postData = {
      id,
      name,
      label: value,
    }
    updateOrganize({ post: postData }).then((data) => {
      if (data?.error?.status) {
        Object.keys(data.error.data).forEach((key) => {
          setMessages((prev) => [
            ...prev,
            { id: key, organize: 'error', description: data.error.data[key] },
          ])
        })
      } else {
        enqueueSnackbar(
          `${postData.name} -> ${postData.name} is updated successfully!`,
          {
            organize: 'success',
          }
        )
      }
    })
  }
  const handleDelete = ({ id, name }) => {
    const postData = {
      id,
      name,
    }
    deleteOrganize({ post: postData }).then((data) => {
      if (data?.error?.status) {
        Object.keys(data.error.data).forEach((key) => {
          setMessages((prev) => [
            ...prev,
            { id: key, variant: 'error', description: data.error.data[key] },
          ])
        })
      } else {
        enqueueSnackbar(
          `${postData.name} -> ${postData.name} is deleted successfully!`,
          {
            variant: 'success',
          }
        )
      }
    })
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
        Organize
      </Typography>
      <Box className="flex justify-between items-center gap-2 mb-2">
        <TextField
          size="small"
          color="secondary"
          fullWidth
          organize="filled"
          type="text"
          name={editingOrganize}
          label={`New ${editingOrganize}`}
          inputRef={inputRef}
        />
        <IconButton onClick={handleAdd}>
          <SaveAsIcon />
        </IconButton>
      </Box>
      <Divider />
      <Box className="flex flex-col gap-4 mt-4">
        {organize[editingOrganize]?.map((item) => (
          <Item
            key={item.id}
            item={item}
            itemName={editingOrganize}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        ))}
      </Box>
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
  )
}

export default CreateEditOrganize
