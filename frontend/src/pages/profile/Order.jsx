import React from "react";
import {
  Typography,
  Divider,
  Box,
  useTheme,
  Breadcrumbs,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import Header2 from "../../components/Header2";

import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ProfileCard from "./ProfileCard";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import {
  decreaseCount,
  setCount,
  increaseCount,
  removeFromCart,
} from "../../redux/services/cartReducer";
import Service from "../../components/Service";

import { DataGrid } from "@mui/x-data-grid";

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.price;
  }, 0);
  const columns = [
    { field: "id", headerName: "Order #" },
    { field: "date", headerName: "Date" },
    {
      field: "total",
      headerName: "Total",
      renderCell: ({ row: { total } }) => {
        return <Typography>${total}</Typography>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: ({ row: { status } }) => {
        return (
          <Typography color={colors.greenAccent[500]}>
            {status === "Being prepared" && (
              <span className="bg-blue-400/5 text-blue-500 px-2 py-1 rounded-md">
                {status}
              </span>
            )}
            {status === "Action needed" && (
              <span className="bg-yellow-400/5 text-yellow-500 px-2 py-1 rounded-md">
                {status}
              </span>
            )}
            {status === "Received" && (
              <span className="bg-green-400/5 text-green-500 px-2 py-1 rounded-md">
                {status}
              </span>
            )}
            {status === "Cancelled" && (
              <span className="bg-red-400/5 text-red-500 px-2 py-1 rounded-md">
                {status}
              </span>
            )}
          </Typography>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: ({ row: { action } }) => {
        return (
          <Button onClick={() => {}} variant="outlined" color="secondary">
            VIEW
          </Button>
        );
      },
    },
  ];

  const rows = [
    {
      id: "# 1735",
      date: "22/6/2022",
      total: 150.0,
      type: "number",
      status: "Being prepared",
      action: 1,
    },
    {
      id: "# 1734",
      date: "	7/5/2022",
      total: 170.0,
      type: "number",
      status: "Action needed",
      action: 1,
    },
    {
      id: "# 1730",
      date: "22/5/2022",
      total: 250.0,
      type: "number",
      status: "Received",
      action: 1,
    },
    {
      id: "# 1705",
      date: "22/7/2022",
      total: 650.0,
      type: "number",
      status: "Cancelled",
      action: 1,
    },
  ];

  return (
    <Box className={`flex flex-col gap-4 mt-[100px] `}>
      <Box className={`container mx-auto`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            onClick={() => navigate(`/`)}
            variant="text"
            color="secondary"
            className={` px-4 py-2 ${"hover:bg-" + colors.greenAccent[400]}`}
          >
            Home
          </Button>
          <Typography color="text.primary">Order</Typography>
        </Breadcrumbs>
        <Box
          backgroundColor={colors.primary[400]}
          className={`container mx-auto py-[80px] rounded-lg my-4`}
        >
          <Header2
            title="Your Orders"
            bodyText="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt."
          />
        </Box>
      </Box>
      <Box className={`container mx-auto`}>
        <Box className="flex flex-col-reverse  gap-8 md:flex-row">
          <Box className="w-full md:max-w-[60%]">
            {rows.length ? (
              <>
                <Box
                  className="h-[60vh] w-full"
                  sx={{
                    "& .MuiDataGrid-root": {
                      border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                      borderBottom: "none",
                    },
                    "& .name-column--cell": {
                      color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: colors.blueAccent[700],
                      borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                      backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                      borderTop: "none",
                      backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                      color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .MuiChackbox-root": {
                      color: `${colors.greenAccent[200]} !important`,
                    },
                  }}
                >
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                  />
                  <Divider />
                </Box>

                <Box className="flex justify-between  py-2">
                  <Button
                    onClick={() => navigate(`/shopping`)}
                    variant="outlined"
                    color="secondary"
                    className={` px-[40px] py-4  w-full `}
                  >
                    CONTINUE SHOPPING
                  </Button>
                </Box>
              </>
            ) : (
              <Box
                backgroundColor={colors.primary[400]}
                className={`container mx-auto py-[80px] rounded-lg`}
              >
                <Box className="flex flex-col gap-4 justify-center items-center">
                  <ShoppingBagOutlinedIcon size="large" className="size-lg" />
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    className={`text-4xl md:text-6xl  `}
                  >
                    Empty Cart
                  </Typography>
                  <Button
                    onClick={() => navigate(`/shopping`)}
                    variant="outlined"
                    color="secondary"
                    className={` px-[40px] py-2 ${
                      "hover:bg-" + colors.greenAccent[400]
                    }`}
                  >
                    Go Shop now
                  </Button>
                </Box>
              </Box>
            )}
          </Box>

          <Box className="w-full md:max-w-[40%] ">
            <ProfileCard />
          </Box>
        </Box>
      </Box>

      <Box
        backgroundColor={colors.primary[400]}
        className="px-4 flex justify-center lg:px-auto py-[80px] items-center my-[50px]"
      >
        <Service />
      </Box>
    </Box>
  );
};

export default Wishlist;
