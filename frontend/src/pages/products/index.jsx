import React from "react";
import { Box, Button, Typography, Breadcrumbs, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { mockDataProducts } from "../../data/mockData";
import { Link } from "react-router-dom";
const ProductsForAdmin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const columns = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "title",
      headerName: "Product Name",
      width: 360,
      renderCell: ({ row: { id, title, thumbnail } }) => {
        return (
          <Box className="flex gap-4 items-center py-2 w-full h-full">
            <Link to={`/admin/products/${id}`}>
              <img
                style={{ backgroundColor: colors.primary[400] }}
                className="h-[60px] w-[60px] pointer rounded-md border-[1px]"
                src={thumbnail}
                alt={`${title}`}
              />
            </Link>
            <Link to={`/admin/products/${id}`}>
              <Typography color={colors.greenAccent[500]}>{title}</Typography>
            </Link>
          </Box>
        );
      },
    },
    {
      field: "price",
      headerName: "price",
      renderCell: ({ row: { price } }) => {
        return <Typography>{price}</Typography>;
      },
    },
    { field: "category", headerName: "Category", width: 150 },

    {
      field: "tags",
      headerName: "Tags",
      renderCell: ({ row: { tags } }) => {
        return <Typography>{tags}</Typography>;
      },
    },
    { field: "publishd_on", headerName: "Publishd on" },
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
          <Typography color="text.primary">Products</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`container mx-auto py-[20px] my-4 flex flex-col gap-4`}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="Products" subtitle="welcome to you Products" />
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
            rows={mockDataProducts.slice(0, 10)}
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

export default ProductsForAdmin;
