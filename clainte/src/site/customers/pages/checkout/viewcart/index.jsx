import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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

import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { tokens } from "../../../../../theme";
import Header from "../../../../../components/Header";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setCount,
} from "../../../../../features/services/cartReducer";
import OrderSummery from "../../../../../components/OrderSummery";

const ViewCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.sale_pricing;
  }, 0);

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
          <Typography color="text.primary">View Shoping Cart</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header
          title="Shopping cart"
          subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit,"
        />
      </Box>

      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        {cart.length ? (
          <Box className="flex flex-col gap-8 md:flex-row">
            <Box className="w-full md:max-w-[60%]">
              {cart.map((item, ind) => (
                <Box key={`${item.title}-${item.id}-${ind}`}>
                  <Box className="flex gap-2 items-center pb-4">
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
                    <Box className="flex flex-col px-2 w-full">
                      <Box className="flex justify-between items-center">
                        <Typography fontWeight="bold">{item.title}</Typography>
                        <IconButton
                          onClick={() =>
                            dispatch(removeFromCart({ id: item.id }))
                          }
                        >
                          <CloseIcon />
                        </IconButton>
                      </Box>
                      <Typography className="mr-4">
                        {item.description}
                      </Typography>
                      <Divider />
                      <Box className="flex justify-between items-center ">
                        <Box>
                          {item?.selectedVariants?.map(
                            (selectedVariant, index) => (
                              <Typography key={index}>
                                <strong>
                                  {selectedVariant.variantLabel} :{" "}
                                </strong>
                                <span> {selectedVariant.optionLabel} </span>,
                              </Typography>
                            )
                          )}
                        </Box>
                        <Box
                          display="flex"
                          alignItems="center"
                          className="my-2"
                          border={`1.5px solid ${colors.neutral[500]}`}
                        >
                          <IconButton
                            size="small"
                            onClick={() =>
                              dispatch(decreaseCount({ id: item.id }))
                            }
                          >
                            <RemoveIcon />
                          </IconButton>
                          <TextField
                            size="small"
                            className="w-[100px]"
                            id="outlined-number"
                            type="number"
                            value={item.count}
                            onChange={(event) =>
                              dispatch(
                                setCount({
                                  id: item.id,
                                  count: event.target.value,
                                })
                              )
                            }
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                          <IconButton
                            size="small"
                            onClick={() =>
                              dispatch(increaseCount({ id: item.id }))
                            }
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
                        <Typography fontWeight="bold">
                          <strong>Price</strong> : ${item?.sale_pricing}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Divider />
                </Box>
              ))}
              <Box className="flex justify-between  py-2">
                <Button
                  onClick={() => navigate(`/shopping`)}
                  variant="outlined"
                  color="secondary"
                  className={` px-[40px] py-4  w-full `}
                >
                  CONTINUE SHOPPING
                </Button>
              </Box>
            </Box>

            <Box className="w-full md:max-w-[40%] ">
              <OrderSummery totalPrice={totalPrice} />
              <Box className="flex justify-between pt-4 ">
                <Button
                  onClick={() => navigate(`/checkout`)}
                  variant="outlined"
                  color="secondary"
                  className={` px-[40px] py-4 w-full  `}
                >
                  PROCEED TO CHECKOUT
                </Button>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            backgroundColor={colors.primary[400]}
            className={`container mx-auto py-[80px] rounded-lg`}
          >
            <Box className="flex flex-col gap-4 justify-center items-center">
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
    </Box>
  );
};

export default ViewCart;
