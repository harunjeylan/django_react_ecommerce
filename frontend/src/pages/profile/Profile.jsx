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
import Header3 from "../../components/Header3";

import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ProfileCard from "./ProfileCard";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import * as yup from "yup";
import { Formik } from "formik";
import PersonalDetailsForm from "./PersonalDetailsForm";
import ChangePasswordForm from "./ChangePasswordForm";
import {
  decreaseCount,
  setCount,
  increaseCount,
  removeFromCart,
} from "../../redux/services/cartReducer";
import Service from "../../components/Service";

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.price;
  }, 0);
  const handleFormSubmit = async (values, actions) => {
    actions.setTouched({});
  };
  const initialValues = {
    PersonalDetails: {
      firstName: "",
      lastName: "",
      country: "",
      street1: "",
      street2: "",
      city: "",
      state: "",
      zipCode: "",
      email: "",
      phoneNumber: "",
    },
    changeYourPassword: {
      oldPassword: "",
      newPassword: "",
      retypeNewPassword: "",
    },
  };
  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
  // YupPassword(yup);
  const checkoutSchema = yup.object().shape({
    PersonalDetails: yup.object().shape({
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      country: yup.string().required("required"),
      street1: yup.string().required("required"),
      street2: yup.string(),
      city: yup.string().required("required"),
      state: yup.string().required("required"),
      zipCode: yup.string().required("required"),
      email: yup.string().required("required"),
      phoneNumber: yup
        .string()
        .matches(phoneRegExp, "phone number is not valid!")
        .required("required"),
    }),
    changeYourPassword: yup.object().shape({
      oldPassword: yup.string().required("required"),
      newPassword: yup
        .string()
        .required("required")
        .min(
          8,
          "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
        ),
      // .minLowercase(1, "password must contain at least 1 lower case letter")
      // .minUppercase(1, "password must contain at least 1 upper case letter")
      // .minNumbers(1, "password must contain at least 1 number")
      // .minSymbols(1, "password must contain at least 1 special character"),
      passwordConfirmation: yup
        .string()
        .oneOf([yup.ref("newPassword"), null], "Passwords must match")
        .required("required"),
    }),
  });
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
          <Typography color="text.primary">Profile</Typography>
        </Breadcrumbs>
       <Box className={`container mx-auto py-[20px] rounded-lg my-4`}>
          <Header3
            title="Your Profile"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt."
          />
        </Box>
      </Box>

      <Box className={`container mx-auto`}>
        <Box className="flex flex-col-reverse  gap-8 md:flex-row">
          <Box className="w-full md:max-w-[60%]  lg:max-w-[70%]">
            <Box className="flex flex-col  gap-4">
              <Typography variant="h3" fontSize="18px">
                Personal details
              </Typography>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
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
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col  gap-4"
                  >
                    <PersonalDetailsForm
                      type="PersonalDetails"
                      values={values.PersonalDetails}
                      touched={touched}
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                    />
                    <Button
                      fullWidth
                      type="submit"
                      variant="outlined"
                      color="secondary"
                      className={` px-[40px] py-2`}
                    >
                      Save Change
                    </Button>
                  </form>
                )}
              </Formik>

              <Typography variant="h3" fontSize="18px">
                Change your password
              </Typography>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
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
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col  gap-4"
                  >
                    <ChangePasswordForm
                      type="changeYourPassword"
                      values={values.changeYourPassword}
                      touched={touched}
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                    />
                    <Button
                      fullWidth
                      type="submit"
                      variant="outlined"
                      color="secondary"
                      className={` px-[40px] py-2`}
                    >
                      Change Password
                    </Button>
                  </form>
                )}
              </Formik>
            </Box>
          </Box>

          <Box className="w-full md:max-w-[40%]   lg:max-w-[30%]">
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
