import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Typography,
  Breadcrumbs,
  useTheme,
  CircularProgress,
} from "@mui/material";

import { useGetAllOrdersForAdminQuery } from "../../../../../features/services/orderApiSlice";
import { tokens } from "../../../../../theme";
import Header from "../../../../../components/Header";
import userAvatar from "../../../../../assets/user-avatar.png";
import dateFormatter from "../../../../../helpers/dateFormatter";
const OrdersForAdmin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const { data: orders, isFetching: isFetchingOrders } =
    useGetAllOrdersForAdminQuery();
  const columns = [
    {
      field: "id",
      headerName: "ORDER",
      width: 100,
      renderCell: ({ row: { id } }) => {
        return (
          <Link to={`/admin/orders/${id}`}>
            <Typography
              className="cursor-pointer"
              color={colors.greenAccent[500]}
            >
              # {id}
            </Typography>
          </Link>
        );
      },
    },
    {
      field: "total_price",
      headerName: "Total",
      width: 100,
      renderCell: ({ row: { total_price } }) => {
        return <Typography>${total_price}</Typography>;
      },
    },
    {
      field: "first_name",
      headerName: "Customer",
      width: 200,
      height: 200,
      renderCell: ({ row: { full_name, avatar } }) => {
        return (
          <Box className="flex justify-start gap-4 items-center py-2 w-full h-full">
            <Link to={`/admin/customers/${1}`}>
              <img
                className="h-[60px] w-[60px] cursor-pointer  rounded-full  border bg-slate-300 "
                src={avatar || userAvatar}
                alt={`${full_name}`}
              />{" "}
            </Link>
            <Link to={`/admin/customers/${1}`}>
              <Typography
                className="cursor-pointer"
                color={colors.greenAccent[500]}
              >
                {full_name || "no name"}
              </Typography>
            </Link>
          </Box>
        );
      },
    },
    {
      field: "fulfillment_status",
      headerName: "Fulfillment status",
      width: 200,
    },
    { field: "delivery_method", headerName: "Delivery Method", width: 200 },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      renderCell: ({ row: { date } }) => {
        return (
          <Typography>{dateFormatter(new Date(date)) || "no order"}</Typography>
        );
      },
    },
    {
      field: "products",
      headerName: "Products",
      width: 100,
      renderCell: ({ row: { products } }) => {
        return <Typography>{products || 0}</Typography>;
      },
    },
    {
      field: "total_products",
      headerName: "Total Products",
      width: 100,
      renderCell: ({ row: { total_products } }) => {
        return <Typography>{total_products || 0}</Typography>;
      },
    },
  ];

  return (
    <Box className={`flex flex-col gap-4 md:gap-8 md:mt-20 mb-10`}>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            onClick={() => navigate(`/`)}
            variant="text"
            color="secondary"
          >
            Admin Dashboard
          </Button>
          <Typography color="text.primary">Order</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header title="Order" subtitle="welcome to you Order" />
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Box
          height="80vh"
          backgroundColor={colors.primary[400]}
          className="h-[80vh] rounded-lg p-4"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiChackbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          {!isFetchingOrders ? (
            orders?.length ? (
              <DataGrid
                density="comfortable"
                rows={orders}
                columns={columns}
                autoPageSize
                // checkboxSelection
                components={{ Toolbar: GridToolbar }}
              />
            ) : (
              <Box className="w-full flex items-center justify-center h-full min-h-40">
                <Typography>No data</Typography>
              </Box>
            )
          ) : (
            <Box className="w-full flex items-center justify-center h-full min-h-40">
              <CircularProgress color="secondary" />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default OrdersForAdmin;
