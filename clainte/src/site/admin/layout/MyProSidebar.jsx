// docs https://github.com/azouaoui-med/react-pro-sidebar
import { useState } from "react";
import { Menu, Sidebar, SubMenu, MenuItem } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useTheme, Box, Typography, IconButton } from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SwitchRightOutlinedIcon from "@mui/icons-material/SwitchRightOutlined";
import SwitchLeftOutlinedIcon from "@mui/icons-material/SwitchLeftOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { selectCurrentUser } from "../../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useSidebarContext } from "./SidebarContext";
import { tokens } from "../../../theme";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const MyProSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");
  const { sidebarRTL, setSidebarRTL, sidebarImage } = useSidebarContext();
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
  const userData = useSelector(selectCurrentUser);

  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        top: 0,
        bottom: 0,
        zIndex: 10000,
        "& .sidebar": {
          border: "none",
        },
        "& .menu-icon": {
          backgroundColor: "transparent !important",
        },
        "& .ps-menu-button, & .ps-submenu-content": {
          backgroundColor: "transparent !important",
          color: "inherit !important",
        },
        "& .ps-menu-button:hover": {
          color: `${colors.blueAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
        "& .menu-item.active ": {
          color: `${colors.greenAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },

        "& .sub-menu-content": {
          backgroundColor: colors.primary[400],
          height: "100%",
        },
      }}
    >
      <Sidebar
        breakPoint="md"
        rtl={sidebarRTL}
        backgroundColor={colors.primary[400]}
        image={sidebarImage}
        width={broken ? "280px" : "320px"}
      >
        <Menu iconshape="square">
          <Box
            backgroundColor={colors.primary[400]}
            className="sticky h-[60px] top-0 z-[200] drop-shadow-md"
          >
            <MenuItem
              icon={
                collapsed ? (
                  <IconButton onClick={() => collapseSidebar()}>
                    <MenuOutlinedIcon />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => setSidebarRTL(!sidebarRTL)}>
                    {sidebarRTL ? (
                      <SwitchLeftOutlinedIcon />
                    ) : (
                      <SwitchRightOutlinedIcon />
                    )}
                  </IconButton>
                )
              }
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
              }}
              id="side-bar--disabled-anchor"
            >
              {!collapsed && (
                <Box className="flex items-center">
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    className="mx-auto"
                  >
                    ADMIN
                  </Typography>
                  <IconButton onClick={() => collapseSidebar()}>
                    <CloseOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>
          </Box>
          {!collapsed && (
            <Box mb="25px" className="my-8">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                className="py-4"
              >
                <img
                  style={{ backgroundColor: colors.primary[500] }}
                  className="w-[100px] h-[100px]  rounded-full"
                  alt="profile user"
                  src={
                    userData?.image
                      ? userData?.image
                      : "https://robohash.org/utetasperiores.png?size=200x200"
                  }
                />
              </Box>
              <Box textAlign="center" className="my-4">
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  className=""
                >
                  {userData?.first_name} {userData?.last_name}
                </Typography>
                <Typography variant="subtitle2" color="secondary" className="">
                  {userData?.email ? userData?.email : userData?.username}
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={collapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/admin/"
              icon={<DashboardOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Public"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Contacts Information"
              to="/admin/data/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoices Balances"
              to="/admin/data/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              E commerce
            </Typography>
            <Item
              title="Add Products"
              to="/admin/products/new"
              icon={<AddBoxOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Products"
              to="/admin/products"
              icon={<CategoryOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Customers"
              to="/admin/customers"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Orders"
              to="/admin/orders"
              icon={<ShoppingCartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Appearance
            </Typography>
            <Item
              title="Home Page"
              to="/admin/appearance/home"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Profile Form"
              to="/admin/pages/newuser"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/admin/pages/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default MyProSidebar;
