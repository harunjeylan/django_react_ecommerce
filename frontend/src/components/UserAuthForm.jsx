import React, { useContext } from "react";
import * as yup from "yup";
import { Formik } from "formik";

import {
  TextField,
  Box,
  useTheme,
  Typography,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { tokens } from "../theme";

const UserLoginForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const initialValues = {
    username: "",
    password: "",
  };
  const checkoutSchema = yup.object().shape({
    username: yup.string().required("required"),
    password: yup.string().required("required"),
  });
  const handleFormSubmit = (values) => {
    console.log(values);
  };
  return (
    <Box>
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
        }) => (
          <form onSubmit={handleSubmit}>
            <Box className="flex flex-col gap-4 drop-shadow-lg  rounded-lg">
              <Box className="flex flex-col gap-4 px-4 py-2 ">
                <TextField
                  fullWidth
                  variant="filled"
                  type="username"
                  label="User name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  name={"username"}
                  error={!!touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.newPassword}
                  name={"password"}
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />
                <Button
                  type="submit"
                  variant="outlined"
                  size="medium"
                  color="secondary"
                  className="w-full py-2"
                >
                  Login
                </Button>
                <Box className="flex justify-end px-4 pt-2 ">
                  <Typography>Forgate Password</Typography>
                </Box>
              </Box>
            </Box>
            <Divider />
          </form>
        )}
      </Formik>
      <Box className="flex gap-4 px-4 py-2 ">
        <Button
          variant="outlined"
          color="error"
          size="medium"
          startIcon={<GoogleIcon className="text-red" size="large" />}
          className="w-full py-2"
        >
          Google
        </Button>
      </Box>
    </Box>
  );
};

const UserRegisterForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const initialValues = {
    username: "",
    password: "",
  };
  const checkoutSchema = yup.object().shape({
    username: yup.string().required("required"),
    password: yup.string().required("required"),
  });
  const handleFormSubmit = (values) => {
    console.log(values);
  };
  return (
    <Box>
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
        }) => (
          <form onSubmit={handleSubmit}>
            <Box className="flex flex-col gap-4 drop-shadow-lg  rounded-lg">
              <Box className="flex flex-col gap-4 px-4 py-2 ">
                <TextField
                  fullWidth
                  variant="filled"
                  type="username"
                  label="User name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  name={"username"}
                  error={!!touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.newPassword}
                  name={"password"}
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />
                <Button
                  type="submit"
                  variant="outlined"
                  size="medium"
                  color="secondary"
                  className="w-full py-2"
                >
                  Login
                </Button>
                <Box className="flex justify-end px-4 pt-2 ">
                  <Typography>Forgate Password</Typography>
                </Box>
              </Box>
            </Box>
            <Divider />
          </form>
        )}
      </Formik>
      <Box className="flex gap-4 px-4 py-2 ">
        <Button
          variant="outlined"
          color="error"
          size="medium"
          startIcon={<GoogleIcon className="text-red" size="large" />}
          className="w-full py-2"
        >
          Google
        </Button>
      </Box>
    </Box>
  );
};

export { UserLoginForm, UserRegisterForm };
