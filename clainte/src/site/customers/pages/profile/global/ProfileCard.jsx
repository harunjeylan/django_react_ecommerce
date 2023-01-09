import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useGetUseUseDataQuery } from "../../../import";
import {
  Typography,
  Box,
  useTheme,
  List,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import { useEffect } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import {
  selectCurrentUser,
  setUserData,
  useGetUseDataQuery,
} from "../../../import";
import { tokens } from "../../../import";

const ProfileCard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const userData = useSelector(selectCurrentUser);

  return (
    <Box className="flex flex-col gap-8 drop-shadow-lg bg-slate-400/10 rounded-lg">
      <Box
        backgroundColor={colors.primary[400]}
        className={`flex flex-col justify-between items-center gap-4 py-4 px-auto`}
      >
        <Box className="h-[200px] w-[200px] rounded-[50%] bg-slate-400/10">
          <img
            alt="user avater"
            src={userData?.image}
            className="h-[200px] w-[200px] rounded-[50%]"
          />
        </Box>

        <Box className="flex flex-col justify-between items-center gap-2">
          <Typography
            variant="h3"
            color={colors.grey[100]}
            fontWeight="bold"
            className={``}
          >
            {userData?.first_name} {userData?.last_name}
          </Typography>
          <Typography
            variant="subtitle1"
            color={colors.greenAccent[500]}
            className={``}
          >
            {userData?.email ? userData?.email : userData?.username}
          </Typography>
        </Box>
      </Box>

      <List className={`bg-transparent w-[100%]`}>
        <ListItemButton onClick={() => navigate("/profile/orders/")}>
          <ListItemIcon>
            <ShoppingBagOutlinedIcon fontSize="large" />
          </ListItemIcon>
          <Box className="flex justify-between items-center w-full">
            <Typography fontWeight="bold" variant="subtitle1" className={``}>
              Order
            </Typography>
            <Typography fontWeight="bold" variant="subtitle1" className={``}>
              5
            </Typography>
          </Box>
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/profile/")}>
          <ListItemIcon>
            <PersonOutlineIcon fontSize="large" />
          </ListItemIcon>
          <Box className="flex justify-between items-center w-full">
            <Typography fontWeight="bold" variant="subtitle1" className={``}>
              Profile
            </Typography>
          </Box>
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/profile/address/")}>
          <ListItemIcon>
            <HomeOutlinedIcon fontSize="large" />
          </ListItemIcon>
          <Box className="flex justify-between items-center w-full">
            <Typography fontWeight="bold" variant="subtitle1" className={``}>
              Address
            </Typography>
          </Box>
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/profile/wishlist/")}>
          <ListItemIcon>
            <FavoriteBorderOutlinedIcon fontSize="large" />
          </ListItemIcon>
          <Box className="flex justify-between items-center w-full">
            <Typography fontWeight="bold" variant="subtitle1" className={``}>
              Wish List
            </Typography>
            <Typography fontWeight="bold" variant="subtitle1" className={``}>
              {wishlist.length}
            </Typography>
          </Box>
        </ListItemButton>
        <ListItemButton onClick={() => {}}>
          <ListItemIcon>
            <LogoutOutlinedIcon fontSize="large" />
          </ListItemIcon>
          <Box className="flex justify-between items-center w-full">
            <Typography fontWeight="bold" variant="subtitle1" className={``}>
              Log Out
            </Typography>
          </Box>
        </ListItemButton>
      </List>
    </Box>
  );
};

export default ProfileCard;
