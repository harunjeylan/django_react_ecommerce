import React from "react";
import {
  Typography,
  Divider,
  Box,
  useTheme,
  Breadcrumbs,
  Button,
  CardActionArea,
} from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import Header3 from "../../components/Header3";
import OrderSummery from "../../components/OrderSummery";

import { useSelector } from "react-redux";

import ProfileCard from "./ProfileCard";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import Service from "../../components/Service";

const OderDetails = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.price;
  }, 0);

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
        <Box className={`container mx-auto py-[20px] rounded-lg my-4`}>
          <Header3
            title="Order #1735"
            subtitle="Order #1735 was placed on 22/06/2013 and is currently Being prepared."
            bodyText="If you have any questions, please feel free to contact us, our
            customer service center is working for you 24/7."
          />
        </Box>
      </Box>
      <Box className={`container mx-auto`}>
        <Box className="flex flex-col-reverse  gap-8 md:flex-row">
          <Box className="w-full md:max-w-[60%] lg:max-w-[70%]">
            {cart.length ? (
              <Box className="drop-shadow-md">
                <Box className="flex justfiy-between items-center gap-2 bg-slate-400/10 py-8 mb-4">
                  <Box className="text-center w-[50%]">Item</Box>
                  <Box className="flex justfiy-between items-center w-[50%]">
                    <Box className="text-center w-full">Price</Box>
                    <Box className="text-center w-full">Quantity</Box>
                    <Box className="text-center w-full">Total</Box>
                  </Box>
                </Box>

                <Box className="flex flex-col justfiy-between">
                  {cart.map((item, ind) => (
                    <Box className="hover:bg-white/10  ease-in-out duration-300">
                      <Box
                        key={`${item.title}-${item.id}-${ind}`}
                        className="flex justfiy-between items-center gap-2 w-full h-full py-4"
                      >
                        <Box className="flex justfiy-start gap-4 items-center w-[50%]">
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
                        <Box className="flex justfiy-between items-center w-[50%]">
                          <Box className="text-center w-full">
                            <Typography>${item?.price}</Typography>
                          </Box>
                          <Box className="text-center w-full">
                            <Typography>${item?.count}</Typography>
                          </Box>
                          <Box className="text-center w-full">
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
                  <OrderSummery totalPrice={totalPrice} />
                  <Box className="flex flex-col gap-4 drop-shadow-lg bg-slate-400/10 rounded-lg">
                    <Box
                      className="px-4 py-4 "
                      backgroundColor={colors.primary[400]}
                    >
                      <Typography variant="h5" fontWeight="bold">
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
                  <Box className="flex flex-col gap-4 drop-shadow-lg bg-slate-400/10 rounded-lg">
                    <Box
                      className="px-4 py-4 "
                      backgroundColor={colors.primary[400]}
                    >
                      <Typography variant="h5" fontWeight="bold">
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
        className="px-4 flex justify-center lg:px-auto py-[80px] items-center my-[50px]"
      >
        <Service />
      </Box>
    </Box>
  );
};

export default OderDetails;
