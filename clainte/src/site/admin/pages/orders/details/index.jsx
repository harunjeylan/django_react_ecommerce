import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Typography,
  Breadcrumbs,
  useTheme,
  MenuItem,
  InputLabel,
  FormControl,
  FormLabel,
  FormGroup,
  Select,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

import { useGetOrderDetailsForAdminQuery } from "../../../../../features/services/orderApiSlice";
import { tokens } from "../../../../../theme";
import Header from "../../../../../components/Header";
import OrderSummery from "../../../../../components/OrderSummery";

const OrderDetailsForAdmin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { data: orderData, isFetching: isFetchingOrder } =
    useGetOrderDetailsForAdminQuery({ orderId: orderId });

  console.log(orderData);
  const orderStateInitialValues = {
    paymentStatus: "",
    fulfillmentStatus: "",
  };
  const orderStateSchema = yup.object().shape({
    paymentStatus: yup.string().required("Required"),
    fulfillmentStatus: yup.string().required("Required"),
  });
  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const columns = [
    {
      field: "title",
      headerName: "Product Name",
      width: 300,
      height: 200,
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
      field: "variants",
      headerName: "Variants",
      width: 350,
      renderCell: ({ row: { variants } }) => {
        return (
          <Box className="flex gap-4 items-center py-2 w-full h-full">
            {variants?.map((variant, index) => (
              <Typography key={index}>
                <strong>{variant.variantLabel} : </strong>
                <span> {variant.optionLabel} </span>,
              </Typography>
            ))}
          </Box>
        );
      },
    },
    {
      field: "sale_pricing",
      headerName: "Price",
      renderCell: ({ row: { sale_pricing } }) => {
        return <Typography>{sale_pricing}</Typography>;
      },
    },
    { field: "count", headerName: "Quantity", width: 150 },

    {
      field: "total",
      headerName: "Total",
      width: 150,
      renderCell: ({ row: { sale_pricing, count } }) => {
        return <Typography>${(sale_pricing * count).toFixed(2)}</Typography>;
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
          <Typography color="text.primary">Order # {orderId}</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header title={`Order # ${orderId}`} subtitle="Customer ID : 2364847" />
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Box className="flex flex-col lg:flex-row gap-4">
          <Box className="w-full lg:w-[70%]">
            <Box className="flex flex-col gap-8">
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
                {!isFetchingOrder ? (
                  orderData?.products?.length ? (
                    <DataGrid
                      density="comfortable"
                      rows={orderData?.products}
                      columns={columns}
                      autoPageSize
                      checkboxSelection
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
              <Box className="grid  xl:grid-cols-3 gap-4">
                <Box className="flex flex-col gap-4">
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
                          <Link to={`/admin/customers/${orderData?.customer}`}>
                            <Typography sx={{ color: colors.greenAccent[500] }}>
                              {orderData?.billing_address?.first_name}{" "}
                              {orderData?.billing_address?.last_name}
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
                          <Link to={`/admin/customers/${orderData?.customer}`}>
                            <Typography sx={{ color: colors.greenAccent[500] }}>
                              {orderData?.billing_address?.email}
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
                          <Link to={`/admin/customers/${orderData?.customer}`}>
                            <Typography sx={{ color: colors.greenAccent[500] }}>
                              {orderData?.billing_address?.phone_number}
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
                            {orderData?.billing_address?.street1}
                            {", "}
                            {orderData?.billing_address?.country}
                            {", "}
                            {orderData?.billing_address?.city}
                            {", "}
                            {orderData?.billing_address?.state}
                            {", "}
                            {orderData?.billing_address?.zipcode}
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                </Box>
                <Box className="flex flex-col gap-4">
                  <Typography
                    variant="h1"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    className={`text-xl md:text-2xl  text-left my-4`}
                  >
                    Shipping details
                  </Typography>
                  <List className="w-full">
                    <ListItem>
                      <ListItemIcon>
                        <PersonOutlineOutlinedIcon size="large" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Customer"
                        secondary={
                          <Link to={`/admin/customers/${orderData?.customer}`}>
                            <Typography sx={{ color: colors.greenAccent[500] }}>
                              {orderData?.shipping_address?.first_name}{" "}
                              {orderData?.shipping_address?.last_name}
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
                          <Link to={`/admin/customers/${orderData?.customer}`}>
                            <Typography sx={{ color: colors.greenAccent[500] }}>
                              {orderData?.shipping_address?.email}
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
                          <Link to={`/admin/customers/${orderData?.customer}`}>
                            <Typography sx={{ color: colors.greenAccent[500] }}>
                              {orderData?.shipping_address?.phone_number}
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
                            {orderData?.shipping_address?.street1}
                            {", "}
                            {orderData?.shipping_address?.country}
                            {", "}
                            {orderData?.shipping_address?.city}
                            {", "}
                            {orderData?.shipping_address?.state}
                            {", "}
                            {orderData?.shipping_address?.zipcode}
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                </Box>
                <Box className="flex flex-col gap-4">
                  <Typography
                    variant="h1"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    className={`text-xl md:text-2xl  text-left my-4`}
                  >
                    Other details
                  </Typography>
                  <List className="w-full">
                    <ListItem>
                      <ListItemIcon>
                        <CardGiftcardOutlinedIcon size="large" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Gift order"
                        secondary={<Typography>Yes</Typography>}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <ReceiptLongOutlinedIcon size="large" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Recipient"
                        secondary={<Typography>Monjito Shiniga</Typography>}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <EmailOutlinedIcon size="large" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Gift Meaasge"
                        secondary={
                          <Typography>
                            Happy Birthday Shiniga Lots of Love Buga Buga!!
                            Yours, Mekalan
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="w-full lg:w-[30%]">
            <Box className="flex flex-col gap-4">
              <OrderSummery totalPrice={orderData?.total_price} />
              <Box
                backgroundColor={colors.primary[400]}
                className="drop-shadow-lg  rounded-lg p-4"
              >
                <Formik
                  onSubmit={handleFormSubmit}
                  initialValues={orderStateInitialValues}
                  validationSchema={orderStateSchema}
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
                              Order Status
                            </Typography>
                          </FormLabel>
                          <FormGroup className="w-full grid grid-cols-2  lg:grid-cols-1 xl:grid-cols-2 gap-2">
                            <Box className="w-full">
                              <Box className="w-full px-1">
                                <Typography
                                  variant="h6"
                                  fontWeight="bold"
                                  className="my-2"
                                >
                                  Payment status
                                </Typography>
                              </Box>
                              <FormControl variant="filled" className="w-full">
                                <InputLabel id="paymentStatus-select-label">
                                  Payment status
                                </InputLabel>
                                <Select
                                  fullWidth
                                  color="secondary"
                                  labelId="paymentStatus-select-label"
                                  id="paymentStatus-select"
                                  variant="filled"
                                  value={values.paymentStatus}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  name="paymentStatus"
                                >
                                  <MenuItem value="Canceled">Canceled</MenuItem>
                                  <MenuItem value="Completed">
                                    Completed
                                  </MenuItem>
                                  <MenuItem value="Processing">
                                    Processing
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                            <Box className="w-full">
                              <Box className="w-full px-1">
                                <Typography
                                  variant="h6"
                                  fontWeight="bold"
                                  className="my-2"
                                >
                                  Fulfillment status
                                </Typography>
                              </Box>
                              <FormControl variant="filled" className="w-full">
                                <InputLabel id="fulfillmentStatus-select-label">
                                  Fulfillment status
                                </InputLabel>
                                <Select
                                  fullWidth
                                  color="secondary"
                                  labelId="fulfillmentStatus-select-label"
                                  id="fulfillmentStatus-select"
                                  variant="filled"
                                  value={values.fulfillmentStatus}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  name="fulfillmentStatus"
                                >
                                  <MenuItem value="Unfulfiled">
                                    Unfulfiled
                                  </MenuItem>
                                  <MenuItem value="Fulfiled">Fulfiled</MenuItem>
                                  <MenuItem value="Pending">Pending</MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                          </FormGroup>
                        </FormControl>
                      </form>
                    </>
                  )}
                </Formik>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderDetailsForAdmin;
