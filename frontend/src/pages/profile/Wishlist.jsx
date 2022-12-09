import React from "react";
import {
  Typography,
  Divider,
  Box,
  useTheme,
  Breadcrumbs,
  Button,
  IconButton,
  CardActionArea,
} from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import Header3 from "../../components/Header3";

import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { addToCart } from "../../redux/services/cartReducer";

import { removeFromWishlist } from "../../redux/services/wishlistReducer";
import ProfileCard from "./ProfileCard";

import Service from "../../components/Service";

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  return (
    <Box className={`flex flex-col gap-4 mt-[100px] `}>
      <Box className={`container mx-auto`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            onClick={() => navigate(`/`)}
            variant="text"
            color="secondary"
            className={` px-4 py-2 ${"hover:bg-" + colors.greenAccent[400]}`}
          >
            Home
          </Button>
          <Typography color="text.primary">Wish List</Typography>
        </Breadcrumbs>
        <Box className={`container mx-auto py-[20px] rounded-lg my-4`}>
          <Header3
            title="Wish List"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt."
          />
        </Box>
      </Box>

      <Box className={`container mx-auto`}>
        <Box className="flex flex-col-reverse  gap-8 md:flex-row">
          <Box className="w-full md:max-w-[60%] lg:max-w-[70%]">
            {wishlist.length ? (
              <Box className="drop-shadow-md">
                <Box className="flex xxs:hidden  sm:flex md:hidden lg:flex  justfiy-between items-center gap-2 bg-slate-400/10 py-8 mb-4">
                  <Box className="text-center w-[40%]">Item</Box>
                  <Box className="flex justfiy-between items-center w-[60%]">
                    <Box className="text-center w-full">Price</Box>
                    <Box className="text-center w-full">Status</Box>
                    <Box className="text-center w-full">Add to cart</Box>
                    <Box className="text-center w-full">Remove</Box>
                  </Box>
                </Box>

                <Box className="flex flex-col justfiy-between">
                  {wishlist.map((item, ind) => (
                    <Box className="hover:bg-white/10  ease-in-out px-2">
                      <Box
                        key={`${item.title}-${item.id}-${ind}`}
                        className="flex justfiy-between items-center gap-2 w-full py-4 h-full"
                      >
                        <Box className="flex xxs:flex-col sm:flex-row w-full md:flex-col lg:flex-row justfiy-start gap-4 lg:items-center">
                          <CardActionArea
                            onClick={() => navigate(`/product/${item.id}`)}
                            className={`${
                              theme.palette.mode === "dark"
                                ? "bg-white/5"
                                : "bg-black/5"
                            } bg-opacity-90 p-1 w-[100px] h-[80px] rounded-md flex
                        items-center ease-in-out duration-300`}
                          >
                            <img
                              alt={item?.title}
                              className="w-[100px] h-[80px] rounded-md"
                              src={`${item?.images[0]}`}
                            />
                          </CardActionArea>
                          <Box className="flex flex-col justfiy-between gap-1">
                            <Typography variant="h5">{item?.title}</Typography>
                            <Typography variant="subtitle2">
                              Size: Large
                            </Typography>
                            <Typography variant="subtitle2">
                              Colour: Green
                            </Typography>
                          </Box>
                        </Box>
                        <Box className="flex justfiy-between items-center w-[60%] xxs:flex-col-reverse xxs:gap-4 xxs:w-[30%] sm:flex-row sm:w-[60%] md:flex-col-reverse md:gap-4 md:w-[30%] lg:flex-row lg:w-[60%]  ">
                          <Box className="text-center w-full">
                            <Typography>${item?.price}</Typography>
                          </Box>
                          <Box className="text-center w-full">
                            <Typography color={colors.greenAccent[500]}>
                              {item?.status === "Being prepared" && (
                                <span className="bg-blue-400/5 text-blue-500 px-2 py-1 rounded-md">
                                  {item?.status}
                                </span>
                              )}

                              {item?.status === "Received" && (
                                <span className="bg-green-400/5 text-green-500 px-2 py-1 rounded-md">
                                  {item?.status}
                                </span>
                              )}
                              {item?.status === "Cancelled" && (
                                <span className="bg-red-400/5 text-red-500 px-2 py-1 rounded-md">
                                  {item?.status}
                                </span>
                              )}
                              <span className="bg-green-400/5 text-green-500 px-2 py-1 rounded-md">
                                In stock
                              </span>
                            </Typography>
                          </Box>
                          <Box className="text-center w-full">
                            <IconButton
                              onClick={() => {
                                dispatch(
                                  addToCart({ product: { ...item, count: 1 } })
                                );
                              }}
                            >
                              <AddShoppingCartIcon />
                            </IconButton>
                          </Box>
                          <Box className="text-center w-full">
                            <IconButton
                              onClick={() =>
                                dispatch(removeFromWishlist({ product: item }))
                              }
                            >
                              <CloseIcon />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                      <Divider />
                    </Box>
                  ))}
                </Box>
              </Box>
            ) : (
              <Box
                backgroundColor={colors.primary[400]}
                className={`container mx-auto py-[80px] rounded-lg`}
              >
                <Box className="flex flex-col gap-4 justify-center items-center">
                  <ShoppingBagOutlinedIcon size="large" className="text-8xl" />
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
                    className={` px-[40px] py-2`}
                  >
                    Go Shop now
                  </Button>
                </Box>
              </Box>
            )}
          </Box>

          <Box className="w-full md:max-w-[40%] lg:max-w-[30%]">
            <ProfileCard />
          </Box>
        </Box>
      </Box>
      <Box
        backgroundColor={colors.primary[400]}
        className="px-4 flex justify-center lg:px-auto py-[80px] items-center my-[50px]"
      >
        <Service />
      </Box>
    </Box>
  );
};

export default Wishlist;
