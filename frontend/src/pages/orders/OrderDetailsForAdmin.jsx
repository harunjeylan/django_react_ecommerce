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
import { mockDataProducts } from "../../data/mockData";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";
const OrderDetailsForAdmin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { orderId } = useParams();

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
      field: "name",
      headerName: "Product Name",
      width: 360,
      hieght: 200,
      renderCell: ({ row: {id, title, thumbnail } }) => {
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
          <Typography color="text.primary">Order # {orderId}</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`container mx-auto py-[20px] my-4 `}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title={`Order # ${orderId}`}
            subtitle="Customer ID : 2364847"
          />
        </Box>
        <Box className="flex flex-col lg:flex-row gap-4">
          <Box className="w-full lg:w-[70%]">
            <Box className="flex flex-col gap-8">
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
                  rows={mockDataProducts.slice(0, 10)}
                  columns={columns}
                  autoPageSize
                  checkboxSelection
                  components={{ Toolbar: GridToolbar }}
                />
              </Box>
              <Box className="grid grid-rows-3  xl:grid-cols-3 gap-4">
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
                          <Link to={`admin/customers/id`}>
                            <Typography sx={{ color: colors.greenAccent[500] }}>
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
                            <Typography sx={{ color: colors.greenAccent[500] }}>
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
                            <Typography sx={{ color: colors.greenAccent[500] }}>
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
                            Shatinon Mekalan Vancouver, British Columbia, Canada
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
                        <EmailOutlinedIcon size="large" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Email"
                        secondary={
                          <Link to={`admin/customers/id`}>
                            <Typography sx={{ color: colors.greenAccent[500] }}>
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
                            <Typography sx={{ color: colors.greenAccent[500] }}>
                              +1234567890
                            </Typography>
                          </Link>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <ShoppingBagOutlinedIcon size="large" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Shipping Date"
                        secondary={<Typography>12 Nov, 2021</Typography>}
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
                            Shatinon Mekalan Vancouver, British Columbia, Canada
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
              <OrderSummery totalPrice={2503} />
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
