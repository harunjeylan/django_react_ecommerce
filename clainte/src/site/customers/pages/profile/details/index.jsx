import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  Typography,
  Box,
  useTheme,
  Breadcrumbs,
  Button,
  Alert,
} from "@mui/material";

import ProfileCard from "../global/ProfileCard";
import ProfileDetailsForm from "./ProfileDetailsForm";
import ChangePasswordForm from "./ChangePasswordForm";

import {
  selectCurrentUser,
  setUserData,
} from "../../../../../features/auth/authSlice";
import {
  useUpdatePasswordMutation,
  useUpdatePersonalInfoMutation,
} from "../../../../../features/auth/authApiSlice";
import Header from "../../../../../components/Header";
import { tokens } from "../../../../../theme";
import useAlert from "../../../../../components/ui/useAlert";
import { useSnackbar } from "notistack";
const Profile = () => {
  const userData = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [CustomAlert, setMessages] = useAlert();
  const { enqueueSnackbar } = useSnackbar();
  const [updatePersonalInfo] = useUpdatePersonalInfoMutation();
  const [updatePassword] = useUpdatePasswordMutation();
  const [updating, setUpdating] = useState("");
  const getValue = (value) => {
    return value ? value : "";
  };
  const handlePersonalInfoFormSubmit = (values, actions) => {
    updatePersonalInfo(values).then((data) => {
      if (data?.error?.data) {
        setUpdating("PersonalInfo");
        Object.keys(data.error.data).forEach((key) => {
          setMessages((prev) => [
            ...prev,
            {
              id: key,
              variant: "error",
              description: data.error.data[key],
            },
          ]);
        });
      } else {
        dispatch(setUserData(data));
        enqueueSnackbar(`You have changed Personal Info successfully!`, {
          variant: "success",
        });
        actions.setTouched({});
        setUpdating("");
      }
    });
  };
  const handlePasswordSubmit = (values, actions) => {
    updatePassword(values).then((data) => {
      if (data?.error?.data) {
        setUpdating("Password");
        Object.keys(data.error.data).forEach((key) => {
          setMessages((prev) => [
            ...prev,
            {
              id: key,
              variant: "error",
              description: data.error.data[key],
            },
          ]);
        });
      } else {
        enqueueSnackbar(`You have changed Password successfully!`, {
          variant: "success",
        });
        actions.setTouched({});
        actions.resetForm();
        setUpdating("");
      }
    });
  };
  const PersonalDetailsInitialValues = {
    email: getValue(userData?.email),
    username: getValue(userData?.username),
    phone_number: getValue(userData?.phone_number),
    first_name: getValue(userData?.first_name),
    last_name: getValue(userData?.last_name),
    country: getValue(userData?.country),
    street1: getValue(userData?.street1),
    street2: getValue(userData?.street2),
    city: getValue(userData?.city),
    state: getValue(userData?.state),
    zipcode: getValue(userData?.zipcode),
  };
  const changeYourPasswordInitialValues = {
    old_password: "",
    new_password: "",
    passwordConfirmation: "",
  };

  return (
    <Box className={`flex flex-col gap-4 md:gap-8 mt-20 md:mt-40`}>
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
              {updating === "PersonalInfo" && <CustomAlert />}
              <Typography variant="h3" fontSize="18px">
                Personal details
              </Typography>
              <Formik
                onSubmit={handlePersonalInfoFormSubmit}
                initialValues={PersonalDetailsInitialValues}
                validationSchema={PersonalDetailsCheckoutSchema}
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
              {updating === "Password" && <CustomAlert />}
              <Typography variant="h3" fontSize="18px">
                Change your password
              </Typography>
              <Formik
                onSubmit={handlePasswordSubmit}
                initialValues={changeYourPasswordInitialValues}
                validationSchema={changeYourPasswordCheckoutSchema}
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
    </Box>
  );
};
const phoneRegExp = /^\+?1?\d{9,15}$/;
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
  phone_number: yup.string().matches(phoneRegExp, "phone number is not valid!"),
});
const changeYourPasswordCheckoutSchema = yup.object().shape({
  old_password: yup.string().required("required"),
  new_password: yup
    .string()
    .required("required")
    .matches(
      /(?=.*[a-zA-Z])/,
      "The string must contain at least 1 lowercase alphabetical character"
    )
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
    .required("required")
    .oneOf([yup.ref("new_password"), null], "Passwords must match"),
});
export default Profile;
