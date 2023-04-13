import { useContext, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { LayoutContext } from "./LayoutContext";
import {
  useTheme,
  Badge,
  Box,
  Button,
  CardActionArea,
  IconButton,
  // Typography,
  // Button,
  Avatar,
  Tooltip,
  TextField,
  ButtonGroup,
  Typography,
  Divider,
} from "@mui/material";

import { selectWishlists } from "../../../features/services/wishlistReducer";
import { selectCurrentUser } from "../../../features/auth/authSlice";
import { ColorModeContext, tokens } from "../../../theme";
import { setIsCartOpen } from "../../../features/services/cartReducer";
import logo from "../../../data/logo.png";
import Model from "../../../components/ui/Model";
import { useSearchProductsQuery } from "../../../features/services/productApiSlice";

function AppBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const cart = useSelector((state) => state.cart.cart);
  const wishlist = useSelector(selectWishlists);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const { openAccountMenu } = useContext(LayoutContext);
  const { handleClickAccountMenu } = useContext(LayoutContext);
  const { handleClickOpenAccountDialog } = useContext(LayoutContext);
  const [openModel, setOpenModel] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [search, setSearch] = useState("");

  const { data: searchProducts = [], isFetching: isFetchingSearchProducts } =
    useSearchProductsQuery({
      search,
    });

  useEffect(() => {
    let timeOut = setTimeout(() => {
      if (searchValue !== "") {
        setSearch(`search=${searchValue}`);
      }
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [searchValue]);
  return (
    <>
      <Box
        className={`sticky top-0 items-center w-full left-0 z-[200] drop-shadow-md ease-in-out duration-500 py-2`}
        backgroundColor={colors.primary[400]}
        // background
      >
        <Box className="w-[80%] m-auto flex justify-between items-center">
          <Box>
            <CardActionArea
              className="w-[50px] h-[50px] rounded-full"
              onClick={() => navigate("/")}
              color="secondary"
            >
              <img
                alt="logo"
                src={logo}
                className="w-[50px] h-[50px] rounded-full"
              />
            </CardActionArea>
          </Box>

          <Box className="justify-center flex gap-2">
            <IconButton onClick={() => setOpenModel(true)}>
              <SearchOutlinedIcon />
            </IconButton>
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <LightModeOutlinedIcon />
              ) : (
                <DarkModeOutlinedIcon />
              )}
            </IconButton>

            <Badge
              badgeContent={cart.length}
              color="secondary"
              invisible={cart.length === 0}
              sx={{
                "& .MuiBadge-badge": {
                  right: 5,
                  top: 5,
                  padding: "0 4px",
                  height: "14px",
                  minWidth: "13px",
                },
              }}
            >
              <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
                <ShoppingBagOutlinedIcon />
              </IconButton>
            </Badge>
            {user && (
              <Badge
                badgeContent={wishlist?.length}
                color="secondary"
                invisible={wishlist?.length === 0}
                sx={{
                  "& .MuiBadge-badge": {
                    right: 5,
                    top: 5,
                    padding: "0 4px",
                    height: "14px",
                    minWidth: "13px",
                  },
                }}
              >
                <IconButton onClick={() => navigate("/profile/wishlist")}>
                  <FavoriteBorderOutlinedIcon />
                </IconButton>
              </Badge>
            )}

            {user === null ? (
              <Box className="flex gap-2">
                <Button
                  onClick={() => handleClickOpenAccountDialog("login")}
                  color="secondary"
                  variant="outlined"
                >
                  Login
                </Button>
                <Button
                  onClick={() => handleClickOpenAccountDialog("register")}
                  color="secondary"
                  variant="outlined"
                >
                  Register
                </Button>
              </Box>
            ) : (
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClickAccountMenu}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={openAccountMenu ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openAccountMenu ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    <img alt="A" src={user?.image} />
                  </Avatar>
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
      </Box>
      <Model
        openModel={openModel}
        setOpenModel={setOpenModel}
        modelTitle="Search"
        width="md"
      >
        <Box className="w-full flex flex-col gap-8">
          <Box className="w-full">
            <TextField
              variant="outlined"
              color="secondary"
              fullWidth
              placeholder="search.."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Box>
          <Box className="w-full">
            {!isFetchingSearchProducts &&
              searchProducts.map((product, ind) => (
                <Box
                  key={`${product?.title}-${product?.id}-${ind}`}
                  className="flex flex-col md:flex-row gap-2 
                  items-center justify-center pb-4 drop-shadow-md"
                >
                  <CardActionArea
                    onClick={() => navigate(`/product/${product?.id}`)}
                    className={`${
                      theme.palette.mode === "dark"
                        ? "bg-white/5"
                        : "bg-black/5"
                    } bg-opacity-90 p-1 w-[100px] h-[120px] rounded-md flex
                        products-center ease-in-out duration-300`}
                  >
                    <img
                      alt={product?.title}
                      className="w-full h-full rounded-md"
                      src={`${product?.thumbnail}`}
                    />
                  </CardActionArea>
                  <Box className="flex flex-col px-2 w-full">
                    <Box className="flex justify-between products-center">
                      <Typography fontWeight="bold">
                        {product?.title}
                      </Typography>
                    </Box>
                    <Typography className="mr-4">
                      {product?.description?.slice(0, 60)}
                    </Typography>
                    <Box className="flex justify-between w-full">
                      <Box>
                        <Typography fontWeight="bold">
                          <strong>Price</strong> : ${product?.sale_pricing}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>
      </Model>
    </>
  );
}

export default AppBar;
