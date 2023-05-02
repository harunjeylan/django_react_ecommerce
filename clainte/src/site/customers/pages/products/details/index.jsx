import React, { useState, useEffect, useMemo } from 'react'
import { useTheme } from '@emotion/react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  Box,
  CardActionArea,
  Button,
  Typography,
  Breadcrumbs,
  Tabs,
  Tab,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Chip,
  Divider,
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'

import Service from '../../../../../components/Service'
import Subscribe from '../../../components/Subscribe'

import {
  useAddProductReviewMutation,
  useGetProductsDetailsQuery,
} from '../../../../../features/services/productApiSlice'
import {
  selectWishlists,
  setWishlist,
} from '../../../../../features/services/wishlistReducer'
import { useToggleWishlistMutation } from '../../../../../features/services/wishlistApiSlice'
import {
  decreaseCount,
  increaseCount,
  selectCart,
  setCount,
  setSelectedVariants,
  toggleCart,
} from '../../../../../features/services/cartReducer'
import RelatedProducts from './RelatedProducts'
import { tokens } from '../../../../../theme'
import { selectCurrentUser } from '../../../../../features/auth/authSlice'
import Header from '../../../../../components/Header'
import Reviews from '../../../../../components/Reviews'
import ReviewForm from '../../../../../components/ReviewForm'
import ProductRating from '../../../../../components/ProductRating'

