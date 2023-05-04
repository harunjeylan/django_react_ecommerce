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
        backgroundColor={colors.primary[400]}
        className="flex justify-center items-center w-full h-fit left-0 z-20 drop-shadow-md py-1"
      >
        <Box className="w-full max-w-[90%] m-auto flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6">
          <Box className="w-full md:w-fit mx-4 flex justify-between ">
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<DashboardOutlinedIcon />}
              onClick={() => setOpenModel(true)}
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
        width="md"
      >
        <Box className="w-full flex-col md:flex-row gap-16">
          <Box className="flex flex-col gap-4">
            <Typography
              variant="h4"
              color={colors.grey[100]}
              fontWeight="bold"
              className={`text-lg md:text-xl`}
            >
              Category
            </Typography>
            <List className={`flex flex-col gap-4 mx-1`}>
              {!organizeIsFetching &&
                organize?.categories.map((category, index) => (
                  <Typography key={index}>{category.name}</Typography>
                ))}
            </List>
          </Box>
          <Box className="flex flex-col gap-4">
            <Typography
              variant="h4"
              color={colors.grey[100]}
              fontWeight="bold"
              className={`text-lg md:text-xl`}
            >
              Category
            </Typography>
            <List className={`flex flex-col gap-4 mx-1`}>
              {!organizeIsFetching &&
                organize?.categories.map((category, index) => (
                  <Typography key={index}>{category.name}</Typography>
                ))}
            </List>
          </Box>
          <Box className="flex flex-col gap-4">
            <Typography
              variant="h4"
              color={colors.grey[100]}
              fontWeight="bold"
              className={`text-lg md:text-xl`}
            >
              Collection
            </Typography>
            <List className={`flex flex-col gap-4 mx-1`}>
              {!organizeIsFetching &&
                organize?.collections.map((collection, index) => (
                  <Typography key={index}>{collection.name}</Typography>
                ))}
            </List>
          </Box>
          <Box className="flex flex-col gap-4">
            <Typography
              variant="h4"
              color={colors.grey[100]}
              fontWeight="bold"
              className={`text-lg md:text-xl`}
            >
              Vendor
            </Typography>
            <List className={`flex flex-col gap-4 mx-1`}>
              {!organizeIsFetching &&
                organize?.vendors.map((vendor, index) => (
                  <Typography key={index}>{vendor.name}</Typography>
                ))}
            </List>
          </Box>
          <Box className="flex flex-col gap-4">
            <Typography
              variant="h4"
              color={colors.grey[100]}
              fontWeight="bold"
              className={`text-lg md:text-xl`}
            >
              tags
            </Typography>
            <List className={`flex flex-col gap-4 mx-1`}>
              {!organizeIsFetching &&
                organize?.tags.map((tag, index) => (
                  <Typography key={index}>{tag.name}</Typography>
                ))}
            </List>
          </Box>
        </Box>
      </Model>
    </>
  )
}

export default NavBar
