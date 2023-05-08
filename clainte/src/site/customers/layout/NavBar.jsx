import React, { useEffect, useState } from 'react'
import {
  Box,
  IconButton,
  Button,
  useTheme,
  Typography,
  List,
  useMediaQuery,
  Divider,
  Collapse,
} from '@mui/material'
import { Link } from 'react-router-dom'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import { tokens } from '../../../theme'
import Model from '../../../components/ui/Model'
import { useGetAllOrganizeQuery } from '../../../features/services/organizeApiSlice'
const Navigation = ({ isNoneMobile }) => {
  return (
    <>
      {!isNoneMobile && <Divider className="w-full" />}
      <Box className={`my-2 cursor-pointer hover:text-green-400`}>
        <Link to="/shopping">Shop</Link>
      </Box>
      {!isNoneMobile && <Divider className="w-full" />}
      <Box className={`my-2 cursor-pointer hover:text-green-400`}>
        <Link to="/blogs">Blog</Link>
      </Box>
      {!isNoneMobile && <Divider className="w-full" />}
      <Box className={`my-2 cursor-pointer hover:text-green-400`}>
        <Link to="/about">About Us</Link>
      </Box>
      {!isNoneMobile && <Divider className="w-full" />}
      <Box className={`my-2 cursor-pointer hover:text-green-400`}>
        <Link to="/contact">Contact Us</Link>
      </Box>
      {!isNoneMobile && <Divider className="w-full" />}
      <Box className={`my-2 cursor-pointer hover:text-green-400`}>
        <Link to="/faq">FAQ</Link>
      </Box>
    </>
  )
}
const NavBar = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const isNoneMobile = useMediaQuery('(min-width:768px)')
  const [openNavBar, setOpenNavBar] = useState(false)
  const [openModel, setOpenModel] = useState(false)
  const { data: organize, isFetching: organizeIsFetching } =
    useGetAllOrganizeQuery()
  useEffect(() => {
    if (isNoneMobile) {
      setOpenNavBar(false)
    }
  }, [isNoneMobile])

  return (
    <>
      <Box
        backgroundColor={colors.primary[500]}
        className="flex justify-center items-center w-full h-fit left-0 z-20 drop-shadow-md py-1"
      >
        <Box className="w-full max-w-[90%] m-auto flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6">
          <Box className="w-full md:w-fit mx-4 flex justify-between ">
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<DashboardOutlinedIcon />}
              onClick={() => setOpenModel(true)}
              onMouseOver={() => isNoneMobile && setOpenModel(true)}
            >
              Category
            </Button>
            {!isNoneMobile && (
              <IconButton
                variant="outlined"
                color="secondary"
                onClick={() => setOpenNavBar((prev) => !prev)}
              >
                <DashboardOutlinedIcon />
              </IconButton>
            )}
          </Box>
          {!isNoneMobile && (
            <Collapse
              in={openNavBar}
              timeout="auto"
              unmountOnExit
              className="w-full flex flex-col justify-center items-center gap-2 px-4"
            >
              <Navigation isNoneMobile={isNoneMobile} />
            </Collapse>
          )}
          {isNoneMobile && <Navigation isNoneMobile={isNoneMobile} />}
        </Box>
      </Box>
      <Model
        openModel={openModel}
        setOpenModel={setOpenModel}
        modelTitle="Category"
        width="lg"
      >
        <Box className="w-full  grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-around gap-8">
          <Box className="w-full flex flex-col gap-4  items-center">
            <Typography
              variant="h4"
              color={colors.grey[100]}
              fontWeight="bold"
              className={`text-lg md:text-xl`}
            >
              Category
            </Typography>
            <List className={`w-full grid grid-cols-2 gap-4 `}>
              {!organizeIsFetching &&
                organize?.categories.map(
                  (category, index) =>
                    category.name !== '' && (
                      <Box
                        key={`${category.name}-${index}`}
                        backgroundColor={colors.primary[400]}
                        sx={{
                          border: `1.5px solid ${colors.neutral[500]}`,
                        }}
                        className="flex justify-center items-center p-2 rounded-sm"
                      >
                        <Link to={`/products/filter?category=${category.name}`}>
                          <Typography>{category.name}</Typography>
                        </Link>
                      </Box>
                    )
                )}
            </List>
          </Box>
          <Box className="w-full flex flex-col gap-4  items-center">
            <Typography
              variant="h4"
              color={colors.grey[100]}
              fontWeight="bold"
              className={`text-lg md:text-xl`}
            >
              Collection
            </Typography>
            <List className={`w-full grid grid-cols-2 gap-4 `}>
              {!organizeIsFetching &&
                organize?.collections.map(
                  (collection, index) =>
                    collection.name !== '' && (
                      <Box
                        key={`${collection.name}-${index}`}
                        backgroundColor={colors.primary[400]}
                        sx={{
                          border: `1.5px solid ${colors.neutral[500]}`,
                        }}
                        className="flex justify-center items-center p-2 rounded-sm"
                      >
                        <Link
                          to={`/products/filter?collection=${collection.name}`}
                        >
                          <Typography>{collection.name}</Typography>
                        </Link>
                      </Box>
                    )
                )}
            </List>
          </Box>
          <Box className="w-full flex flex-col gap-4  items-center">
            <Typography
              variant="h4"
              color={colors.grey[100]}
              fontWeight="bold"
              className={`text-lg md:text-xl`}
            >
              Vendor
            </Typography>
            <List className={`w-full grid grid-cols-2 gap-4 `}>
              {!organizeIsFetching &&
                organize?.vendors.map(
                  (vendor, index) =>
                    vendor.name !== '' && (
                      <Box
                        key={`${vendor.name}-${index}`}
                        backgroundColor={colors.primary[400]}
                        sx={{
                          border: `1.5px solid ${colors.neutral[500]}`,
                        }}
                        className="flex justify-center items-center p-2 rounded-sm"
                      >
                        <Link to={`/products/filter?vender=${vendor.name}`}>
                          <Typography>{vendor.name}</Typography>
                        </Link>
                      </Box>
                    )
                )}
            </List>
          </Box>
          <Box className="w-full flex flex-col gap-4  items-center">
            <Typography
              variant="h4"
              color={colors.grey[100]}
              fontWeight="bold"
              className={`text-lg md:text-xl`}
            >
              tags
            </Typography>
            <List className={`w-full grid grid-cols-2 gap-4 `}>
              {!organizeIsFetching &&
                organize?.tags.map(
                  (tag, index) =>
                    tag.name !== '' && (
                      <Box
                        key={`${tag.name}-${index}`}
                        backgroundColor={colors.primary[400]}
                        sx={{
                          border: `1.5px solid ${colors.neutral[500]}`,
                        }}
                        className="flex justify-center items-center p-2 rounded-sm"
                      >
                        <Link to={`/products/filter?tag=${tag.name}`}>
                          <Typography>{tag.name}</Typography>
                        </Link>
                      </Box>
                    )
                )}
            </List>
          </Box>
        </Box>
      </Model>
    </>
  )
}

export default NavBar
