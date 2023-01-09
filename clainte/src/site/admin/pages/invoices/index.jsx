import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, useTheme, Button, Breadcrumbs } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens, mockDataInvoices, Header } from "../../import";

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const columns = [
    { field: "id", headerName: "Id" },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      cellClassName: "name-column--cell",
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone Number", width: 100 },

    {
      field: "cost",
      headerName: "Cost",
      width: 100,
      renderCell: ({ row: { cost } }) => {
        return <Typography color={colors.greenAccent[500]}>${cost}</Typography>;
      },
    },
    { field: "date", headerName: "Date", width: 100 },
  ];
  return (
    <Box className="flex flex-col gap-4 md:gap-8 md:mt-20">
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            onClick={() => navigate(`/`)}
            variant="text"
            color="secondary"
          >
            Admin Dashboadrd
          </Button>
          <Typography color="text.primary">New Product</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header title="INVOICES" subtitle="welcome to you Invoices" />
      </Box>
      <Box
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
        <DataGrid checkboxSelection rows={mockDataInvoices} columns={columns} />
      </Box>
    </Box>
  );
};

export default Invoices;
