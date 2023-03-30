import React, { useState } from "react";
import {
  Box,
  Button,
  Popover,
  useTheme,
  Typography,
  List,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import { tokens } from "../../../theme";
import Model from "../../../components/ui/Model";
import { useGetAllOrganizeQuery } from "../../../features/services/organizeApiSlice";
const NavBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openModel, setOpenModel] = useState(false);
  const { data: organize, isFetching: organizeIsFetching } =
    useGetAllOrganizeQuery();
  return (
    <>
      <Box
        backgroundColor={colors.primary[400]}
        className="flex justify-center items-center w-full h-[40px] left-0 z-20 drop-shadow-md"
      >
        <Box className="flex justify-between items-center gap-6">
          <Box className="mx-4">
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<DashboardOutlinedIcon />}
              onClick={() => setOpenModel(true)}
            >
              Category
            </Button>
          </Box>
          <Box className={`my-2 cursor-pointer hover:text-green-400`}>
            <Link to="/shopping">Shop</Link>
          </Box>
          <Box className={`my-2 cursor-pointer hover:text-green-400`}>
            <Link to="/blogs">Blog</Link>
          </Box>
          <Box className={`my-2 cursor-pointer hover:text-green-400`}>
            <Link to="/about">About Us</Link>
          </Box>
          <Box className={`my-2 cursor-pointer hover:text-green-400`}>
            <Link to="/contact">Contact Us</Link>
          </Box>
          <Box className={`my-2 cursor-pointer hover:text-green-400`}>
            <Link to="/faq">FQA</Link>
          </Box>
        </Box>
      </Box>
      <Model
        openModel={openModel}
        setOpenModel={setOpenModel}
        modelTitle="Category"
        width="md"
      >
        <Box className="w-full flex gap-16">
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
  );
};

export default NavBar;
