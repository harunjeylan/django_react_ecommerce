import React from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";
import { useParams } from "react-router-dom";
import { Typography, Box, useTheme, Breadcrumbs, Button } from "@mui/material";

import Service from "../../../components/Service";
import ProfileCard from "../global/ProfileCard";
import ProfileDetailsForm from "./ProfileDetailsForm";
import ChangePasswordForm from "./ChangePasswordForm";

import { tokens, Header } from "../../../import";
import { useGetusersDetailesQuery } from "../../../import";
const Wishlist = () => {
  const navigate = useNavigate();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleFormSubmit = async (values, actions) => {
    actions.setTouched({});
  };

  const userId = 1;
  const { data: user, isFetching: isFetchingUser } = useGetusersDetailesQuery({
    userId,
  });
  // console.log(user);

  const initialValues = {
    PersonalDetails: {
      firstName: "",
      lastName: "",
      country: "",
      street1: "",
      street2: "",
      city: user?.address.address.city,
      state: user?.address.address.state,
      zipCode: user?.address.address.postalCode,
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
    <Box className={`flex flex-col gap-8 mt-20 md:mt-40c`}>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            onClick={() => navigate(`/`)}
            variant="text"
            color="secondary"
          >
            Home
          </Button>
          <Typography color="text.primary">Profile</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header title="Your Profile" subtitle="Lorem ipsum dolor sit amet" />
      </Box>

      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
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
                    <ProfileDetailsForm
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
            {!isFetchingUser && <ProfileCard user={user} />}
          </Box>
        </Box>
      </Box>

      <Box
        backgroundColor={colors.primary[400]}
        className="px-2 md:px-4 flex justify-center lg:px-auto py-[80px] items-center my-[50px]"
      >
        <Service />
      </Box>
    </Box>
  );
};

export default Wishlist;
