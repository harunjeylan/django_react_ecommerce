import { useContext, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import {
  useTheme,
  InputBase,
  Badge,
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { setIsCartOpen } from "../import";
import { ColorModeContext, tokens } from "../import";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [activeSearch, setActiveSearch] = useState(false);
  const searchRef = useRef(null);
  const hundleSearchClick = () => {
    setActiveSearch(!activeSearch);
    console.log(activeSearch);
    searchRef.current.focus();
  };
  return (
    <Box
      className="flex items-center w-full h-[60px] top-0 left-0 z-20 drop-shadow-md"
      backgroundColor={colors.primary[400]}
    >
      <Box className="w-[80%] m-auto flex justify-between items-center">
        <Box>
          <Button onClick={() => navigate("/")} color="secondary">
            ALIF
          </Button>
        </Box>
        <Box className="justify-center flex gap-1">
          <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            p={0.2}
            borderRadius={1}
          >
            {activeSearch && (
              <InputBase
                ref={searchRef}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search"
              />
            )}
            <IconButton onClick={hundleSearchClick} type="button">
              <SearchOutlinedIcon />
            </IconButton>
          </Box>
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
          <Badge
            badgeContent={wishlist.length}
            color="secondary"
            invisible={wishlist.length === 0}
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
          <IconButton onClick={() => navigate("/profile")}>
            <PersonOutlinedIcon />
          </IconButton>

          <IconButton onClick={() => navigate("/admin/")}>
            <MenuOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;