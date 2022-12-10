import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Divider,
  Box,
  useTheme,
  Breadcrumbs,
  Button,
  CardActionArea,
} from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import ProfileCard from "../global/ProfileCard";
import Service from "../../../components/Service";

import { OrderSummery, Header, tokens } from "../../../import";

const OderDetails = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.price;
  }, 0);

  return (
    <Box className={`flex flex-col gap-4 md:gap-8 mt-20 md:mt-40`}>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            onClick={() => navigate(`/`)}
            variant="text"
            color="secondary"
            className={` px-4 py-2 ${"hover:bg-" + colors.greenAccent[400]}`}
          >
            Home
          </Button>
          <Button
            onClick={() => navigate(`/orders`)}
            variant="text"
            color="secondary"
            className={` px-4 py-2 ${"hover:bg-" + colors.greenAccent[400]}`}
          >
            orders
          </Button>
          <Typography color="text.primary">Order #1735</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header
          title="Order #1735"
          subtitle="Order #1735 was placed on 22/06/2013 and is currently Being prepared."
        />
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Box className="flex flex-col-reverse  gap-8 md:flex-row">
          <Box className="w-full md:max-w-[60%] lg:max-w-[70%]">
            {cart.length ? (
              <Box className="drop-shadow-md">
                <Box className="flex xxs:hidden  sm:flex md:hidden lg:flex  justfiy-between items-center gap-2 bg-slate-400/10 py-8 mb-4">
                  <Box className="text-center w-[40%]">Item</Box>
                  <Box className="flex justfiy-between items-center w-[60%]">
                    <Box className="text-center w-full">Price</Box>
                    <Box className="text-center w-full">Quantity</Box>
                    <Box className="text-center w-full">Total</Box>
                  </Box>
                </Box>

                <Box className="flex flex-col justfiy-between">
                  {cart.map((item, ind) => (
                    <Box key={ind} className="hover:bg-white/10  ease-in-out">
                      <Box
                        key={`${item.title}-${item.id}-${ind}`}
                        className="flex justfiy-between items-center gap-2 w-full h-full py-4"
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
                                items-center ease-in-out duration-300`}
                            >
                              <img
                                alt={item?.title}
                                className="w-full h-full rounded-md"
                                src={`${item?.images[0]}`}
                              />
                            </CardActionArea>
                          </Box>

                          <Box className="flex flex-col justfiy-between gap-1 w-[50%]">
                            <Typography variant="h5">{item?.title}</Typography>
                            <Typography variant="subtitle2">
                              Size: Large
                            </Typography>
                            <Typography variant="subtitle2">
                              Colour: Green
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          className="flex xxs:w-full  xxs:flex-col 
                                          sm:w-[60%]  sm:flex-row 
                                          md:w-full md:flex-col 
                                          lg:w-[60%] lg:flex-row 
                                        gap-4"
                        >
                          <Box className="flex gap-4 items-center xxs:justify-between sm:justify-center md:justify-between lg:justify-center w-full">
                            <Typography className="xxs:inline  sm:hidden md:inline lg:hidden">
                              price:
                            </Typography>
                            <Typography>${item?.price}</Typography>
                          </Box>
                          <Box className="flex gap-4 items-center xxs:justify-between sm:justify-center md:justify-between lg:justify-center w-full">
                            <Typography className="xxs:inline  sm:hidden md:inline lg:hidden">
                              Quantity:
                            </Typography>
                            <Typography>${item?.count}</Typography>
                          </Box>
                          <Box className="flex gap-4 items-center xxs:justify-between sm:justify-center md:justify-between lg:justify-center w-full">
                            <Typography className="xxs:inline  sm:hidden md:inline lg:hidden">
                              Total:
                            </Typography>
                            <Typography>
                              ${item?.price * item?.count}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Divider />
                    </Box>
                  ))}
                </Box>
                <Box className="flex flex-col lg:flex-row justify-between gap-4 py-2 mt-4">
                  <Box className="w-full">
                    <OrderSummery totalPrice={totalPrice} />
                  </Box>
                  <Box className="w-full">
                    <Box
                      backgroundColor={colors.primary[400]}
                      className="flex flex-col gap-4 drop-shadow-lg  rounded-lg"
                    >
                      <Box className="px-4 py-4 ">
                        <Typography
                          variant="h1"
                          color={colors.grey[100]}
                          fontWeight="bold"
                          className={`text-xl md:text-2xl  text-left my-4`}
                        >
                          Invoice address
                        </Typography>
                      </Box>

                      <Box className="flex flex-col gap-4 px-4 py-2">
                        <Typography variant="h5" fontWeight="bold">
                          John Brown
                        </Typography>
                        <Typography variant="h5" fontWeight="bold">
                          13/25 New Avenue
                        </Typography>
                        <Typography variant="h5" fontWeight="bold">
                          New Heaven
                        </Typography>
                        <Typography variant="h5" fontWeight="bold">
                          45Y 73J
                        </Typography>
                        <Typography variant="h5" fontWeight="bold">
                          England
                        </Typography>
                        <Typography variant="h5" fontWeight="bold">
                          Great Britain
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box className="w-full">
                    <Box
                      backgroundColor={colors.primary[400]}
                      className="flex flex-col gap-4 drop-shadow-lg  rounded-lg"
                    >
                      <Box className="px-4 py-4 ">
                        <Typography
                          variant="h1"
                          color={colors.grey[100]}
                          fontWeight="bold"
                          className={`text-xl md:text-2xl  text-left my-4`}
                        >
                          Invoice address
                        </Typography>
                      </Box>
                      <Box className="flex flex-col gap-4 px-4 py-2">
                        <Typography variant="h5" fontWeight="bold">
                          John Brown
                        </Typography>
                        <Typography variant="h5" fontWeight="bold">
                          13/25 New Avenue
                        </Typography>
                        <Typography variant="h5" fontWeight="bold">
                          New Heaven
                        </Typography>
                        <Typography variant="h5" fontWeight="bold">
                          45Y 73J
                        </Typography>
                        <Typography variant="h5" fontWeight="bold">
                          England
                        </Typography>
                        <Typography variant="h5" fontWeight="bold">
                          Great Britain
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box
                backgroundColor={colors.primary[400]}
                className={`container mx-auto py-[80px] rounded-lg`}
              >
                <Box className="flex flex-col gap-4 justify-center items-center">
                  <ShoppingBagOutlinedIcon size="large" className="size-lg" />
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
                      "hover:bg-" + colors.greenAccent[400]
                    }`}
                  >
                    Go Shop now
                  </Button>
                </Box>
              </Box>
            )}
          </Box>

          <Box className="w-full md:max-w-[40%] lg:max-w-[30%] ">
            <ProfileCard />
          </Box>
        </Box>
      </Box>

      <Box
        backgroundColor={colors.primary[400]}
        className="px-2 md:px-4 flex justify-center lg:px-auto py-[80px] items-center my-[50px]"
      >
        <Service />
      </Box>
    </Box>
  );
};

export default OderDetails;
