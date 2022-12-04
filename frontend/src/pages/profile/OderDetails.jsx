import React from "react";
import {
  Typography,
  Divider,
  Box,
  useTheme,
  Breadcrumbs,
  Button,
  IconButton,
  TextField,
  CardActionArea,
} from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import Header2 from "../../components/Header2";

import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ProfileCard from "./ProfileCard";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";

import {
  decreaseCount,
  setCount,
  increaseCount,
  removeFromCart,
} from "../../redux/services/cartReducer";
import Service from "../../components/Service";

import { DataGrid } from "@mui/x-data-grid";

const OderDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNoneMobile = useMediaQuery("(min-width:768px)");

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
        <Box
          backgroundColor={colors.primary[400]}
          className={`container mx-auto py-[80px] rounded-lg my-4`}
        >
          <Header2
            title="Order #1735"
            bodyText="Order #1735 was placed on 22/06/2013 and is currently Being prepared."
          />
          <Typography variant="p">
            If you have any questions, please feel free to contact us, our
            customer service center is working for you 24/7.
          </Typography>
        </Box>
      </Box>
      <Box className={`container mx-auto`}>
        <Box className="flex flex-col-reverse  gap-8 lg:flex-row">
          <Box className="w-full lg:max-w-[60%]">
            {cart.length ? (
              <>
                <Box className="flex justfiy-between items-center gap-2 bg-slate-400/10 py-4 mb-4">
                  <Box className="text-center w-[50%]">Item</Box>
                  <Box className="flex justfiy-between items-center w-[50%]">
                    <Box className="text-center w-full">Price</Box>
                    <Box className="text-center w-full">Quantity</Box>
                    <Box className="text-center w-full">Total</Box>
                  </Box>
                </Box>

                <Box className="flex flex-col justfiy-between gap-4">
                  {cart.map((item, ind) => (
                    <Box
                      key={`${item.title}-${item.id}-${ind}`}
                      className="flex justfiy-between items-center gap-2 hover:bg-white/10 h-[100px]"
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
                          <Typography>${item?.price * item?.count}</Typography>
                        </Box>
                      </Box>
                      <Divider />
                    </Box>
                  ))}
                </Box>
                <Box className="flex justify-between  py-2 mt-4">
                  <Button
                    onClick={() => navigate(`/shopping`)}
                    variant="outlined"
                    color="secondary"
                    className={` px-[40px] py-4  w-full `}
                  >
                    GO TO SHOPPING
                  </Button>
                </Box>
              </>
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

          <Box className="w-full lg:max-w-[40%] ">
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
