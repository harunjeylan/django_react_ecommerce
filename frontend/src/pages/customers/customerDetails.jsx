import React from "react";
import {
  Box,
  Button,
  Typography,
  Breadcrumbs,
  useTheme,
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
  FormLabel,
  FormGroup,
  Select,
  Divider,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import OrderSummery from "../../components/OrderSummery";
import { mockDataProducts, mockDataOrders } from "../../data/mockData";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";
const OrderDetailsForAdmin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { orderId } = useParams();

  const notesOnCustomerInitialValues = {
    notesOnCustomer: "",
  };
  const notesOnCustomerSchema = yup.object().shape({
    notesOnCustomer: yup.string().required("Required"),
  });
  const handleFormSubmit = (values) => {
    console.log(values);
  };
  const produtCtolumns = [
    {
      field: "name",
      headerName: "Product Name",
      width: 360,
      hieght: 200,
      renderCell: ({ row: { title, thumbnail } }) => {
        return (
          <Box className="flex gap-4 items-center py-2 w-full h-full">
            <Link to={`/admin/products/${1}`}>
              <img
                style={{ backgroundColor: colors.primary[400] }}
                className="h-[60px] w-[60px] pointer rounded-md border-[1px]"
                src={thumbnail}
                alt={`${title}`}
              />
            </Link>
            <Link to={`/admin/products/${1}`}>
              <Typography color={colors.greenAccent[500]}>{title}</Typography>
            </Link>
          </Box>
        );
      },
    },
    { field: "color", headerName: "Color", width: 150 },
    { field: "size", headerName: "Size", width: 150 },
    {
      field: "price",
      headerName: "price",
      renderCell: ({ row: { price } }) => {
        return <Typography>{price}</Typography>;
      },
    },
    { field: "quantity", headerName: "Quantity", width: 150 },

    {
      field: "total",
      headerName: "Total",
      width: 150,
      renderCell: ({ row: { price, quantity } }) => {
        return <Typography>${(price * quantity).toFixed(2)}</Typography>;
      },
    },
  ];
  const orderColumns = [
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
            <Link to="/">
              <img
                className="h-[60px] w-[60px] cursor-pointer rounded-[50%]"
                src={avator}
                alt={`${first_name}-${last_name}`}
              />{" "}
            </Link>
            <Link to="/">
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
          <Typography color="text.primary">Customer details</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`container mx-auto py-[20px] my-4`}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title={`Customer details`} subtitle="Customer ID : 2364847" />
        </Box>
        <Box className="flex flex-col xl:flex-row gap-4">
          <Box className="w-full xl:w-[40%]">
            <Box className="flex flex-col gap-4">
              <Box className="flex flex-col md:flex-row xl:flex-col gap-4">
                <Box className="w-full  md:w-[70%] xl:w-full">
                  <Box
                    backgroundColor={colors.primary[400]}
                    className="w-full flex flex-col gap-2 drop-shadow-lg  rounded-lg p-4"
                  >
                    <Box className="w-full flex items-center gap-4">
                      <Box className="p-4">
                        <img
                          className="rounded-[50%] h-[200px] w-[200px]"
                          alt="customer avater"
                          src="https://robohash.org/voluptasomnisnon.png?size=100x100&set=set1"
                        />
                      </Box>
                      <Box>
                        <Typography
                          variant="h1"
                          color={colors.grey[100]}
                          fontWeight="bold"
                          className={`text-xl md:text-2xl  text-left my-1`}
                        >
                          Ansolo Lazinatov
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color={colors.grey[200]}
                          className={`text-left my-1`}
                        >
                          Joined 3 months ago
                        </Typography>
                      </Box>
                    </Box>
                    <Divider />
                    <Box className="w-full flex justify-between items-center py-4 px-8">
                      <Box>
                        <Typography
                          variant="h1"
                          color={colors.grey[100]}
                          fontWeight="bold"
                          className={`text-xl md:text-2xl  text-left my-1`}
                        >
                          Orders
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color={colors.grey[200]}
                          className={`text-left my-1`}
                        >
                          36
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="h1"
                          color={colors.grey[100]}
                          fontWeight="bold"
                          className={`text-xl md:text-2xl  text-left my-1`}
                        >
                          Wishlist
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color={colors.grey[200]}
                          className={`text-left my-1`}
                        >
                          24
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="h1"
                          color={colors.grey[100]}
                          fontWeight="bold"
                          className={`text-xl md:text-2xl  text-left my-1`}
                        >
                          Ratings & reviews
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color={colors.grey[200]}
                          className={`text-left my-1`}
                        >
                          55
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box className="w-full  md:w-[30%] xl:w-full">
                  <Box
                    className="w-full flex flex-col gap-2 drop-shadow-lg rounded-lg p-4 "
                    backgroundColor={colors.primary[400]}
                  >
                    <Typography
                      variant="h1"
                      color={colors.grey[100]}
                      fontWeight="bold"
                      className={`text-xl md:text-2xl  text-left my-4`}
                    >
                      Billing details
                    </Typography>
                    <List className="w-full">
                      <ListItem>
                        <ListItemIcon>
                          <PersonOutlineOutlinedIcon size="large" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Customer"
                          secondary={
                            <Link to={`admin/customers/id`}>
                              <Typography
                                sx={{ color: colors.greenAccent[500] }}
                              >
                                Shatinon Mekalan
                              </Typography>
                            </Link>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <EmailOutlinedIcon size="large" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Email"
                          secondary={
                            <Link to={`admin/customers/id`}>
                              <Typography
                                sx={{ color: colors.greenAccent[500] }}
                              >
                                shatinon@jeemail.com
                              </Typography>
                            </Link>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <LocalPhoneOutlinedIcon size="large" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Phone"
                          secondary={
                            <Link to={`admin/customers/id`}>
                              <Typography
                                sx={{ color: colors.greenAccent[500] }}
                              >
                                +1234567890
                              </Typography>
                            </Link>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <HomeOutlinedIcon size="large" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Address"
                          secondary={
                            <Typography>
                              Shatinon Mekalan Vancouver, British Columbia,
                              Canada
                            </Typography>
                          }
                        />
                      </ListItem>
                    </List>
                  </Box>
                </Box>
              </Box>
              <Box className="w-full">
                <Box
                  backgroundColor={colors.primary[400]}
                  className="w-full flex flex-col gap-4 drop-shadow-lg  rounded-lg p-4"
                >
                  <Formik
                    backgroundColor={colors.primary[400]}
                    className="drop-shadow-lg  rounded-lg p-4"
                    onSubmit={handleFormSubmit}
                    initialValues={notesOnCustomerInitialValues}
                    validationSchema={notesOnCustomerSchema}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                      setFieldValue,
                    }) => (
                      <>
                        <form onSubmit={handleSubmit}>
                          <FormControl
                            className="h-full w-full"
                            component="fieldset"
                            variant="standard"
                          >
                            <FormLabel>
                              <Typography
                                variant="h1"
                                color={colors.grey[100]}
                                fontWeight="bold"
                                className={`text-xl md:text-2xl  text-left my-4`}
                              >
                                Notes on Customer
                              </Typography>
                            </FormLabel>
                            <FormGroup className="w-full">
                              <FormControl variant="filled" className="w-full">
                                <TextField
                                  color="secondary"
                                  fullWidth
                                  variant="filled"
                                  type="text"
                                  label="Notes on Customer"
                                  multiline
                                  rows={4}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.notesOnCustomer}
                                  name="notesOnCustomer"
                                  error={
                                    !!touched.notesOnCustomer &&
                                    !!errors.notesOnCustomer
                                  }
                                  helperText={
                                    touched.notesOnCustomer &&
                                    errors.notesOnCustomer
                                  }
                                  sx={{ gridColumn: "span 4" }}
                                />
                              </FormControl>
                            </FormGroup>
                          </FormControl>
                        </form>
                      </>
                    )}
                  </Formik>
                  <Button
                    type="button"
                    color="secondary"
                    variant="outlined"
                    className={`w-full mt-4`}
                  >
                    Add Note
                  </Button>
                  <Box className="w-full flex flex-col gap-4">
                    <Box className="">
                      <Typography
                        variant="subtitle1"
                        color={colors.grey[200]}
                        className={`text-left my-1`}
                      >
                        Gave us a nice feedback
                      </Typography>
                    </Box>
                    <Box className="">
                      <Typography
                        variant="subtitle1"
                        color={colors.grey[200]}
                        className={`text-right my-1`}
                      >
                        23 Dec, 2019
                      </Typography>
                      <Divider />
                      <Typography
                        variant="subtitle1"
                        color={colors.grey[200]}
                        className={`text-left my-1`}
                      >
                        Customer added product to cart and then forgot to
                        checkout. Later knocked the customer support to ask
                        about update on shipping. Later, settled on “One day
                        Shipping” though “Free delivery” was preferred. Overall
                        good behaviour
                      </Typography>
                    </Box>
                    <Box className="">
                      <Typography
                        variant="subtitle1"
                        color={colors.grey[200]}
                        className={`text-right my-1`}
                      >
                        2 Oct, 2019
                      </Typography>
                      <Divider />
                      <Typography
                        variant="subtitle1"
                        color={colors.grey[200]}
                        className={`text-left my-1`}
                      >
                        User of this support ticket won a 100% off coupon and
                        received top-notch service from the technical support
                        engineer. Along with providing a good review, user
                        highly appreciated the team.
                      </Typography>
                    </Box>
                    <Box className="">
                      <Typography
                        variant="subtitle1"
                        color={colors.grey[200]}
                        className={`text-right my-1`}
                      >
                        26 Apr, 2019
                      </Typography>
                      <Divider />
                      <Typography
                        variant="subtitle1"
                        color={colors.grey[200]}
                        className={`text-left my-1`}
                      >
                        Customer returned and bought 2 related items, which is
                        currently being shipped. Customer chose “One day
                        Shipping”. Additional notes were added regarding
                        customised wrapping. Customer submitted positive review.
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="w-full xl:w-[60%]">
            <Box className="flex flex-col gap-8">
              <Box
                backgroundColor={colors.primary[400]}
                className="w-full flex flex-col gap-4 drop-shadow-lg  rounded-lg p-4"
              >
                <Typography
                  variant="h1"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  className={`text-xl md:text-2xl  text-left my-4`}
                >
                  Orders (100)
                </Typography>
                <Box
                  className="h-[400px]"
                  height="400px"
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
                    rows={mockDataOrders.slice(0, 10)}
                    columns={orderColumns}
                    autoPageSize
                    checkboxSelection
                    components={{ Toolbar: GridToolbar }}
                  />
                </Box>
              </Box>
              <Box
                backgroundColor={colors.primary[400]}
                className="w-full flex flex-col gap-4 drop-shadow-lg  rounded-lg p-4"
              >
                <Typography
                  variant="h1"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  className={`text-xl md:text-2xl  text-left my-4`}
                >
                  Wishlist (43)
                </Typography>
                <Box
                  className="h-[400px]"
                  height="400px"
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
                    columns={produtCtolumns}
                    autoPageSize
                    checkboxSelection
                    components={{ Toolbar: GridToolbar }}
                  />
                </Box>
              </Box>
              <Box
                backgroundColor={colors.primary[400]}
                className="w-full flex flex-col gap-4 drop-shadow-lg  rounded-lg p-4"
              >
                <Typography
                  variant="h1"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  className={`text-xl md:text-2xl  text-left my-4`}
                >
                  Ratings & reviews (43)
                </Typography>
                <Box
                  className="h-[400px]"
                  height="400px"
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
                    columns={produtCtolumns}
                    autoPageSize
                    checkboxSelection
                    components={{ Toolbar: GridToolbar }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderDetailsForAdmin;
