import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Divider,
  Box,
  useTheme,
  Breadcrumbs,
  Button,
  CardActionArea,
  CircularProgress,
} from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useGetOrderDetailesQuery } from "../../../../../features/services/orderApiSlice";
import ProfileCard from "../global/ProfileCard";
import { tokens } from "../../../../../theme";
import Header from "../../../../../components/Header";
import OrderSummery from "../../../../../components/OrderSummery";

const OrderDetailsCustomer = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { orderId } = useParams();
  const { data: order, isFetching: isFetchingOrder } = useGetOrderDetailesQuery(
    { orderId: orderId }
  );
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
          <Typography color="text.primary">Order {orderId}</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header
          title={`Order #${orderId}`}
          subtitle={`Order #${orderId} was placed on ${order?.date} and is currently Being ${order?.fulfillment_status}.`}
        />
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Box className="flex flex-col-reverse  gap-8 md:flex-row">
          <Box className="w-full md:max-w-[60%] lg:max-w-[70%]">
            {!isFetchingOrder ? (
              order?.products?.length ? (
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
                    {order?.products?.map((item, ind) => (
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
                                  src={`${item?.thumbnail}`}
                                />
                              </CardActionArea>
                            </Box>

                            <Box className="flex flex-col justify-center  gap-1 w-[50%]">
                              <Typography fontWeight="bold" variant="h2">
                                {item.title}
                              </Typography>
                              {item?.variants?.map((variant, index) => (
                                <Typography key={index}>
                                  <strong>{variant.variantLabel} : </strong>
                                  <span> {variant.optionLabel} </span>,
                                </Typography>
                              ))}
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
                              <Typography>${item?.sale_pricing}</Typography>
                            </Box>
                            <Box className="flex gap-4 items-center xxs:justify-between sm:justify-center md:justify-between lg:justify-center w-full">
                              <Typography className="xxs:inline  sm:hidden md:inline lg:hidden">
                                Quantity:
                              </Typography>
                              <Typography>{item?.count}</Typography>
                            </Box>
                            <Box className="flex gap-4 items-center xxs:justify-between sm:justify-center md:justify-between lg:justify-center w-full">
                              <Typography className="xxs:inline  sm:hidden md:inline lg:hidden">
                                Total:
                              </Typography>
                              <Typography>
                                ${item?.sale_pricing * item?.count}
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
                      <OrderSummery totalPrice={order?.total_price} />
                    </Box>
                    <Box className="w-full">
                      <Box
                        backgroundColor={colors.primary[400]}
                        className="flex flex-col gap-4 drop-shadow-lg  rounded-lg py-2"
                      >
                        <Box className="px-4 pt-2 ">
                          <Typography
                            variant="h1"
                            color={colors.grey[100]}
                            fontWeight="bold"
                            className={`text-xl md:text-2xl  text-left`}
                          >
                            Billing Address
                          </Typography>
                        </Box>
                        <Divider />
                        <Box className="flex flex-col gap-4 px-4 py-2">
                          <Typography variant="h5" fontWeight="bold">
                            {order?.billing_address?.first_name}{" "}
                            {order?.billing_address?.last_name}
                          </Typography>
                          <Typography variant="h5" fontWeight="bold">
                            {order?.billing_address?.email}
                          </Typography>
                          <Typography variant="h5" fontWeight="bold">
                            {order?.billing_address?.phone_number}
                          </Typography>
                          <Typography variant="h5" fontWeight="bold">
                            {order?.billing_address?.street1}
                            {order?.billing_address?.street2 &&
                              ` or ${order?.billing_address?.street2}`}
                          </Typography>
                          <Typography variant="h5" fontWeight="bold">
                            {order?.billing_address?.city}
                          </Typography>
                          <Typography variant="h5" fontWeight="bold">
                            {order?.billing_address?.state}
                          </Typography>
                          <Typography variant="h5" fontWeight="bold">
                            {order?.billing_address?.country}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box className="w-full">
                      <Box
                        backgroundColor={colors.primary[400]}
                        className="flex flex-col gap-4 drop-shadow-lg  rounded-lg py-2"
                      >
                        <Box className="px-4 pt-2 ">
                          <Typography
                            variant="h1"
                            color={colors.grey[100]}
                            fontWeight="bold"
                            className={`text-xl md:text-2xl  text-left`}
                          >
                            Shipping Address
                          </Typography>
                        </Box>
                        <Divider />
                        <Box className="flex flex-col gap-4 px-4 py-2">
                          <Typography variant="h5" fontWeight="bold">
                            {order?.shipping_address?.first_name}{" "}
                            {order?.shipping_address?.last_name}
                          </Typography>
                          <Typography variant="h5" fontWeight="bold">
                            {order?.shipping_address?.email}
                          </Typography>
                          <Typography variant="h5" fontWeight="bold">
                            {order?.shipping_address?.phone_number}
                          </Typography>
                          <Typography variant="h5" fontWeight="bold">
                            {order?.shipping_address?.street1}
                            {order?.billing_address?.street2 &&
                              ` or ${order?.billing_address?.street2}`}
                          </Typography>
                          <Typography variant="h5" fontWeight="bold">
                            {order?.shipping_address?.city}
                          </Typography>
                          <Typography variant="h5" fontWeight="bold">
                            {order?.shipping_address?.state}
                          </Typography>
                          <Typography variant="h5" fontWeight="bold">
                            {order?.shipping_address?.country}
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
                      No Product Found
                    </Typography>
                    <Button
                      onClick={() => navigate(`/shopping`)}
                      variant="outlined"
                      color="secondary"
                      className={` px-[40px] py-2 ${
                        "hover:bg-" + colors.greenAccent[400]
                      }`}
                    >
                      Go Bay now
                    </Button>
                  </Box>
                </Box>
              )
            ) : (
              <Box className="w-full flex items-center justify-center h-40">
                <CircularProgress color="secondary" />
              </Box>
            )}
          </Box>

          <Box className="w-full md:max-w-[40%] lg:max-w-[30%] ">
            <ProfileCard />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderDetailsCustomer;
