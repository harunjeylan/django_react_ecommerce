import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import {
  Box,
  Button,
  Typography,
  Breadcrumbs,
  useTheme,
  CircularProgress,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from '@mui/material'

import {
  useChangeMultiProductsDiscountMutation,
  useDeleteMultiProductsMutation,
  useDeleteProductMutation,
  useGetProductsForAdminQuery,
} from '../../../../../features/services/productApiSlice'
import Header from '../../../../../components/Header'
import { tokens } from '../../../../../theme'
import Model from '../../../../../components/ui/Model'
import DiscountList from '../../settings/specification/components/DiscountList'
import { useGetAllDiscountsQuery } from '../../../../../features/services/discountApiSlice'
import CreateEditDiscount from '../../settings/specification/components/CreateEditDiscount'
import { useSnackbar } from 'notistack'
const ProductsForAdmin = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [openModel, setOpenModel] = useState(false)
  const [rowSelectionModel, setRowSelectionModel] = useState([])
  const [selectedAction, setSelectedAction] = useState('')
  const [editingDiscount, setEditingDiscount] = useState(undefined)
  const [creatingDiscount, setCreatingDiscount] = useState(undefined)
  const [selectedDiscountId, setSelectedDiscountId] = useState(null)
  const { data: productsData, isFetching: isFetchingProductsData } =
    useGetProductsForAdminQuery()
  const { data: discounts = [], isFetching: discountsIsFetching } =
    useGetAllDiscountsQuery({ limit: null })
  const [deleteProduct] = useDeleteProductMutation()
  const [deleteMultiProducts] = useDeleteMultiProductsMutation()
  const [changeMultiProductsDiscount] = useChangeMultiProductsDiscountMutation()
  const handleAction = () => {
    if (rowSelectionModel.length) {
      if (selectedAction === 'delete') {
        deleteMultiProducts({ post: { productIds: rowSelectionModel } }).then(
          (data) => {
            if (!data?.error?.status) {
              setOpenModel(false)
              setEditingDiscount(undefined)
              setCreatingDiscount(undefined)
              setSelectedDiscountId(null)
              enqueueSnackbar(`Products was deleted  successfully!`, {
                variant: 'success',
              })
            }
          }
        )
      } else if (selectedAction === 'change discount') {
        setOpenModel(true)
      }
    }
  }
  const handleAddDiscount = () => {
    setCreatingDiscount({
      name: '',
      amount: 0,
      start_date: null,
      end_date: null,
    })
    setEditingDiscount(undefined)
  }
  const handelDelete = (id) => {
    deleteProduct({ post: { id } }).then((data) => {
      if (!data?.error?.status) {
        setOpenModel(false)
        setEditingDiscount(undefined)
        setCreatingDiscount(undefined)
        setSelectedDiscountId(null)
        enqueueSnackbar(`Product is deleted  successfully!`, {
          variant: 'success',
        })
      }
    })
  }
  const handleChangeMultiProductsDiscount = () => {
    changeMultiProductsDiscount({
      post: { productIds: rowSelectionModel, discountId: selectedDiscountId },
    }).then((data) => {
      if (!data?.error?.status) {
        setOpenModel(false)
        setEditingDiscount(undefined)
        setCreatingDiscount(undefined)
        setSelectedDiscountId(null)
        enqueueSnackbar(`Products Discount is changed  successfully!`, {
          variant: 'success',
        })
      }
    })
  }
  const handleSetDiscount = (discountId) => {
    setSelectedDiscountId(discountId)
  }
  const columns = [
    {
      field: 'id',
      headerName: 'Product',
      width: 100,
      renderCell: ({ row: { id } }) => {
        return (
          <Link to={`/admin/products/${id}`}>
            <Typography
              className="cursor-pointer"
              color={colors.greenAccent[500]}
            >
              # {id}
            </Typography>
          </Link>
        )
      },
    },
    {
      field: 'title',
      headerName: 'Product Name',
      editable: true,
      width: 300,
      renderCell: ({ row: { id, title, thumbnail } }) => {
        return (
          <Box className="flex gap-4 items-center py-2 w-full h-full">
            <Link to={`/admin/products/${id}`}>
              <img
                style={{ backgroundColor: colors.primary[400] }}
                className="h-[60px] w-[60px] pointer rounded-md border-[1px]"
                src={thumbnail}
                alt={`${title}`}
              />
            </Link>
            <Link to={`/admin/products/${id}`}>
              <Typography color={colors.greenAccent[500]}>
                {title?.slice(0, 25)}
              </Typography>
            </Link>
          </Box>
        )
      },
    },
    {
      field: 'sale_pricing',
      headerName: 'Pricing',
      editable: true,
      renderCell: ({ row: { sale_pricing } }) => {
        return <Typography>{sale_pricing}</Typography>
      },
    },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'collection', headerName: 'Collection', width: 150 },
    { field: 'vendor', headerName: 'Vendor', width: 150 },
    { field: 'brand', headerName: 'Brand', width: 150 },
    { field: 'date', headerName: 'Date', width: 200 },
    {
      field: 'discount',
      headerName: 'Discount',
      width: 200,
      renderCell: ({ row: { discount } }) => {
        return discount ? (
          <Box className="flex flex-col">
            <Typography variant="p">
              <strong>Name: {discount?.name}</strong>
            </Typography>
            <Typography variant="p">
              <strong>Discount: </strong>
              {discount?.amount}%
            </Typography>
            <Typography variant="p">
              <strong>Date: from </strong>
              {discount?.start_date}
              <strong> to </strong>
              {discount?.end_date}
            </Typography>
          </Box>
        ) : (
          <Typography variant="p">
            <strong>No Discount</strong>
          </Typography>
        )
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 360,
      renderCell: ({ row: { id } }) => {
        return (
          <Box className="flex gap-4 items-center py-2 w-full h-full">
            <Link to={`/admin/products/${id}/edit`}>
              <Button color="secondary" variant="outlined">
                edit
              </Button>
            </Link>
            <Button
              onClick={() => handelDelete(id)}
              color="error"
              variant="outlined"
            >
              Delete
            </Button>
          </Box>
        )
      },
    },
  ]
  return (
    <Box className={`flex flex-col gap-4 md:gap-8 md:mt-20 mb-10`}>
      <Model
        width="md"
        openModel={openModel}
        setOpenModel={setOpenModel}
        modelTitle={'Discount'}
      >
        {openModel && (
          <>
            <>
              {creatingDiscount || editingDiscount ? (
                <CreateEditDiscount
                  creatingDiscount={creatingDiscount}
                  setCreatingDiscount={setCreatingDiscount}
                  editingDiscount={editingDiscount}
                  setEditingDiscount={setEditingDiscount}
                />
              ) : !discountsIsFetching ? (
                <DiscountList
                  discounts={[
                    {
                      name: 'None',
                      id: null,
                      amount: 0,
                      start_date: 'null',
                      end_date: 'null',
                    },
                    ...discounts,
                  ]}
                  setEditingDiscount={setEditingDiscount}
                  handleAddDiscount={handleAddDiscount}
                  handleSetDiscount={handleSetDiscount}
                  highlightDiscountId={selectedDiscountId}
                />
              ) : (
                <Box className="h-full w-full flex justify-center items-center">
                  <CircularProgress />
                </Box>
              )}
              <Button
                onClick={handleChangeMultiProductsDiscount}
                type="button"
                color="secondary"
                variant="outlined"
                className={`w-full mt-4`}
              >
                Change Products Discount
              </Button>
            </>
          </>
        )}
      </Model>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            onClick={() => navigate(`/`)}
            variant="text"
            color="secondary"
          >
            Admin Dashboard
          </Button>
          <Typography color="text.primary">New Product</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header title="Products" subtitle="welcome to you Products" />
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Box
          backgroundColor={colors.primary[400]}
          className="h-[80vh] rounded-lg p-4"
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: 'none',
            },
            '& .MuiCheckbox-root': {
              color: `${colors.greenAccent[200]} !important`,
            },
            '& .MuiChackbox-root': {
              color: `${colors.greenAccent[200]} !important`,
            },
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: 'none',
            },
            '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          <Box className="flex gap-4 w-fit mb-4 items-center">
            <Typography>Action: </Typography>
            <FormControl size="small" className="w-60" fullWidth>
              <InputLabel id="demo-simple-select-label">option</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                color="secondary"
                variant="outlined"
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'delete'}>delete</MenuItem>
                <MenuItem value={'change discount'}>change discount</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              size="medium"
              color="secondary"
              onClick={handleAction}
            >
              Go
            </Button>
          </Box>
          {!isFetchingProductsData ? (
            productsData?.length ? (
              <DataGrid
                density="comfortable"
                rows={productsData.map((product) => ({
                  ...product,
                  action: `action-${product.id}`,
                }))}
                columns={columns}
                autoPageSize
                checkboxSelection
                components={{ Toolbar: GridToolbar }}
                onRowSelectionModelChange={(newRowSelectionModel) => {
                  setRowSelectionModel(newRowSelectionModel)
                }}
                rowSelectionModel={rowSelectionModel}
              />
            ) : (
              <Box className="w-full flex items-center justify-center h-full min-h-40">
                <Typography>No data</Typography>
              </Box>
            )
          ) : (
            <Box className="w-full flex items-center justify-center h-full min-h-40">
              <CircularProgress color="secondary" />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default ProductsForAdmin
