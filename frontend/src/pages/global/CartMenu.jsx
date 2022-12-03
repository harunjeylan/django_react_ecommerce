import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { colors } from "../../theme";
import {
  decreaseCount,
  setCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from "../../redux/services/cartReducer";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

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
      className={`fixed w-full h-full top-0 left-0 bg-black/50 z-20`}
    >
      <Box
        className={`fixed top-0 right-0 bottom-0 w-[80%] md:w-[70%] lg:w-[60%] max-w-[600px]  h-full`}
        backgroundColor={colors.primary[400]}
      >
        <Box className={`px-8 `}>
          {/* HEADER */}
          <Box className="flex justify-between items-center h-[60px]">
            <Typography variant="h3">SHOPPING BAG ({cart.length})</Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
              <CloseIcon />
            </IconButton>
          </Box>
          {/* CART LIST */}
          <Box
            sx={{ maxHeight: "calc(var(--vh, 1vh)*100 - 250px)" }}
            className={`overflow-auto px-4 flex flex-col gap-4`}
          >
            {cart.map((item, ind) => (
              <Box key={`${item.title}-${item.id}-${ind}`}>
                <Box className="md:flex gap-2 items-center pb-4">
                  <Box className="">
                    <img
                      alt={item?.title}
                      className="md:max-w-[140px] max-h-[140px]"
                      src={`${item?.images[0]}`}
                    />
                  </Box>
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
                      <Typography fontWeight="bold">${item.price}</Typography>
                    </Box>
                  </Box>
                </Box>
                <Divider />
              </Box>
            ))}
          </Box>

          {/* ACTIONS */}
          <Box className="h-[60px]">
            <Box className="flex justify-between items-center py-4">
              <Typography variant="h5" fontWeight="bold">
                SUBTOTAL
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                ${totalPrice}
              </Typography>
            </Box>
            <Button
              variant="outlined"
              className={`w-full p-2 my-2`}
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
              className={`w-full p-2 my-2`}
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
      </Box>
    </Box>
  );
};

export default CartMenu;
