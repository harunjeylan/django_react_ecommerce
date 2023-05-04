import React, { useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
  Typography,
  Box,
  useTheme,
  Breadcrumbs,
  Button,
  CircularProgress,
  Checkbox,
  IconButton,
} from '@mui/material'

import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'

import ProfileCard from '../global/ProfileCard'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import {
  selectWishlists,
  setWishlist,
} from '../../../../../features/services/wishlistReducer'
import {
  useGetWishlistQuery,
  useToggleWishlistMutation,
} from '../../../../../features/services/wishlistApiSlice'
import { tokens } from '../../../../../theme'
import Header from '../../../../../components/Header'
import {
  selectCart,
  toggleCart,
} from '../../../../../features/services/cartReducer'
import { selectCurrentUser } from '../../../../../features/auth/authSlice'
import CloseIcon from '@mui/icons-material/Close'

const Wishlist = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const theme = useTheme()
  const user = useSelector(selectCurrentUser)
  const colors = tokens(theme.palette.mode)
  const wishlist = useSelector(selectWishlists)
  const carts = useSelector(selectCart)
  const { data: wishlists, isFetching: isFetchingWishlists } =
    useGetWishlistQuery()
  const [toggleWishlist] = useToggleWishlistMutation()

  const changeWishlist = (productId) => {
    toggleWishlist({ post: { productId } })
      .unwrap()
      .then((wishlistProducts) => {
        dispatch(setWishlist({ products: wishlistProducts }))
      })
  }

  const findInCart = useMemo(() => {
    return (product) => {
      const itemsFounded = carts?.find(
        (cartProduct) => cartProduct?.id === product?.id
      )
      return !(itemsFounded === undefined)
    }
  }, [carts])

  const changeCart = (product, setIsInCart) => {
    dispatch(
      toggleCart({
        product: { ...product, count: 1, selectedVariants: [] },
      })
    )
    setIsInCart(findInCart(product))
  }

  const productColumns = [
    {
      field: 'title',
      headerName: 'Product Name',
      width: 250,
      height: 200,
      renderCell: ({ row: { id, title, thumbnail } }) => {
        return (
          <Box className="flex gap-4 items-center py-2 w-full h-full">
            <Link to={`/product/${id}`}>
              <img
                style={{ backgroundColor: colors.primary[400] }}
                className="h-[60px] w-[60px] pointer rounded-md border-[1px]"
                src={thumbnail}
                alt={`${title}`}
              />
            </Link>
            <Link to={`/product/${id}`}>
              <Typography color={colors.greenAccent[500]}>{title}</Typography>
            </Link>
          </Box>
        )
      },
    },
    { field: 'category', headerName: 'Category', width: 100 },
    { field: 'collection', headerName: 'Collection', width: 100 },

    {
      field: 'sale_pricing',
      headerName: 'pricing',
      renderCell: ({ row: { sale_pricing } }) => {
        return <Typography>{sale_pricing}</Typography>
      },
    },

    { field: 'brand', headerName: 'Brand', width: 100 },
    {
      field: 'cart',
      headerName: 'Cart',
      width: 100,
      renderCell: ({ row: { id } }) => {
        const [isInCart, setIsInCart] = useState(false)
        const product = wishlists.find((product) => product.id === id)
        useEffect(() => {
          setIsInCart(findInCart(product))
        }, [carts, findInCart, product])
        return (
          <Box className="mx-auto">
            <Checkbox
              color="secondary"
              inputProps={{ 'aria-label': 'Checkbox demo' }}
              icon={<AddShoppingCartIcon color={colors.grey[100]} />}
              checkedIcon={<RemoveShoppingCartIcon color={colors.grey[100]} />}
              checked={isInCart}
              onChange={() => changeCart(product, setIsInCart)}
            />
          </Box>
        )
      },
    },
    {
      field: 'wishlist',
      headerName: 'Remove',
      renderCell: ({ row: { id } }) => {
        return (
          <Box className="mx-auto">
            <IconButton color="error" onClick={() => changeWishlist(id)}>
              <CloseIcon />
            </IconButton>
          </Box>
        )
      },
    },
  ]
  return (
    <Box className={`flex flex-col gap-4 md:gap-8 mt-20 md:mt-40`}>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            onClick={() => navigate(`/`)}
            variant="text"
            color="secondary"
          >
            Home
          </Button>
          <Typography color="text.primary">Wish List</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header title="Wish List" subtitle="Lorem ipsum dolor sit amet" />
      </Box>

      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Box className="flex flex-col-reverse  gap-8 md:flex-row">
          <Box
            className="w-full md:w-[60%] lg:w-[70%] h-[400px]"
            height="400px"
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
              '& .MuiDataGrid-cell': {
                width: '100%',
              },
            }}
          >
            {!isFetchingWishlists ? (
              wishlists?.length ? (
                <DataGrid
                  density="comfortable"
                  rows={wishlists.map((product) => ({
                    ...product,
                    wishlist: product.id,
                    cart: product.id,
                  }))}
                  columns={productColumns}
                  autoPageSize
                  components={{ Toolbar: GridToolbar }}
                />
              ) : (
                <Box
                  backgroundColor={colors.primary[400]}
                  className={`container mx-auto py-[80px] rounded-lg`}
                >
                  <Box className="flex flex-col gap-4 justify-center items-center">
                    <ShoppingBagOutlinedIcon
                      size="large"
                      className="text-8xl"
                    />
                    <Typography
                      variant="h2"
                      color={colors.grey[100]}
                      fontWeight="bold"
                      className={`text-4xl md:text-6xl  `}
                    >
                      Empty List
                    </Typography>
                    <Button
                      onClick={() => navigate(`/shopping`)}
                      variant="outlined"
                      color="secondary"
                      className={` px-[40px] py-2`}
                    >
                      Go Shop now
                    </Button>
                  </Box>
                </Box>
              )
            ) : (
              <Box className="w-full flex items-center justify-center h-full min-h-40">
                <CircularProgress color="secondary" />
              </Box>
            )}
          </Box>

          <Box className="w-full md:w-[40%] lg:w-[30%]">
            <ProfileCard />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Wishlist
