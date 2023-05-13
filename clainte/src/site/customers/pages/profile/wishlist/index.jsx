import React, { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Typography,
  Box,
  useTheme,
  Breadcrumbs,
  Button,
  CircularProgress,
} from '@mui/material'

import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'

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
import { useProductColumns } from '../../../../../components/dataGridColumns/useProductColumns'

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

  const productColumns = useProductColumns()
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
