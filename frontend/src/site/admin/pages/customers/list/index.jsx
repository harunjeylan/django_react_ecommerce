import React from "react";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Breadcrumbs, useTheme } from "@mui/material";
import { mockDataCustomers } from "../../../import";
import { Header } from "../../../import";
import { tokens } from "../../../import";
const Customers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const columns = [
    {
      field: "first_name",
      headerName: "Customer",
      width: 200,
      hieght: 200,
      renderCell: ({ row: { first_name, last_name, avator } }) => {
        return (
          <Box className="flex gap-4 items-center py-2 w-full h-full">
            <Link to={`/admin/customers/${1}`}>
              <img
                className="h-[60px] w-[60px] pointer rounded-[50%]"
                src={avator}
                alt={`${first_name}-${last_name}`}
              />
            </Link>
            <Link to={`/admin/customers/${1}`}>
              <Typography color={colors.greenAccent[500]}>
                {first_name} {last_name}
              </Typography>
            </Link>
          </Box>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      renderCell: ({ row: { email } }) => {
        return (
          <Link to={`/admin/customers/${1}`}>
            <Typography color={colors.greenAccent[500]}>{email}</Typography>
          </Link>
        );
      },
    },
    { field: "orders", headerName: "Orders", width: 100 },

    {
      field: "total_spent",
      headerName: "Total spent",
      width: 100,
      renderCell: ({ row: { total_spent } }) => {
        return (
          <Typography color={colors.greenAccent[500]}>
            ${total_spent}
          </Typography>
        );
      },
    },
    { field: "city", headerName: "City", width: 200 },

    { field: "last_seen", headerName: "Last seen", width: 100 },
    { field: "last_order", headerName: "Last order", width: 100 },
  ];

  return (
    <Box className={`flex flex-col gap-4 md:gap-8 md:mt-20`}>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            onClick={() => navigate(`/`)}
            variant="text"
            color="secondary"
            className={`bg-opacity-0 hover:bg-opacity-100 px-4 py-2`}
          >
            Admin Dashboadrd
          </Button>
          <Typography color="text.primary">Customers</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header title="Customers" subtitle="welcome to you Customers" />
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
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
            "& .MuiDataGrid-cell": {
              width: "100%",
            },
          }}
        >
          <DataGrid
            density="comfortable"
            rows={mockDataCustomers}
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

export default Customers;
