import React, { useEffect, useMemo, useState } from 'react'
import {
  Box,
  CardActionArea,
  Button,
  Typography,
  Tabs,
  Tab,
  CircularProgress,
  Chip,
  Divider,
  IconButton,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material'
import Header from './Header'
import { useTheme } from '@emotion/react'
import { tokens } from '../theme'
import { Link, useNavigate } from 'react-router-dom'
import {
  useAddProductReviewMutation,
  useGetProductsDetailsQuery,
} from '../features/services/productApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useToggleWishlistMutation } from '../features/services/wishlistApiSlice'
import {
  selectWishlists,
  setWishlist,
} from '../features/services/wishlistReducer'
import {
  decreaseCount,
  increaseCount,
  selectCart,
  setCount,
  setSelectedVariants,
  toggleCart,
} from '../features/services/cartReducer'
import { selectCurrentUser } from '../features/auth/authSlice'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import ProductRating from './ProductRating'
import Reviews from './Reviews'
import ReviewForm from './ReviewForm'
const ProductDetails = ({ productId, isAdminPage }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [value, setValue] = useState('addition-information')
  const user = useSelector(selectCurrentUser)
  const wishlist = useSelector(selectWishlists)
  const carts = useSelector(selectCart)
  const [productCount, setProductCount] = useState(1)
  const [productVariants, setProductVariants] = useState([])
  const [addProductReview] = useAddProductReviewMutation()
  const [toggleWishlist] = useToggleWishlistMutation()

  const { data: product = {}, isFetching: isFetchingProduct } =
    useGetProductsDetailsQuery({ productId })

  const [activeImage, setActiveImage] = useState(product?.thumbnail)
  const handleReviewFormSubmit = (values, { resetForm }) => {
    addProductReview({ post: values, productId }).then(() => resetForm())
  }

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
    <>
      <Box>
        <Header
          title={`Product details`}
          subtitle={`Product ID : ${productId}`}
        />
      </Box>

      <Box>
        <Box className={`flex flex-col gap-4 lg:gap-10 lg:flex-row`}>
          <Box className=" w-full">
            <Box className={`w-full flex flex-col-reverse lg:flex-row gap-8`}>
              <Box
                // className={`w-full flex flex-row-wrap lg:flex-col gap-4 my-4 justify-center items-center lg:w-[120px] px-auto`}
                className={`w-fit grid grid-cols-5 lg:grid-cols-2 h-fit lg:w-fit justify-center gap-4 lg:gap-6  px-auto`}
              >
                <CardActionArea
                  onClick={() => setActiveImage(product?.thumbnail)}
                  sx={{
                    border:
                      activeImage === product?.thumbnail
                        ? `1.5px solid ${colors.neutral[500]}`
                        : 'none',
                  }}
                  className={`${
                    theme.palette.mode === 'dark' ? 'bg-white/5' : 'bg-black/5'
                  } h-[60px] w-[60px] bg-opacity-90 p-1  rounded-md  ease-in-out duration-300 `}
                >
                  <img
                    alt="product"
                    src={product?.thumbnail}
                    className={`rounded-md h-full w-full`}
                  />
                </CardActionArea>
                {product?.images?.map((image, index) => (
                  <CardActionArea
                    key={`images-${index}`}
                    sx={{
                      border:
                        activeImage === image?.image
                          ? `1.5px solid ${colors.neutral[500]}`
                          : 'none',
                    }}
                    onClick={() => setActiveImage(image?.image)}
                    className={`${
                      theme.palette.mode === 'dark'
                        ? 'bg-white/5'
                        : 'bg-black/5'
                    } h-[60px] w-[60px] bg-opacity-90 p-1  rounded-md  ease-in-out duration-300 `}
                  >
                    <img
                      alt="product"
                      src={image?.image}
                      className={` rounded-md h-full w-full`}
                    />
                  </CardActionArea>
                ))}
              </Box>
              <Box className={`w-full  overflow-hidden`}>
                <img
                  alt="product thumbnail"
                  style={{
                    objectFit: 'cover',
                    backgroundAttachment: 'fixed',
                  }}
                  src={activeImage}
                  className={`w-full  max-h-[600px] rounded-md mx-auto`}
                />
              </Box>
            </Box>
            <Box className=" w-full flex flex-col gap-4 my-16">
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
                  <Box className="w-full flex justify-between ">
                    <Typography>
                      <strong>Brand</strong>
                    </Typography>
                    <Typography>{product?.brand?.name}</Typography>
                  </Box>
                  <Divider className="w-full" />
                  {product?.organize?.category?.name && (
                    <>
                      <Box className="w-full flex justify-between ">
                        <Typography>
                          <strong>category</strong>
                        </Typography>
                        <Typography>
                          {product?.organize?.category?.name}
                        </Typography>
                      </Box>
                      <Divider className="w-full" />
                    </>
                  )}
                  {product?.organize?.collection?.name && (
                    <>
                      <Box className="w-full flex justify-between ">
                        <Typography>
                          <strong>collection</strong>
                        </Typography>
                        <Typography>
                          {product?.organize?.collection?.name}
                        </Typography>
                      </Box>
                      <Divider className="w-full" />
                    </>
                  )}
                  {product?.organize?.vendor?.name && (
                    <>
                      <Box className="w-full flex justify-between ">
                        <Typography>
                          <strong>vendor</strong>
                        </Typography>
                        <Typography>
                          {product?.organize?.vendor?.name}
                        </Typography>
                      </Box>
                      <Divider className="w-full" />
                    </>
                  )}
                  {product?.organize?.tags?.length ? (
                    <>
                      <Box className="w-full flex justify-between">
                        <Typography>
                          <strong>tags</strong>
                        </Typography>
                        <Box className="flex gap-2 flex-wrap justify-end">
                          {product?.organize?.tags?.map((tag, index) => (
                            <Box
                              key={`tag-${tag.id}-${index}`}
                              backgroundColor={colors.primary[400]}
                              sx={{
                                border: `1.5px solid ${colors.neutral[500]}`,
                              }}
                              className="flex justify-center items-center p-1 rounded-sm"
                            >
                              <Link to={`/products/filter?tag=${tag.name}`}>
                                <Typography>{tag?.name}</Typography>
                              </Link>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                      <Divider className="w-full" />
                    </>
                  ) : undefined}
                </Box>
              </Box>

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
            </Box>
          </Box>
          <Box className={`w-full flex flex-col gap-4`}>
            <Typography
              variant="h1"
              color={colors.grey[100]}
              fontWeight="bold"
              className={`text-2xl md:text-4xl h-fit`}
            >
              {product?.title}
            </Typography>
            <Box className="flex  items-sm-center justify-between mb-4 h-fit">
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
            <Typography variant="body2" className={`w-full px-auto  h-fit`}>
              {product?.description}
            </Typography>

            <Box className="w-full flex flex-col gap-4 justify-start">
              <Box className="w-full">
                <Typography
                  variant="h1"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  className={`text-xl md:text-2xl  text-left my-4`}
                >
                  Variant
                </Typography>
                <Box className="flex flex-col gap-4 w-full">
                  {!isFetchingProduct && isAdminPage ? (
                    <Box className="flex gap-6 w-full">
                      {!isFetchingProduct ? (
                        product.variants?.map((variant, index) => (
                          <Box
                            className="flex flex-col gap-2"
                            key={`variant-${variant.name}-variants-${variant.id}-${index}`}
                          >
                            <Box className="w-full flex  items-center">
                              <Box className="">
                                <Typography variant="h5" fontWeight="bold">
                                  {variant.variantLabel}
                                </Typography>
                              </Box>
                            </Box>
                            <Box className="flex flex-col gap-2">
                              {variant?.options?.map((option, index2) => (
                                <Chip
                                  size="small"
                                  key={`variant-${option.label}-options-${option.id}-${index2}`}
                                  label={option.label}
                                />
                              ))}
                            </Box>
                          </Box>
                        ))
                      ) : (
                        <Box className="w-full flex items-center justify-center h-full min-h-40">
                          <CircularProgress color="secondary" />
                        </Box>
                      )}
                    </Box>
                  ) : (
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
                    ))
                  )}
                  {!isAdminPage && (
                    <Box
                      display="flex"
                      alignItems="center"
                      className="w-fit my-2"
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
                  )}
                </Box>
              </Box>
            </Box>
            {!isAdminPage && (
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
            )}
            <Box className=" w-full gap-8"></Box>
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
            <Tab label="Additional Information" value="addition-information" />
            <Tab label="Reviews" value="reviews" />
          </Tabs>
          <Box className="flex flex-wrap gap-4  mt-8">
            {value === 'reviews' && (
              <Box className={`flex flex-col gap-4 w-fit max-w-2xl`}>
                {product?.reviews?.map((review, index) => (
                  <Reviews key={`reviews-${index}`} review={review} />
                ))}
                {!isAdminPage && (
                  <ReviewForm handleReviewFormSubmit={handleReviewFormSubmit} />
                )}
              </Box>
            )}
            {value === 'addition-information' && (
              <div
                style={{ color: colors.neutral[400] }}
                className={`w-full prose lg:prose-xl `}
                dangerouslySetInnerHTML={{
                  __html: product?.additional_information,
                }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default ProductDetails
