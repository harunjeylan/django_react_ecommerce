import React from "react";
import { Typography, Box, useTheme, Button } from "@mui/material";
import { tokens } from "../../theme";
import * as yup from "yup";
import { Formik } from "formik";
import PersonalDetailsForm from "./PersonalDetailsForm";
import ChangePasswordForm from "./ChangePasswordForm";
const ProfileCard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
          <form onSubmit={handleSubmit} className="flex flex-col  gap-4">
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
          <form onSubmit={handleSubmit} className="flex flex-col  gap-4">
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
  );
};

export default ProfileCard;
