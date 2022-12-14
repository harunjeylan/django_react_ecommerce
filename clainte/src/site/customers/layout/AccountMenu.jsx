import React, { useContext } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useTheme } from "@mui/material";

import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { LayoutContext } from "./LayoutContext";
import { logOut } from "../import";

import { tokens } from "../import";
import { setIsCartOpen, selectCurrentUser } from "../import";

export default function AccountMenu() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openAccountMemu } = useContext(LayoutContext);
  const { handleCloseAccountMemu } = useContext(LayoutContext);
  const { anchorEl } = useContext(LayoutContext);
  const userData = useSelector(selectCurrentUser);
  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={openAccountMemu}
      onClose={handleCloseAccountMemu}
      onClick={handleCloseAccountMemu}
      className="w-[200px] md:w-[300px]"
      PaperProps={{
        elevation: 0,
        sx: {
          width: "300px",
          maxWidth: "90%",
          backgroundColor: colors.primary[400],
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem onClick={() => navigate("/profile/")}>
        <Avatar sx={{ width: 32, height: 32 }}>
          <img alt="A" src={userData?.image} />
        </Avatar>
        My account
      </MenuItem>

      <Divider />
      <MenuItem onClick={() => navigate("/profile/address/")}>
        <ListItemIcon>
          <HomeOutlinedIcon fontSize="small" />
        </ListItemIcon>
        Address
      </MenuItem>
      <MenuItem onClick={() => navigate("/profile/wishlist/")}>
        <ListItemIcon>
          <FavoriteBorderOutlinedIcon fontSize="small" />
        </ListItemIcon>
        Wishlist
      </MenuItem>
      <MenuItem onClick={() => navigate("/checkout/viewcart/")}>
        <ListItemIcon>
          <ShoppingBagOutlinedIcon fontSize="small" />
        </ListItemIcon>
        Cart
      </MenuItem>
      <MenuItem onClick={() => navigate("/profile/orders/")}>
        <ListItemIcon>
          <ViewListOutlinedIcon fontSize="small" />
        </ListItemIcon>
        Orders
      </MenuItem>
      <Divider />

      <MenuItem onClick={() => navigate("/auth/register/")}>
        <ListItemIcon>
          <PersonAddAltOutlinedIcon fontSize="small" />
        </ListItemIcon>
        Add another account
      </MenuItem>
      <MenuItem onClick={() => dispatch(logOut())}>
        <ListItemIcon>
          <LogoutOutlinedIcon fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
}
