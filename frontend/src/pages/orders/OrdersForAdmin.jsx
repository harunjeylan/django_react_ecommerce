import React from "react";
import { Box, Button, Typography, Breadcrumbs, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { mockDataOrders } from "../../data/mockData";
import { Link } from "react-router-dom";
import { applyInitialState } from "@mui/x-data-grid/hooks/features/columns/gridColumnsUtils";
const OrdersForAdmin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

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
      field: "total",
      headerName: "Total",
      width: 100,
      renderCell: ({ row: { total } }) => {
        return <Typography>${total}</Typography>;
      },
    },
    {
      field: "first_name",
      headerName: "Customer",
      width: 200,
      hieght: 200,
      renderCell: ({ row: { first_name, last_name, avator } }) => {
        return (
          <Box className="flex justify-start gap-4 items-center py-2 w-full h-full">
            <Link to={`/admin/customers/${1}`}>
              <img
                className="h-[60px] w-[60px] cursor-pointer rounded-[50%]"
                src={avator}
                alt={`${first_name}-${last_name}`}
              />{" "}
            </Link>
            <Link to={`/admin/customers/${1}`}>
              <Typography
                className="cursor-pointer"
                color={colors.greenAccent[500]}
              >
                {first_name} {last_name}
              </Typography>
            </Link>
          </Box>
        );
      },
    },
    { field: "payment_status", headerName: "Payment status", width: 200 },
    { field: "fulfilment_status", headerName: "Fulfilment status", width: 200 },
    { field: "delivery_type", headerName: "Delivery Type", width: 200 },
    { field: "date", headerName: "Date", width: 100 },
  ];

  return (
    <Box className="">
      <Box className={`container mx-auto my-[40px]`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            onClick={() => navigate(`/`)}
            variant="text"
            color="secondary"
            className={`bg-opacity-0 hover:bg-opacity-100 px-4 py-2 ${
              "hover:bg-" + colors.greenAccent[400]
            }`}
          >
            Admin Dashboadrd
          </Button>
          <Typography color="text.primary">Customers</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`container mx-auto py-[20px] my-4 flex flex-col gap-4`}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="Customers" subtitle="welcome to you Customers" />
        </Box>
        <Box className="flex gap-4">
          <Box className="flex gap-1">
            <Typography>All</Typography>
            <Typography color={colors.greenAccent[500]}>(10000)</Typography>
          </Box>
          <Box className="flex gap-1">
            <Typography>Publishd</Typography>
            <Typography color={colors.greenAccent[500]}>(5600)</Typography>
          </Box>
          <Box className="flex gap-1">
            <Typography>All</Typography>
            <Typography color={colors.greenAccent[500]}>(540)</Typography>
          </Box>
          <Box className="flex gap-1">
            <Typography>On Discount</Typography>
            <Typography color={colors.greenAccent[500]}>(800)</Typography>
          </Box>
        </Box>
        <Box
          className="h-[80vh]"
          height="80vh"
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
            density="comfortable"
            rows={mockDataOrders}
            columns={columns}
            autoPageSize
            checkboxSelection
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default OrdersForAdmin;
