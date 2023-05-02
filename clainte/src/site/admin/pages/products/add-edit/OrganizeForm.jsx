import React, { useState, useRef, useEffect } from 'react'
import { useTheme } from '@emotion/react'
import {
  Box,
  TextField,
  MenuItem,
  InputLabel,
  Typography,
  FormControl,
  FormLabel,
  FormGroup,
  Select,
  OutlinedInput,
  Chip,
  Divider,
  IconButton,
} from '@mui/material'
import { useSnackbar } from 'notistack'
import {
  useAddOrganizeMutation,
  useDeleteOrganizeMutation,
  useGetAllOrganizeQuery,
  useUpdateOrganizeMutation,
} from '../../../../../features/services/organizeApiSlice'

import CloseIcon from '@mui/icons-material/Close'
import SaveAsIcon from '@mui/icons-material/SaveAs'
import Model from '../../../../../components/ui/Model'
import { tokens } from '../../../../../theme'
import useAlert from '../../../../../components/ui/useAlert'

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

const OrganizeForm = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [openModel, setOpenModel] = useState(false)
  const [modelTitle, setModelTitle] = useState('')
  const [modelInputLabel, setModelInputLabel] = useState('')
  const { enqueueSnackbar } = useSnackbar()
  const [CustomAlert, setMessages] = useAlert()
  const [addOrganize] = useAddOrganizeMutation()
  const [updateOrganize] = useUpdateOrganizeMutation()
  const [deleteOrganize] = useDeleteOrganizeMutation()
  const { data: organize = {}, isFetching: organizeIsFetching } =
    useGetAllOrganizeQuery()

  const modelInputRef = useRef()
  const handleOpenModel = ({ inputLabel, modelTitle }) => {
    setModelInputLabel(inputLabel)
    setModelTitle(modelTitle)
    setOpenModel(true)
  }
  const handleAdd = () => {
    const postData = {
      name: modelInputLabel,
      label: modelInputRef.current.value,
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

    modelInputRef.current.value = ''
    // setOpenModel(false);
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
            { id: key, variant: 'error', description: data.error.data[key] },
          ])
        })
      } else {
        enqueueSnackbar(
          `${postData.name} -> ${postData.name} is updated successfully!`,
          {
            variant: 'success',
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
    <>
      <Model
        openModel={openModel}
        setOpenModel={setOpenModel}
        modelTitle={modelTitle}
      >
        <Box className="w-full flex flex-col gap-2">
          <CustomAlert />
          <Box className="flex justify-between items-center gap-2 mb-2">
            <TextField
              size="small"
              color="secondary"
              fullWidth
              variant="filled"
              type="text"
              name={modelInputLabel}
              label={modelInputLabel}
              inputRef={modelInputRef}
            />
            <IconButton onClick={handleAdd}>
              <SaveAsIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box className="flex flex-col gap-4 mt-4">
            {!organizeIsFetching &&
              organize[modelInputLabel]?.map((item) => (
                <Item
                  key={item.id}
                  item={item}
                  itemName={modelInputLabel}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                />
              ))}
          </Box>
        </Box>
      </Model>
      <Box
        backgroundColor={colors.primary[400]}
        className="drop-shadow-lg  rounded-lg p-4"
      >
        <FormControl
          className="h-full w-full"
          component="fieldset"
          variant="standard"
        >
          <FormLabel>
            <Typography
              variant="h1"
              color={colors.grey[100]}
              fontWeight="bold"
              className={`text-xl md:text-2xl  text-left my-4`}
            >
              Organize?
            </Typography>
          </FormLabel>
          <FormGroup className="w-full grid grid-cols-2  lg:grid-cols-1 xl:grid-cols-2 gap-2">
            <Box className="w-full">
              <Box className="w-full flex justify-between px-1 gap-2">
                <Typography variant="h6" fontWeight="bold" className="my-2">
                  Category
                </Typography>
                <Typography
                  onClick={() =>
                    handleOpenModel({
                      inputLabel: 'categories',
                      modelTitle: 'Add Category',
                    })
                  }
                  variant="h6"
                  fontWeight="bold"
                  className={`my-2 cursor-pointer hover:text-green-400`}
                  color={colors.blueAccent[400]}
                >
                  More
                </Typography>
              </Box>
              <FormControl variant="filled" className="w-full">
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                  fullWidth
                  color="secondary"
                  labelId="category-select-label"
                  id="categories-select"
                  variant="filled"
                  name="category"
                  value={values?.category}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched?.category && !!errors?.category}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {!organizeIsFetching &&
                    organize?.categories?.map((category) => (
                      <MenuItem key={category.id} value={category.name}>
                        {category.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
            <Box className="w-full">
              <Box className="w-full flex justify-between px-1 gap-2">
                <Typography variant="h6" fontWeight="bold" className="my-2">
                  Vendor
                </Typography>
                <Typography
                  onClick={() =>
                    handleOpenModel({
                      inputLabel: 'vendors',
                      modelTitle: 'Add Vender',
                    })
                  }
                  variant="h6"
                  fontWeight="bold"
                  className={`my-2 cursor-pointer hover:text-green-400`}
                  color={colors.blueAccent[400]}
                >
                  More
                </Typography>
              </Box>
              <FormControl variant="filled" className="w-full">
                <InputLabel id="vendor-select-label">Vendor</InputLabel>
                <Select
                  fullWidth
                  color="secondary"
                  labelId="vendor-select-label"
                  id="vendor-select"
                  variant="filled"
                  name="vendor"
                  value={values?.vendor}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched?.vendor && !!errors?.vendor}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {!organizeIsFetching &&
                    organize?.vendors?.map((vendor) => (
                      <MenuItem key={vendor.id} value={vendor.name}>
                        {vendor.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
            <Box className="w-full">
              <Box className="w-full flex justify-between px-1 gap-2">
                <Typography variant="h6" fontWeight="bold" className="my-2">
                  Collection
                </Typography>
                <Typography
                  onClick={() =>
                    handleOpenModel({
                      inputLabel: 'collections',
                      modelTitle: 'Add Collection',
                    })
                  }
                  variant="h6"
                  fontWeight="bold"
                  className={`my-2 cursor-pointer hover:text-green-400`}
                  color={colors.blueAccent[400]}
                >
                  More
                </Typography>
              </Box>
              <FormControl variant="filled" className="w-full">
                <InputLabel id="collections-select-label">
                  Collection
                </InputLabel>
                <Select
                  fullWidth
                  color="secondary"
                  labelId="collections-select-label"
                  id="collections-select"
                  variant="filled"
                  name="collection"
                  value={values?.collection}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched?.collection && !!errors?.collection}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {!organizeIsFetching &&
                    organize?.collections?.map((collection) => (
                      <MenuItem key={collection.id} value={collection.name}>
                        {collection.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
            <Box className="w-full">
              <Box className="w-full flex justify-between px-1 gap-2 items-center">
                <Typography variant="h6" fontWeight="bold" className="my-2">
                  Tags
                </Typography>

                <Typography
                  onClick={() =>
                    handleOpenModel({
                      inputLabel: 'tags',
                      modelTitle: 'Add Tags',
                    })
                  }
                  variant="subtitle"
                  fontWeight="bold"
                  className={`my-2 cursor-pointer hover:text-green-400`}
                  color={colors.blueAccent[400]}
                >
                  More
                </Typography>
              </Box>
              <FormControl variant="filled" className="w-full">
                <InputLabel id="tags-select-label">Tags</InputLabel>
                <Select
                  fullWidth
                  multiple
                  color="secondary"
                  labelId="tags-select-label"
                  id="tags-select"
                  variant="filled"
                  value={values?.tags}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 0.5,
                      }}
                    >
                      {selected?.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  name="tags"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched?.tags && !!errors?.tags}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {!organizeIsFetching &&
                    organize?.tags?.map((tag) => (
                      <MenuItem key={tag.id} value={tag.name}>
                        {tag.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
          </FormGroup>
        </FormControl>
      </Box>
    </>
  )
}

export default OrganizeForm
