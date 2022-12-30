import React, { useContext, useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useLocation, Link } from "react-router-dom";
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
import {
  useLoginMutation,
  useRegisterMutation,
} from "../features/auth/authApiSlice";

const UserLoginForm = ({
  handleCloseAccountDialog,
  handleClickOpenAccountDialog,
}) => {
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
      <Box className="flex flex-col gap-4 px-4 py-2 my-4 mb-8">
        <Box className="flex flex-col gap-4">
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
        <Box>
          <Box className="flex justify-start items-center gap-4 px-4 pt-2 mb-4">
            <Typography>I don't have anchorEl account </Typography>{" "}
            <Button
              onClick={() => handleClickOpenAccountDialog("register")}
              className=""
              color="secondary"
              variant="link"
            >
              Register
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const UserRegisterForm = ({
  handleCloseAccountDialog,
  handleClickOpenAccountDialog,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const userRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [errorMessage, setErrormessage] = useState("");

  const initialValues = {
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
  };

  const checkoutSchema = yup.object().shape({
    first_name: yup.string().required("required"),
    last_name: yup.string().required("required"),
    username: yup.string().required("required"),
    password: yup
      .string()
      .required("required")
      .matches(
        /(?=.*[a-z])/,
        "The string must contain at least 1 lowercase alphabetical character"
      )
      .matches(
        /(?=.*[A-Z])/,
        "The string must contain at least 1 uppercase alphabetical character"
      )
      .matches(
        /(?=.*[0-9])/,
        "The string must contain at least 1 numeric character"
      )
      .matches(
        /(?=.*[!@#%^&*<>/_?])/,
        "The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict"
      )
      .matches(/(?=.{8,})/, "The string must be eight characters or longer"),
    password2: yup
      .string()
      .required("required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const [register, { isLoading }] = useRegisterMutation();
  const handleFormSubmit = async (values, { setFieldValue }) => {
    try {
      const userData = await register({ ...values }).unwrap();

      if (userData.isCreated) {
        dispatch(setCredentials(userData));
        setErrormessage("");
        setFieldValue("username", "");
        setFieldValue("first_name", "");
        setFieldValue("last_name", "");
        setFieldValue("password", "");
        setFieldValue("password2", "");
        if (handleCloseAccountDialog !== null) {
          handleCloseAccountDialog();
        }
        navigate(from, { replace: true });
      } else {
        console.log(userData);
      }
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
                  type="first_name"
                  label="first name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.first_name}
                  name={"first_name"}
                  error={!!touched.first_name && !!errors.first_name}
                  helperText={touched.first_name && errors.first_name}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="last_name"
                  label="last name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.last_name}
                  name={"last_name"}
                  error={!!touched.last_name && !!errors.last_name}
                  helperText={touched.last_name && errors.last_name}
                />
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
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="repeat Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.newPassword}
                  name={"password2"}
                  error={!!touched.password2 && !!errors.password2}
                  helperText={touched.password2 && errors.password2}
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

                <Box className="flex justify-start px-4 pt-2 ">
                  <Typography>Remember me</Typography>
                </Box>
              </Box>
            </Box>
            <Divider />
          </form>
        )}
      </Formik>
      <Box className="flex flex-col gap-4 px-4 py-2 my-4 mb-8">
        <Box className="flex flex-col gap-4">
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
        <Box>
          <Box className="flex justify-start items-center gap-4 px-4 pt-2 mb-4">
            <Typography>I have already account </Typography>{" "}
            <Button
              onClick={() => handleClickOpenAccountDialog("login")}
              className=""
              color="secondary"
              variant="link"
            >
              Register
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export { UserLoginForm, UserRegisterForm };
