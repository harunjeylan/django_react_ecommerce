import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  Typography,
  Box,
  useTheme,
  Breadcrumbs,
  Button,
  CardActionArea,
  IconButton,
  TextField,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { tokens } from '../../../../../theme'
import Header from '../../../../../components/Header'
import OrderSummery from '../../../../../components/OrderSummery'
import { useGetProductsDetailsQuery } from '../../../../../features/services/productApiSlice'
import {
  decreaseCount,
  increaseCount,
  selectCart,
  setCount,
  setSelectedVariants,
} from '../../../../../features/services/cartReducer'
const CartProduct = ({ item }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const carts = useSelector(selectCart)
  const [productCount, setProductCount] = useState(1)
  const [productVariants, setProductVariants] = useState([])
  const { data: product = {}, isFetching: isFetchingProduct } =
    useGetProductsDetailsQuery({ productId: item.id })

  const findInCart = useMemo(() => {
    return (product) => {
      const itemsFounded = carts?.find(
        (cartProduct) => cartProduct?.id === product?.id
      )
      return itemsFounded
    }
  }, [carts])

  useEffect(() => {
    let productInCart = findInCart(product)
    if (productInCart) {
      setProductCount(productInCart?.count)
      setProductVariants(productInCart?.selectedVariants)
    } else {
      setProductCount(1)
      setProductVariants([])
    }
  }, [findInCart, product, carts, item])

  const handleSetCount = (event) => {
    if (findInCart(product)) {
      dispatch(
        setCount({
          id: product?.id,
          count: event.target.value,
        })
      )
    } else {
      setProductCount(event.target.value)
    }
  }

  const handleChangeVariantOptions = (variantLabel, optionLabel) => {
    if (findInCart(product)) {
      dispatch(
        setSelectedVariants({
          id: product?.id,
          variantLabel,
          optionLabel,
        })
      )
    } else {
      setProductVariants((prev) => {
        let otherOption = prev?.filter(
          (variantOption) => variantOption.variantLabel !== variantLabel
        )
        return [...otherOption, { variantLabel, optionLabel }]
      })
    }
  }
  const getSelectedOption = useMemo(() => {
    return (variantLabel) => {
      let productInCart = findInCart(product)
      if (productInCart && variantLabel) {
        let selectedVariantOption = productInCart.selectedVariants.find(
          (variantOption) => variantOption.variantLabel === variantLabel
        )
        if (selectedVariantOption && selectedVariantOption?.optionLabel) {
          console.log(selectedVariantOption?.optionLabel)
          return selectedVariantOption?.optionLabel
        } else {
          return ''
        }
      }
      return ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product])
  return (
    <Box>
      <Box className="flex flex-col sm:flex-row gap-2 sm:items-center justify-between pb-4">
        <Box className="flex sm:items-center justify-between gap-4">
          <CardActionArea
            onClick={() => navigate(`/product/${product.id}`)}
            className={`${
              theme.palette.mode === 'dark' ? 'bg-white/5' : 'bg-black/5'
            } bg-opacity-90 p-1 w-[260px] h-[200px] rounded-md flex
                        items-center ease-in-out duration-300`}
          >
            <img
              alt={product?.title}
              className="w-full h-full rounded-md"
              src={`${product?.thumbnail}`}
            />
          </CardActionArea>
          <Box>
            <Typography fontWeight="bold" fontSize={20}>
              {product.title}
            </Typography>
            <Typography fontWeight="bold">
              <strong>Price</strong> : ${product?.sale_pricing}
            </Typography>
            <Divider />
            <Box>
              <Typography fontWeight="bold" fontSize={20}>
                Variants
              </Typography>
              {item?.selectedVariants?.map((selectedVariant, index) => (
                <Typography key={index}>
                  <strong>{selectedVariant.variantLabel} : </strong>
                  <span> {selectedVariant.optionLabel} </span>
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>
        <Box>
          <Box className="flex justify-between sm:items-center">
            <Box
              display="flex"
              alignItems="center"
              className="my-2 w-fit"
              border={`1.5px solid ${colors.neutral[500]}`}
            >
              <IconButton
                size="small"
                onClick={() => dispatch(decreaseCount({ id: item.id }))}
              >
                <RemoveIcon />
              </IconButton>
              <TextField
                size="small"
                className="w-[100px]"
                id="outlined-number"
                type="number"
                value={productCount}
                onChange={handleSetCount}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <IconButton
                size="small"
                onClick={() => dispatch(increaseCount({ id: item.id }))}
              >
                <AddIcon />
              </IconButton>
            </Box>
            <IconButton
              onClick={() => dispatch(removeFromCart({ id: product.id }))}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box className="flex flex-col gap-2">
            {!isFetchingProduct &&
              product?.variants?.map((variantOption, index) => (
                <FormControl
                  key={`product-variants-${index}`}
                  variant="filled"
                  className="w-full"
                >
                  <InputLabel id="variants-select-label">
                    {variantOption?.variantLabel}
                  </InputLabel>
                  <Select
                    fullWidth
                    color="secondary"
                    labelId="variants-select-label"
                    id="variants-select"
                    variant="filled"
                    name={variantOption?.variantLabel}
                    defaultValue={getSelectedOption(
                      variantOption?.variantLabel
                    )}
                    onChange={(e) =>
                      handleChangeVariantOptions(
                        variantOption?.variantLabel,
                        e.target.value
                      )
                    }
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {variantOption?.options &&
                      variantOption?.options?.map((option, index) => (
                        <MenuItem
                          key={`option-${option.id}-${index}`}
                          value={option.label}
                        >
                          {option.label}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              ))}
          </Box>
        </Box>
      </Box>
      <Divider />
    </Box>
  )
}
const ViewCart = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.cart)
  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.sale_pricing
  }, 0)

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
          <Typography color="text.primary">View Shoping Cart</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header
          title="Shopping cart"
          subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit,"
        />
      </Box>

      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        {cart.length ? (
          <Box className="flex flex-col gap-8 md:flex-row">
            <Box className="w-full">
              {cart.map((item, ind) => (
                <CartProduct
                  key={`${item.title}-${item.id}-${ind}`}
                  item={item}
                />
              ))}
              <Box className="flex justify-between  py-2">
                <Button
                  onClick={() => navigate(`/shopping`)}
                  variant="outlined"
                  color="secondary"
                  className={` px-[40px] py-4  w-full `}
                >
                  CONTINUE SHOPPING
                </Button>
              </Box>
            </Box>

            <Box className="w-full lg:max-w-[40%] ">
              <OrderSummery totalPrice={totalPrice} />
              <Box className="flex justify-between pt-4 ">
                <Button
                  onClick={() => navigate(`/checkout`)}
                  variant="outlined"
                  color="secondary"
                  className={` px-[40px] py-4 w-full  `}
                >
                  PROCEED TO CHECKOUT
                </Button>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            backgroundColor={colors.primary[400]}
            className={`container mx-auto py-[80px] rounded-lg`}
          >
            <Box className="flex flex-col gap-4 justify-center items-center">
              <Typography
                variant="h2"
                color={colors.grey[100]}
                fontWeight="bold"
                className={`text-4xl md:text-6xl  `}
              >
                Empty Cart
              </Typography>
              <Button
                onClick={() => navigate(`/shopping`)}
                variant="outlined"
                color="secondary"
                className={` px-[40px] py-2 ${
                  'hover:bg-' + colors.greenAccent[400]
                }`}
              >
                Go Shop now
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default ViewCart
