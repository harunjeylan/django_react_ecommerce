import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Divider,
  Box,
  useTheme,
  Breadcrumbs,
  Button,
} from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ProfileCard from "../global/ProfileCard";
import { useGetAllOrdersQuery } from "../../../../../features/services/orderApiSlice";
import { tokens } from "../../../../../theme";
import Header from "../../../../../components/Header";

const OrdersListCustomer = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data: orders, isFetching: isFetchingOrders } = useGetAllOrdersQuery();
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
          <Typography color="text.primary">Order</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header
          title="Your Orders"
          subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt."
        />
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Box className="flex flex-col-reverse  gap-8 md:flex-row">
          <Box className="w-full md:max-w-[60%] lg:max-w-[70%]">
            {!isFetchingOrders && orders?.length ? (
              <Box className="drop-shadow-md">
                <Box className="flex justify-between items-center gap-2 bg-slate-400/10 py-8 mb-4">
                  <Box className="text-center w-full">Order #</Box>
                  <Box className="text-center w-full">Date</Box>
                  <Box className="text-center w-full">Total</Box>
                  <Box className="text-center w-full">Status</Box>
                  <Box className="text-center w-full">Action</Box>
                </Box>

                <Box className="flex flex-col justify-between">
                  {orders?.map((order, ind) => (
                    <Box
                      key={ind}
                      className="hover:bg-white/10 h-[100px] ease-in-out duration-300"
                    >
                      <Box
                        key={`${order.title}-${order.id}-${ind}`}
                        className="flex justify-between items-center gap-2 w-full h-full"
                      >
                        <Box className="text-center w-full">
                          <Typography># {order?.id}</Typography>
                        </Box>
                        <Box className="text-center w-full">
                          <Typography>{order?.date}</Typography>
                        </Box>
                        <Box className="text-center w-full">
                          <Typography>${order?.total_price}</Typography>
                        </Box>
                        <Box className="text-center w-full">
                          <Typography color={colors.greenAccent[500]}>
                            {order?.status === "partially_fulfilled" && (
                              <span className="bg-blue-400/5 text-blue-500 px-2 py-1 rounded-md">
                                {order?.status}
                              </span>
                            )}
                            {order?.status === "pending" && (
                              <span className="bg-yellow-400/5 text-yellow-500 px-2 py-1 rounded-md">
                                {order?.status}
                              </span>
                            )}
                            {order?.status === "complete" && (
                              <span className="bg-green-400/5 text-green-500 px-2 py-1 rounded-md">
                                {order?.status}
                              </span>
                            )}
                            {order?.status === "failed" && (
                              <span className="bg-red-400/5 text-red-500 px-2 py-1 rounded-md">
                                {order?.status}
                              </span>
                            )}
                            {order?.status === "cancelled" && (
                              <span className="bg-red-400/5 text-orange-500 px-2 py-1 rounded-md">
                                {order?.status}
                              </span>
                            )}
                          </Typography>
                        </Box>
                        <Box className="text-center w-full">
                          <Button
                            onClick={() => {
                              navigate(`/profile/orders/${order?.id}`);
                            }}
                            variant="outlined"
                            color="secondary"
                          >
                            VIEW
                          </Button>
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
                  <ShoppingBagOutlinedIcon size="large" className="size-lg" />
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    className={`text-4xl md:text-6xl  `}
                  >
                    Empty Order
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
    </Box>
  );
};

export default OrdersListCustomer;
