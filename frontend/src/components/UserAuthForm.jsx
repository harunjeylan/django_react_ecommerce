import React, { useContext, useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import {
  TextField,
  Box,
  useTheme,
  Typography,
  IconButton,
  Divider,
  Button,
  Alert,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { tokens } from "../theme";

import { setCredentials, setUser } from "../features/auth/authSlice";
import { useLoginMutation } from "../features/auth/authApiSlice";

const UserLoginForm = ({ handleCloseAccountDialog = null }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const userRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [errorMessage, setErrormessage] = useState("");
  useEffect(() => {
    userRef.current.focus();
  }, []);

  const initialValues = {
    username: "",
    password: "",
  };

  const loginSchema = yup.object().shape({
    username: yup.string().required("required"),
    password: yup.string().required("required"),
  });

  const [login, { isLoading }] = useLoginMutation();

  const handleFormSubmit = async (values, { setFieldValue }) => {
    try {
      const userData = await login({ ...values }).unwrap();
      dispatch(setCredentials(userData));
      setErrormessage("");
      setFieldValue("username", "");
      setFieldValue("password", "");
      if (handleCloseAccountDialog !== null) {
        handleCloseAccountDialog();
      }
      navigate(from, { replace: true });
    } catch (err) {
      if (err?.status === 400) {
        setErrormessage("Missing Username or Password");
      } else if (err?.status === 401) {
        setErrormessage("Unauthorized");
      } else {
        setErrormessage(err?.date?.detail);
      }
      console.log(err);
    }
  };

  return (
    <Box>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={loginSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={(newValues) => handleSubmit(newValues, resetForm)}>
            <Box className="flex flex-col gap-4 drop-shadow-lg  rounded-lg">
              <Box className="flex flex-col gap-4 px-4 py-2 ">
                <Box>
                  {errorMessage !== "" && (
                    <Alert severity="error">{errorMessage}</Alert>
                  )}
                </Box>
                <TextField
                  fullWidth
                  ref={userRef}
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
