import { useEffect, useState } from 'react'
import { useTheme } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Breadcrumbs,
  FormControl,
  FormLabel,
  Collapse,
  Slider,
  useMediaQuery,
  Divider,
  List,
  TextField,
} from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

import Service from '../../../../components/Service'
import Banner from '../../../../components/Banner'
import ProductsList from '../../components/ProductsList'

import { useGetAllOrganizeQuery } from '../../../../features/services/organizeApiSlice'
import {
  useSearchAndFilterProductsQuery,
  useGetRatingsQuery,
} from '../../../../features/services/productApiSlice'

import { useGetAllBrandsQuery } from '../../../../features/services/brandApiSlice'
import { useGetAllVariantsQuery } from '../../../../features/services/variantApiSlice'
import { tokens } from '../../../../theme'
const Shopping = () => {
  const isNoneMobile = useMediaQuery('(min-width:1024px)')
  const [openCategory, setOpenCategory] = useState(false)
  const [openFilter, setOpenFilter] = useState(false)
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  const [price, setPrice] = useState([0, 100])

  const [searchAndFilter, setSearchAndFilter] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [search, setSearch] = useState('')
  const [priceValue, setPriceValue] = useState({ from: 0, to: 0 })
  const [brandValue, setBradValue] = useState([])
  const [ratingValue, setRatingValue] = useState([])
  const [organizeValue, setOrganizeValue] = useState({})
  const [variantsValue, setVariantValue] = useState([])

  const {
    data: searchAndFilterProducts = [],
    isFetching: isFetchingSearchAndFilterProducts,
  } = useSearchAndFilterProductsQuery({
    searchAndFilter,
  })
  const { data: brands, isFetching: isFetchingBrands } = useGetAllBrandsQuery()
  const { data: organize, isFetching: isFetchingOrganize } =
  useGetAllOrganizeQuery()
  const { data: variants, isFetching: isFetchingVariants } =
  useGetAllVariantsQuery()
  const { data: ratings, isFetching: isFetchingRatings } = useGetRatingsQuery()

  const handleCheckBrand = (e) => {
    setBradValue((prevBradValue) => {
      if (e.target.checked) {
        return [...prevBradValue, e.target.value]
      } else {
        return prevBradValue.filter((prevValue) => prevValue !== e.target.value)
      }
    })
  }
  const handleCheckRating = (e) => {
    setRatingValue((prevRatingValue) => {
      if (e.target.checked) {
        return [...prevRatingValue, e.target.value]
      } else {
        return prevRatingValue.filter(
          (prevValue) => prevValue !== e.target.value
        )
      }
    })
  }

  useEffect(() => {
    let timeOut = setTimeout(() => {
      setPriceValue({ from: price[0], to: price[1] })
    }, 2000)
    return () => clearTimeout(timeOut)
  }, [price])

  useEffect(() => {
    let timeOut = setTimeout(() => {
      setSearchValue(search)
    }, 1000)
    return () => clearTimeout(timeOut)
  }, [search])

  useEffect(() => {
    let searchAndFilterValue = '?'
    if (searchValue !== '') {
      searchAndFilterValue = searchAndFilterValue + `search=${searchValue}&`
    }
    if (priceValue.from !== 0 && priceValue.to !== 0) {
      searchAndFilterValue =
        searchAndFilterValue + `price=${priceValue.from}-${priceValue.to}&`
    }
    brandValue.forEach((brand) => {
      if (brand !== '') {
        searchAndFilterValue = searchAndFilterValue + `brand=${brand}&`
      }
    })
    ratingValue.forEach((rating) => {
      if (rating !== '') {
        searchAndFilterValue = searchAndFilterValue + `rating=${rating}&`
      }
    })
    Object.keys(organizeValue).forEach((key) => {
      organizeValue[key].forEach((organize) => {
        if (organize !== '') {
          searchAndFilterValue =
            searchAndFilterValue + `organize=${key}--${organize}&`
        }
      })
    })
    Object.keys(variantsValue).forEach((key) => {
      variantsValue[key].forEach((variant) => {
        if (variant !== '') {
          searchAndFilterValue =
            searchAndFilterValue + `variant=${key}--${variant}&`
        }
      })
    })

    setSearchAndFilter(searchAndFilterValue)
  }, [
    brandValue,
    organizeValue,
    priceValue.from,
    priceValue.to,
    ratingValue,
    searchValue,
    variantsValue,
  ])
  return (
    <Box className={`flex flex-col gap-4 md:gap-8 mt-2`}>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            onClick={() => navigate(`/`)}
            variant="text"
            color="secondary"
          >
            Home
          </Button>
          <Typography color="text.primary">Shopping</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Box
          className={`flex flex-col lg:flex-row space-4 h-full w-full gap-4`}
        >
          <Box
            className={`w-full bg-transparent lg:w-[25%] lg:rounded-lg  h-full `}
          >
            <Box
              backgroundColor={colors.primary[400]}
              className=" w-full rounded-md mb-4"
            >
              <TextField
                variant="outlined"
                color="secondary"
                fullWidth
                placeholder="search.."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
            <Collapse
              in={isNoneMobile || openCategory}
              timeout="auto"
              unmountOnExit
              className={``}
            >
              <Box
                backgroundColor={colors.primary[400]}
                className={` w-full rounded-md lg:mb-4`}
              >
                <Typography
                  variant="h1"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  className={`text-xl md:text-2xl p-4 text-left`}
                >
                  Organizes
                </Typography>
                <Accordion
                  sx={{ backgroundColor: colors.primary[400] }}
                  className="w-full"
                  defaultExpanded={isNoneMobile}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography
                      variant="h4"
                      color={colors.grey[100]}
                      fontWeight="bold"
                      className={`text-lg md:text-xl px-4 text-left`}
                    >
                      Category
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List className={``}>
                      {!isFetchingOrganize &&
                        organize?.categories.map((categorie) => (
                          <FormControlLabel
                            key={categorie.id}
                            value={categorie.name}
                            name="category"
                            onClick={(e) =>
                              handleCheckFilter(e, setOrganizeValue)
                            }
                            control={<Checkbox color="secondary" />}
                            label={categorie.name}
                            labelPlacement="end"
                            className="block ml-4"
                          />
                        ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  sx={{ backgroundColor: colors.primary[400] }}
                  className="w-full"
                  defaultExpanded={isNoneMobile}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography
                      variant="h4"
                      color={colors.grey[100]}
                      fontWeight="bold"
                      className={`text-lg md:text-xl px-4 text-left`}
                    >
                      Collection
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List className={``}>
                      {!isFetchingOrganize &&
                        organize.collections.map((collection) => (
                          <FormControlLabel
                            key={collection.id}
                            value={collection.name}
                            name={'collection'}
                            onClick={(e) =>
                              handleCheckFilter(e, setOrganizeValue)
                            }
                            control={<Checkbox color="secondary" />}
                            label={collection.name}
                            labelPlacement="end"
                            className="block ml-4"
                          />
                        ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  sx={{ backgroundColor: colors.primary[400] }}
                  className="w-full"
                  defaultExpanded={isNoneMobile}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography
                      variant="h4"
                      color={colors.grey[100]}
                      fontWeight="bold"
                      className={`text-lg md:text-xl px-4 text-left`}
                    >
                      Vendor
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List className={``}>
                      {!isFetchingOrganize &&
                        organize.vendors.map((vendor) => (
                          <FormControlLabel
                            key={vendor.id}
                            value={vendor.name}
                            name={'vendor'}
                            onClick={(e) =>
                              handleCheckFilter(e, setOrganizeValue)
                            }
                            control={<Checkbox color="secondary" />}
                            label={vendor.name}
                            labelPlacement="end"
                            className="block ml-4"
                          />
                        ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  sx={{ backgroundColor: colors.primary[400] }}
                  className="w-full"
                  defaultExpanded={isNoneMobile}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography
                      variant="h4"
                      color={colors.grey[100]}
                      fontWeight="bold"
                      className={`text-lg md:text-xl px-4 text-left`}
                    >
                      Tag
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List className={``}>
                      {!isFetchingOrganize &&
                        organize.tags.map((tag) => (
                          <FormControlLabel
                            key={tag.id}
                            value={tag.name}
                            name={'tags'}
                            onClick={(e) =>
                              handleCheckFilter(e, setOrganizeValue)
                            }
                            control={<Checkbox color="secondary" />}
                            label={tag.name}
                            labelPlacement="end"
                            className="block ml-4"
                          />
                        ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Collapse>
            <Collapse
              in={isNoneMobile || openFilter}
              timeout="auto"
              unmountOnExit
              className={``}
            >
              <Box
                backgroundColor={colors.primary[400]}
                className=" w-full rounded-md"
              >
                <Typography
                  variant="h1"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  className={`text-xl md:text-2xl p-4 text-left`}
                >
                  Filter
                </Typography>
                <Divider />
                <Box className={`my-4 w-full px-4`}>
                  <FormControl className={`w-[100%]`}>
                    <FormLabel id="demo-radio-buttons-group-label">
                      <Typography
                        variant="h1"
                        color={colors.grey[100]}
                        fontWeight="bold"
                        className={`text-xl md:text-2xl text-left mb-2`}
                      >
                        Price
                      </Typography>
                    </FormLabel>
                    <Box className={`w-[100%]`}>
                      <Slider
                        mark={[
                          {
                            value: price[0],
                            label: price[0],
                          },
                          {
                            value: `From $${price[1]}`,
                            label: `To $${price[1]}`,
                          },
                        ]}
                        color="secondary"
                        getAriaLabel={() => 'Temperature range'}
                        value={price}
                        onChange={(event, newValue) => setPrice(newValue)}
                        getAriaValueText={(value) => `$${value}`}
                      />
                    </Box>
                  </FormControl>
                </Box>
                <Accordion
                  sx={{ backgroundColor: colors.primary[400] }}
                  className="w-full"
                  defaultExpanded={isNoneMobile}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography
                      variant="h4"
                      color={colors.grey[100]}
                      fontWeight="bold"
                      className={`text-lg md:text-xl px-4 text-left`}
                    >
                      Brands
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box className={`flex flex-col`}>
                      {!isFetchingBrands &&
                        brands.map((brand) => (
                          <FormControlLabel
                            key={brand.id}
                            value={brand.name}
                            name={'brand'}
                            control={
                              <Checkbox
                                // checked={isChecked("brand", brand.name)}
                                color="secondary"
                              />
                            }
                            onChange={handleCheckBrand}
                            label={brand.name}
                            labelPlacement="end"
                            className="block ml-4"
                          />
                        ))}
                    </Box>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  sx={{ backgroundColor: colors.primary[400] }}
                  className="w-full"
                  defaultExpanded={isNoneMobile}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography
                      variant="h4"
                      color={colors.grey[100]}
                      fontWeight="bold"
                      className={`text-lg md:text-xl px-4 text-left`}
                    >
                      Rating
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box className={`flex flex-col w-full`}>
                      {!isFetchingRatings &&
                        ratings?.map((rating) => (
                          <Box
                            key={rating.rating}
                            className={`flex gap-2 w-full items-center`}
                          >
                            <FormControlLabel
                              value={rating.rating}
                              name={'rating'}
                              control={<Checkbox color="secondary" />}
                              onChange={handleCheckRating}
                              label={rating.rating}
                              labelPlacement="end"
                              className="block ml-4 w-20"
                            />
                            <Box
                              backgroundColor={colors.grey[500]}
                              className="w-full h-4 outline-1 flex justify-start items-center rounded-md"
                            >
                              <span
                                style={{ width: `${rating?.average}%` }}
                                className={`py1 bg-yellow-500 h-full rounded-md`}
                              />
                            </Box>
                            <strong>{rating?.total}</strong>
                          </Box>
                        ))}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Box>
              <Box
                backgroundColor={colors.primary[400]}
                className=" w-full rounded-md"
              >
                <Box className={`my-4 w-full`}>
                  <FormControl className={`w-full`}>
                    <FormLabel id="demo-radio-buttons-group-label">
                      <Typography
                        variant="h1"
                        color={colors.grey[100]}
                        fontWeight="bold"
                        className={`text-xl md:text-2xl p-4 text-left`}
                      >
                        Variants
                      </Typography>
                    </FormLabel>
                    <Box className={`w-full flex flex-col`}>
                      {!isFetchingVariants &&
                        variants.map((variantOptions) => (
                          <Accordion
                            key={variantOptions.id}
                            sx={{ backgroundColor: colors.primary[400] }}
                            className="w-full"
                            defaultExpanded={isNoneMobile}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography
                                variant="h4"
                                color={colors.grey[100]}
                                fontWeight="bold"
                                className={`text-lg md:text-xl px-4 text-left`}
                              >
                                {variantOptions.label}
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Box>
                                {variantOptions.options.map((option) => (
                                  <FormControlLabel
                                    key={option.id}
                                    value={option?.label}
                                    name={variantOptions.label}
                                    control={<Checkbox color="secondary" />}
                                    onClick={(e) =>
                                      handleCheckFilter(e, setVariantValue)
                                    }
                                    label={option?.label}
                                    labelPlacement="end"
                                    className="block ml-4"
                                  />
                                ))}
                              </Box>
                            </AccordionDetails>
                          </Accordion>
                        ))}
                    </Box>
                  </FormControl>
                </Box>
              </Box>
            </Collapse>
          </Box>
          <Box className={`w-full lg:w-[75%] h-full`}>
            <Box className={`flex m-4 py-[20px] justify-between`}>
              <Typography
                variant="h1"
                color={colors.grey[100]}
                fontWeight="bold"
                className={`text-xl md:text-2xl  text-left mb-2`}
              >
                Product List
              </Typography>
              {!isNoneMobile && (
                <Box>
                  <Button
                    variant="text"
                    sx={{ color: colors.grey[100] }}
                    endIcon={
                      openCategory ? (
                        <ExpandLess color={colors.grey[100]} />
                      ) : (
                        <ExpandMore color={colors.grey[100]} />
                      )
                    }
                    onClick={() => setOpenCategory(!openCategory)}
                  >
                    Category
                  </Button>
                  <Button
                    variant="text"
                    sx={{ color: colors.grey[100] }}
                    endIcon={
                      openFilter ? (
                        <ExpandLess color={colors.grey[100]} />
                      ) : (
                        <ExpandMore color={colors.grey[100]} />
                      )
                    }
                    onClick={() => setOpenFilter(!openFilter)}
                  >
                    Filter
                  </Button>
                </Box>
              )}
            </Box>
            {!isFetchingSearchAndFilterProducts ? (
              searchAndFilterProducts.length ? (
                <ProductsList
                  products={searchAndFilterProducts}
                  isShopping={true}
                />
              ) : (
                <Box className="flex flex-col gap-4 mt-[10%] justify-center  items-center">
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    className={`text-xl md:text-2xl  `}
                  >
                    No Product found
                  </Typography>
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
      <Box backgroundColor={colors.primary[400]} className={`px-1 md:px-auto`}>
        <Banner />
      </Box>
      <Box className="md:container px-2 md:mx-auto md:px-auto">
        <Service />
      </Box>
    </Box>
  )
}
function handleCheckFilter(e, setfilterValue) {
  setfilterValue((prevFilterValue) => {
    let hasFilterName = e.target.name in prevFilterValue
    let filter = hasFilterName ? prevFilterValue[e.target.name] : []
    let updatedFilter
    if (e.target.name in filter && e.target.checked) {
      updatedFilter = filter
    } else if (!(e.target.name in filter) && e.target.checked) {
      updatedFilter = [...filter, e.target.value]
    } else {
      updatedFilter = filter.filter((prevValue) => prevValue !== e.target.value)
    }
    let updatedFilterValue = {
      ...prevFilterValue,
      [e.target.name]: updatedFilter,
    }
    Object.keys(updatedFilterValue).forEach((key) => {
      !updatedFilterValue[key].length && delete updatedFilterValue[key]
    })
    return updatedFilterValue
  })
}
export default Shopping
