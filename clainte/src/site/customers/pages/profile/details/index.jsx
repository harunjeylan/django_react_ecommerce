import React from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Typography, Box, useTheme, Breadcrumbs, Button } from "@mui/material";

import Service from "../../../components/Service";
import ProfileCard from "../global/ProfileCard";
import ProfileDetailsForm from "./ProfileDetailsForm";
import ChangePasswordForm from "./ChangePasswordForm";

import {
  tokens,
  Header,
  selectCurrentUser,
  useUpdatePersonalInfoMutation,
} from "../../../import";

const Profile = () => {
  const navigate = useNavigate();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleFormSubmit = async (values, actions) => {
    actions.setTouched({});
  };
  const getValue = (value) => {
    return value ? value : "";
  };
  const userData = useSelector(selectCurrentUser);
  // console.log(userData);

  const [updatePersonalInfo] = useUpdatePersonalInfoMutation();
  const handlePersonalInfoFormSubmit = async (values, actions) => {
    // console.log(values);
    actions.setTouched({});
    updatePersonalInfo(values);
  };
  const PersonalDetailsInitialValues = {
    first_name: getValue(userData?.first_name),
    last_name: getValue(userData?.last_name),
    email: getValue(userData?.email),
    username: getValue(userData?.username),
    country: getValue(userData?.country),
    street1: getValue(userData?.street1),
    street2: getValue(userData?.street2),
    city: getValue(userData?.city),
    state: getValue(userData?.state),
    zipcode: getValue(userData?.zipcode),
    phone_number: getValue(userData?.phone_number),
  };
  const changeYourPasswordInitialValues = {
    oldPassword: "",
    newPassword: "",
    retypeNewPassword: "",
  };

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
  // YupPassword(yup);
  const PersonalDetailsCheckoutSchema = yup.object().shape({
    first_name: yup.string().required("required"),
    last_name: yup.string().required("required"),
    username: yup.string().required("required"),
    country: yup.string(),
    street1: yup.string(),
    street2: yup.string(),
    city: yup.string(),
    state: yup.string(),
    zipcode: yup.string(),
    email: yup.string(),
    phone_number: yup
      .string()
      .matches(phoneRegExp, "phone number is not valid!"),
  });
  const changeYourPasswordCheckoutSchema = yup.object().shape({
    oldPassword: yup.string().required("required"),
    newPassword: yup
      .string()
      .required("required")
      .matches(
        /(?=.*[a-z])/,
        "The string must contain at least 1 lowercase alphabetical character"
      )
      // .matches(
      //   /(?=.*[A-Z])/,
      //   "The string must contain at least 1 uppercase alphabetical character"
      // )
      .matches(
        /(?=.*[0-9])/,
        "The string must contain at least 1 numeric character"
      )
      .matches(
        /(?=.*[!@#%^&*<>/_?,.:"'$%^&*)=+()])/,
        "The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict"
      )
      .matches(/(?=.{8,})/, "The string must be eight characters or longer"),

    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords must match")
      .required("required"),
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
                onSubmit={handlePersonalInfoFormSubmit}
                initialValues={PersonalDetailsInitialValues}
                // validationSchema={PersonalDetailsCheckoutSchema}
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
                      values={values}
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
                initialValues={changeYourPasswordCheckoutSchema}
                // validationSchema={checkoutSchema}
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
                      values={values}
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
            {userData && <ProfileCard userData={userData} />}
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

export default Profile;
