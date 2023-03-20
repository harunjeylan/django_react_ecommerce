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
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import { LayoutContext } from "./LayoutContext";
import { tokens } from "../../../theme";
import { logOut, selectCurrentUser } from "../../../features/auth/authSlice";

export default function AccountMenu() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openAccountMemu } = useContext(LayoutContext);
  const { handleCloseAccountMenu } = useContext(LayoutContext);
  const { anchorEl } = useContext(LayoutContext);
  const userData = useSelector(selectCurrentUser);
  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={openAccountMemu}
      onClose={handleCloseAccountMenu}
      onClick={handleCloseAccountMenu}
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
            bgcolor: colors.primary[400],
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
      {userData?.is_superuser && (
        <MenuItem onClick={() => navigate("/admin/")}>
          <ListItemIcon>
            <DashboardOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Dashboard
        </MenuItem>
      )}
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
