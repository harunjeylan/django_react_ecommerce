import React from "react";
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import {
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import userImage from "../../data/images/user.png";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  return (
    <Box className="flex flex-col gap-8 drop-shadow-lg bg-slate-400/10 rounded-lg">
      <Box
        backgroundColor={colors.primary[400]}
        className={`flex flex-col justify-between items-center gap-4 py-4 px-auto`}
      >
        <Box className="h-[200px] w-[200px] rounded-[50%] bg-slate-400/10">
          <img src={userImage} className="h-[200px] w-[200px] rounded-[50%]" />
        </Box>

        <Box className="flex flex-col justify-between items-center gap-2">
          <Typography
            variant="h3"
            color={colors.grey[100]}
            fontWeight="bold"
            className={``}
          >
            Harun Jeylan
          </Typography>
          <Typography
            variant="subtitle1"
            color={colors.greenAccent[500]}
            className={``}
          >
            web developer
          </Typography>
        </Box>
      </Box>

      <List className={`bg-transparent w-[100%]`}>
        <ListItemButton onClick={() => navigate("/profile/orders/")}>
          <ListItemIcon>
            <ShoppingBagOutlinedIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText primary="Order" secondary="5" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/profile/")}>
          <ListItemIcon>
            <PersonOutlineIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText primary="Profile" secondary="last see Jan 9, 2014" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/profile/wishlist/")}>
          <ListItemIcon>
            <FavoriteBorderOutlinedIcon fontSize="large" />
          </ListItemIcon>

          <ListItemText primary="Wish List" secondary="10" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/profile/")}>
          <ListItemIcon>
            <LogoutOutlinedIcon fontSize="large" />
          </ListItemIcon>

          <ListItemText primary="Log Out" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Header;