const ProductDetails = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const { productId } = useParams()
  const [value, setValue] = useState('description')
  const [productCount, setProductCount] = useState(1)
  const [productVariants, setProductVariants] = useState([])
  const carts = useSelector(selectCart)
  const wishlist = useSelector(selectWishlists)
  const [toggleWishlist] = useToggleWishlistMutation()
  const [addProductReview] = useAddProductReviewMutation()

  const handleReviewFormSubmit = (values, { resetForm }) => {
    addProductReview({ post: values, productId }).then(() => resetForm())
  }

  const { data: product, isFetching: isFetchingProduct } =
    useGetProductsDetailsQuery({ productId })

  const [activeImage, setActiveImage] = useState(product?.thumbnail)

  const findInCart = useMemo(() => {
    return (product) => {
      const itemsFounded = carts?.find(
        (cartProduct) => cartProduct?.id === product?.id
      )
      return itemsFounded
    }
  }, [carts])

  const findInWishlist = useMemo(() => {
    return (product) => {
      if (user && !isFetchingProduct) {
        const itemsFounded = wishlist?.find(
          (wishlistProduct) => wishlistProduct.id === product.id
        )
        return itemsFounded
      }
    }
  }, [isFetchingProduct, user, wishlist])

  useEffect(() => {
    setActiveImage(product?.thumbnail)
  }, [product?.thumbnail])

  useEffect(() => {
    let productInCart = findInCart(product)
    if (productInCart) {
      setProductCount(productInCart?.count)
      setProductVariants(productInCart?.selectedVariants)
    } else {
      setProductCount(1)
      setProductVariants([])
    }
  }, [findInCart, product, carts, productId])
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

  const handleIncreaseCount = () => {
    if (findInCart(product)) {
      dispatch(increaseCount({ id: product?.id }))
    } else {
      setProductCount((prev) => prev + 1)
    }
  }
  const handleDecreaseCount = () => {
    if (findInCart(product)) {
      dispatch(decreaseCount({ id: product?.id }))
    } else {
      setProductCount((prev) => {
        if (prev < 1) {
          return 1
        } else {
          return prev - 1
        }
      })
    }
  }
  const changeCart = () => {
    dispatch(
      toggleCart({
        product: {
          ...product,
          count: productCount,
          selectedVariants: productVariants,
        },
      })
    )
  }
  const changeWishlist = () => {
    if (user) {
      toggleWishlist({ post: { productId: product.id } })
        .unwrap()
        .then((wishlistProducts) => {
          dispatch(setWishlist({ products: wishlistProducts }))
        })
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
          <Button
            onClick={() => navigate(`/shopping`)}
            variant="text"
            color="secondary"
            className={`bg-opacity-0 hover:bg-opacity-100 px-4 py-2 ${
              'hover:bg-' + colors.greenAccent[400]
            }`}
          >
            shopping
          </Button>
          <Typography color="text.primary">{product?.title}</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header
          title={`Product details`}
          subtitle={`Product ID : ${productId}`}
        />
      </Box>

      <Box className="md:container px-2 md:mx-auto md:px-auto">
        <Box className={`flex flex-col gap-8 lg:flex-row-reverse`}>
          <Box className={``}>
            <Typography
              variant="h1"
              color={colors.grey[100]}
              fontWeight="bold"
              className={`text-2xl md:text-4xl`}
            >
              {product?.title}
            </Typography>
            <Box className="flex  items-sm-center justify-between mb-4">
              <Typography
                variant="h4"
                color={colors.grey[100]}
                className="text-md flex gap-4"
              >
                <s className="me-2 mr-1">${product?.regular_pricing}</s>
                <strong>${product?.sale_pricing}</strong>
              </Typography>
              {product?.discount && (
                <Box className="">
                  <Chip
                    sx={{
                      color: colors.grey[100],
                      backgroundColor: colors.greenAccent[700],
                    }}
                    color="success"
                    size="large"
                    label={`${product?.discount?.amount}% off`}
                  />
                </Box>
              )}
            </Box>
            <Typography variant="body2" className={`w-full px-auto  my-auto`}>
              Samsa was a travelling salesman - and above it there hung a
              picture that he had recently cut out of an illustrated magazine
              and housed in a nice, gilded frame.
            </Typography>
            <Box className=" w-full mt-4 flex justify-between p-4 gap-4 md:gap-16">
              <Box className=" w-full">
                <Box className=" w-full flex flex-col gap-4">
                  <Typography
                    variant="h1"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    className={`text-xl md:text-2xl  text-left my-4`}
                  >
                    Organize
                  </Typography>
                  <Divider className="w-full" />
                  <Box className="w-full flex flex-col gap-4 justify-start">
                    <Box className="w-full flex justify-between px-2">
                      <Typography>
                        <strong>Brand</strong>
                      </Typography>
                      <Typography>{product?.brand?.name}</Typography>
                    </Box>
                    <Divider className="w-full" />

                    {product?.organize?.category?.name && (
                      <Box className="w-full flex justify-between px-2">
                        <Typography>
                          <strong>category</strong>
                        </Typography>
                        <Typography>
                          {product?.organize?.category?.name}
                        </Typography>
                      </Box>
                    )}
                    <Divider className="w-full" />
                    {product?.organize?.collection?.name && (
                      <Box className="w-full flex justify-between px-2">
                        <Typography>
                          <strong>collection</strong>
                        </Typography>
                        <Typography>
                          {product?.organize?.collection?.name}
                        </Typography>
                      </Box>
                    )}
                    <Divider className="w-full" />
                    {product?.organize?.vendor?.name && (
                      <Box className="w-full flex justify-between px-2">
                        <Typography>
                          <strong>vendor</strong>
                        </Typography>
                        <Typography>
                          {product?.organize?.vendor?.name}
                        </Typography>
                      </Box>
                    )}
                    <Divider className="w-full" />
                    {product?.organize?.tags?.length ? (
                      <Box className="w-full flex justify-between px-2">
                        <Typography>
                          <strong>tags</strong>
                        </Typography>
                        <Box className="flex gap-2">
                          {product?.organize?.tags?.map((tag, index) => (
                            <Chip
                              key={`tag-${tag.id}-${index}`}
                              label={tag?.name}
                            ></Chip>
                          ))}
                        </Box>
                      </Box>
                    ) : undefined}
                  </Box>
                  <Divider className="w-full" />
                </Box>
              </Box>
              <Box className="flex flex-col gap-4 justify-start w-fit">
                <Box>
                  <Typography
                    variant="h1"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    className={`text-xl md:text-2xl  text-left my-4`}
                  >
                    Variant
                  </Typography>
                  <Box className="flex flex-col gap-4 w-full">
                    {!isFetchingProduct &&
                      product?.variants?.map((variantOption, index) => (
                        <FormControl
                          key={index}
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
                            {variantOption?.options &&
                              variantOption?.options?.map((option) => (
                                <MenuItem key={option.id} value={option.label}>
                                  {option.label}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      ))}
                    <Box
                      display="flex"
                      alignItems="center"
                      className="my-2"
                      border={`1.5px solid ${colors.neutral[500]}`}
                    >
                      <IconButton size="large" onClick={handleDecreaseCount}>
                        <RemoveIcon />
                      </IconButton>
                      <TextField
                        id="outlined-number"
                        type="number"
                        value={productCount}
                        onChange={handleSetCount}
                      />
                      <IconButton size="large" onClick={handleIncreaseCount}>
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className=" w-full gap-8">
              <Box className=" w-full">
                <Typography
                  variant="h1"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  className={`text-xl md:text-2xl  text-left my-4`}
                >
                  Rating
                </Typography>
                <Box className="flex flex-col gap-4 justify-start w-full">
                  {!isFetchingProduct ? (
                    <ProductRating product={product} />
                  ) : (
                    <Box className="w-full flex items-center justify-center h-full min-h-40">
                      <CircularProgress color="secondary" />
                    </Box>
                  )}
                </Box>
              </Box>
              <Box className=" w-full flex flex-col gap-4">
                <Typography
                  variant="h1"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  className={`text-xl md:text-2xl  text-left mt-6`}
                >
                  Action
                </Typography>

                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  size="large"
                  startIcon={
                    findInCart(product) ? (
                      <RemoveShoppingCartIcon />
                    ) : (
                      <AddShoppingCartIcon />
                    )
                  }
                  onClick={changeCart}
                >
                  {findInCart(product) ? 'Remove from Cart' : 'Add to Cart'}
                </Button>
                {user && (
                  <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    size="large"
                    startIcon={
                      findInWishlist(product) ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderOutlinedIcon />
                      )
                    }
                    onClick={changeWishlist}
                  >
                    {findInWishlist(product)
                      ? 'Remove from wishlist'
                      : 'Add to wishlist'}
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
          <Box
            className={`w-full flex flex-col-reverse lg:flex-row gap-4 lg:max-w-[50%]`}
          >
            <Box
              className={`w-full flex flex-row-wrap lg:flex-col gap-4 my-4 justify-center items-center lg:w-[120px] px-auto`}
            >
              <CardActionArea
                onClick={() => setActiveImage(product?.thumbnail)}
                className={`${
                  theme.palette.mode === 'dark' ? 'bg-white/5' : 'bg-black/5'
                } ${
                  activeImage === product?.thumbnail
                    ? 'h-[80px] w-[80px]'
                    : 'h-[70px] w-[70px]'
                } bg-opacity-90 p-1  rounded-md  ease-in-out duration-300 `}
              >
                <img
                  alt="product"
                  src={product?.thumbnail}
                  className={` rounded-md h-[100%] w-[100%]`}
                />
              </CardActionArea>
              {product?.images?.map((image, index) => (
                <CardActionArea
                  key={index}
                  onClick={() => setActiveImage(image?.image)}
                  className={`${
                    theme.palette.mode === 'dark' ? 'bg-white/5' : 'bg-black/5'
                  } ${
                    activeImage === image?.image
                      ? 'h-[80px] w-[80px]'
                      : 'h-[70px] w-[70px]'
                  } bg-opacity-90 p-1  rounded-md  ease-in-out duration-300 `}
                >
                  <img
                    alt="product"
                    src={image?.image}
                    className={` rounded-md h-[100%] w-[100%]`}
                  />
                </CardActionArea>
              ))}
            </Box>
            <Box className={`my-4 w-full  overflow-hidden`}>
              <img
                alt="product thumbnail"
                style={{
                  objectFit: 'cover',
                  backgroundAttachment: 'fixed',
                }}
                src={activeImage}
                className={` max-w-[600px] max-h-[600px] rounded-md mx-auto`}
              />
            </Box>
          </Box>
        </Box>
        <Box className={`w-full`}>
          <Tabs
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue)
            }}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab label="Description" value="description" />
            <Tab label="Additional Information" value="addition-information" />
            <Tab label="Reviews" value="reviews" />
          </Tabs>
          <Box className="flex flex-wrap gap-4  mt-8">
            {value === 'description' && (
              <div
                style={{ color: colors.neutral[400] }}
                className={`w-full prose lg:prose-xl `}
                dangerouslySetInnerHTML={{ __html: product?.description }}
              />
            )}
            {value === 'reviews' && (
              <Box className={`flex flex-col gap-4 w-fit max-w-2xl`}>
                {product?.reviews?.map((review, index) => (
                  <Reviews key={`reviews-${index}`} review={review} />
                ))}
                <ReviewForm handleReviewFormSubmit={handleReviewFormSubmit} />
              </Box>
            )}
            {value === 'addition-information' && (
              <Box>addition-information</Box>
            )}
          </Box>
        </Box>
      </Box>
      <RelatedProducts productId={productId} />
      <Box
        backgroundColor={colors.primary[400]}
        className="px-2 md:px-4 flex justify-center lg:px-auto py-[80px] items-center mb-[50px]"
      >
        <Service />
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Box className="max-w-lg mx-auto flex justify-between items-center gap-4">
          <Subscribe />
        </Box>
      </Box>
    </Box>
  )
}

export default ProductDetails
