import { useDispatch, useSelector } from "react-redux";
import { useTheme, InputBase, Badge, Box, IconButton } from "@mui/material";
import { useContext, useState, useRef } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { colors } from "../../theme";
import { setIsCartOpen } from "../../redux/services/cartReducer";
import { ColorModeContext, tokens } from "../../theme";
import { Link } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
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
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      backgroundColor={colors.primary[400]}
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="10"
      className="drop-shadow-md"
    >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          onClick={() => navigate("/")}
          sx={{ "&:hover": { cursor: "pointer" } }}
          color={colors.greenAccent[500]}
        >
          ECOMMER
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"
          zIndex="2"
        >
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
              <SearchOutlined />
            </IconButton>
          </Box>
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <LightModeOutlinedIcon />
            ) : (
              <DarkModeOutlinedIcon />
            )}
          </IconButton>
          <IconButton>
            <PersonOutline />
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
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>
          <Link to="/admin/">
            <IconButton>
              <MenuOutlined />
            </IconButton>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;
