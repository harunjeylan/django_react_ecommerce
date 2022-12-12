import { useTheme } from "@emotion/react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Divider,
  IconButton,
  CardActionArea,
  Typography,
  TextField,
} from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import {
  decreaseCount,
  setCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from "../import";
import { tokens } from "../import";

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.price;
  }, 0);

  return (
    <Box
      display={isCartOpen ? "block" : "none"}
      className={`fixed w-full h-full top-0 left-0 bg-black/50 z-[200]`}
    >
      <Box
        className={`fixed top-0 right-0 bottom-0 w-[80%] md:w-[70%] lg:w-[60%] max-w-[600px]  h-full`}
        backgroundColor={colors.primary[400]}
      >
        <Box className={` relative  h-full`}>
          {/* HEADER */}
          <Box className="flex px-8 justify-between items-center h-[60px]">
            <Typography variant="h3">SHOPPING BAG ({cart.length})</Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* CART LIST */}
          {cart.length ? (
            <>
              <Box
                sx={{ maxHeight: "calc(var(--vh, 1vh)*100 - 240px)" }}
                className={`overflow-auto px-8 flex flex-col gap-4`}
              >
                {cart.map((item, ind) => (
                  <Box key={`${item.title}-${item.id}-${ind}`}>
                    <Box className="flex flex-col md:flex-row gap-2 items-center pb-4">
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
                      <Box className="flex flex-col px-2 w-full">
                        <Box className="flex justify-between items-center">
                          <Typography fontWeight="bold">
                            {item.title}
                          </Typography>
                          <IconButton
                            onClick={() =>
                              dispatch(removeFromCart({ id: item.id }))
                            }
                          >
                            <CloseIcon />
                          </IconButton>
                        </Box>
                        <Typography className="mr-4">
                          {item.description.slice(0, 60)}
                        </Typography>
                        <Box className="flex justify-between items-center">
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
                            ${item.price}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Divider />
                  </Box>
                ))}
              </Box>
              {/* ACTIONS */}
              <Box className="h-[60px] absolute  bottom-[100px] w-[100%] px-8">
                <Box className="flex justify-between mb-2 items-center py-1">
                  <Typography variant="h5" fontWeight="bold">
                    SUBTOTAL
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    ${totalPrice}
                  </Typography>
                </Box>
                <Box className="flex flex-col gap-2 ">
                  <Button
                    variant="outlined"
                    className={`w-full py-2`}
                    color="secondary"
                    onClick={() => {
                      navigate("/viewcart");
                      dispatch(setIsCartOpen({}));
                    }}
                  >
                    VIEW CART
                  </Button>
                  <Button
                    variant="outlined"
                    className={`w-full py-2`}
                    color="secondary"
                    onClick={() => {
                      navigate("/checkout");
                      dispatch(setIsCartOpen({}));
                    }}
                  >
                    CHECKOUT
                  </Button>
                </Box>
              </Box>
            </>
          ) : (
            <Box className="flex flex-col gap-4 mt-[10%] justify-center  items-center">
              <ShoppingBagOutlinedIcon size="large" className="text-8xl" />
              <Typography
                variant="h2"
                color={colors.grey[100]}
                fontWeight="bold"
                className={`text-xl md:text-2xl  `}
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
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CartMenu;
