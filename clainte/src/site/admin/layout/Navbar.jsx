import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useProSidebar } from "react-pro-sidebar";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { useSelector, useDispatch } from "react-redux";
import {
  useTheme,
  Box,
  IconButton,
  InputBase,
  CardActionArea,
} from "@mui/material";
import { logOut } from "../import";
import { ColorModeContext, tokens, logo } from "../import";
const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box display="flex">
        {broken && !rtl && (
          <IconButton
            sx={{ margin: "0 6 0 2" }}
            onClick={() => toggleSidebar()}
          >
            <MenuOutlinedIcon />
          </IconButton>
        )}
        <Box className="flex gap-4">
          <Box>
            <CardActionArea
              className="w-[50px] h-[50px] rounded-full"
              onClick={() => navigate("/")}
              color="secondary"
            >
              <img
                alg="logo"
                src={logo}
                className="w-[50px] h-[50px] rounded-full"
              />
            </CardActionArea>
          </Box>
          <Box
            backgroundColor={colors.primary[400]}
            className="flex p-2 rounded-md"
          >
            <InputBase className="px-2" placeholder="Search" />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton onClick={() => dispatch(logOut())}>
          <LoginOutlinedIcon />
        </IconButton>

        {broken && rtl && (
          <IconButton
            sx={{ margin: "0 6 0 2" }}
            onClick={() => toggleSidebar()}
          >
            <MenuOutlinedIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default Topbar;
