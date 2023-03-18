import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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

import CloseIcon from "@mui/icons-material/Close";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import ProfileCard from "../global/ProfileCard";

import {
  selectWishlists,
  setWishlist,
} from "../../../../../features/services/wishlistReducer";
import { useToggleWishlistMutation } from "../../../../../features/services/wishlistApiSlice";
import { tokens } from "../../../../../theme";
import Header from "../../../../../components/Header";
import { addToCart } from "../../../../../features/services/cartReducer";

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const wishlist = useSelector(selectWishlists);
  const [toggleWishlist] = useToggleWishlistMutation();
  const changeWishlist = (productId) => {
    toggleWishlist({ post: { productId } })
      .unwrap()
      .then((wishlistProducts) => {
        console.log(wishlistProducts);
        dispatch(setWishlist({ products: wishlistProducts }));
      });
  };
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
          <Box className="w-full md:w-[60%] lg:w-[70%]">
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
                    <Box
                      key={ind}
                      className="hover:bg-white/10  ease-in-out px-2"
                    >
                      <Box
                        key={`${item.title}-${item.id}-${ind}`}
                        className="flex justfiy-between items-center gap-2 w-full py-4 h-full"
                      >
                        <Box
                          className="flex xxs:w-full  xxs:flex-col 
                                          sm:w-[40%]  sm:flex-row 
                                          md:w-full md:flex-col 
                                          lg:w-[40%] lg:flex-row 
                                      gap-4 "
                        >
                          <Box>
                            <CardActionArea
                              onClick={() => navigate(`/product/${item.id}`)}
                              className={`${
                                theme.palette.mode === "dark"
                                  ? "bg-white/5"
                                  : "bg-black/5"
                              } bg-opacity-90 p-1 w-[180px] h-[140px] rounded-md flex
                               ease-in-out duration-300`}
                            >
                              <img
                                alt={item?.title}
                                className="w-full h-full rounded-md"
                                src={`${item?.thumbnail}`}
                              />
                            </CardActionArea>
                          </Box>

                          <Box className="flex flex-col justify-center  w-full gap-1">
                            <Typography fontWeight="bold" variant="h2">
                              {item.title}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          className="flex xxs:w-full  xxs:flex-col-reverse 
                                          sm:w-[60%]  sm:flex-row 
                                          md:w-full md:flex-col-reverse 
                                          lg:w-[60%] lg:flex-row 
                                        gap-4"
                        >
                          <Box className="flex gap-4 items-center xxs:justify-between sm:justify-center md:justify-between lg:justify-center w-full">
                            <Typography className="xxs:inline  sm:hidden md:inline lg:hidden">
                              remover from cart:
                            </Typography>
                            <Typography>${item?.price}</Typography>
                          </Box>
                          <Box className="flex gap-4 items-center xxs:justify-between sm:justify-center md:justify-between lg:justify-center w-full">
                            <Typography className="xxs:inline  sm:hidden md:inline lg:hidden">
                              status:
                            </Typography>
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
                          <Box className="flex gap-4 items-center xxs:justify-between sm:justify-center md:justify-between lg:justify-center w-full">
                            <Typography className="xxs:inline  sm:hidden md:inline lg:hidden">
                              Add to cart:
                            </Typography>
                            <IconButton
                              onClick={() => {
                                dispatch(
                                  addToCart({
                                    product: { ...item, count: 1 },
                                  })
                                );
                              }}
                            >
                              <AddShoppingCartIcon />
                            </IconButton>
                          </Box>
                          <Box className="flex gap-4 items-center xxs:justify-between sm:justify-center md:justify-between lg:justify-center w-full">
                            <Typography className="xxs:inline  sm:hidden md:inline lg:hidden">
                              Price:
                            </Typography>
                            <IconButton onClick={() => changeWishlist(item.id)}>
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
            )}
          </Box>

          <Box className="w-full md:w-[40%] lg:w-[30%]">
            <ProfileCard />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Wishlist;
