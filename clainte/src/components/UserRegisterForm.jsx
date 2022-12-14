import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import {
  TextField,
  Box,
  useTheme,
  Typography,
  Divider,
  Button,
  Alert,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { tokens } from "../theme";

import { logOut, setUser } from "../features/auth/authSlice";
import { useRegisterMutation } from "../features/auth/authApiSlice";

const UserRegisterForm = ({
  handleCloseAccountDialog = undefined,
  handleClickOpenAccountDialog = undefined,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [errorMessage, setErrorMessage] = useState("");

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
    password2: yup
      .string()
      .required("required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const [register] = useRegisterMutation();
  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      const user = await register({ ...values }).unwrap();

      if (user.access && user.user) {
        dispatch(setUser(user));
        setErrorMessage("");
        console.log(handleCloseAccountDialog);
        if (handleCloseAccountDialog !== undefined) {
          handleCloseAccountDialog();
        }
        resetForm();
        navigate(from, { replace: true });
      } else {
        setErrorMessage(user?.detail);
        dispatch(logOut());
      }
    } catch (err) {
      setErrorMessage(err?.data?.detail);
      dispatch(logOut());
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
                <Box>
                  {errorMessage !== "" && (
                    <Alert severity="error">{errorMessage}</Alert>
                  )}
                </Box>
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
                  Register
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
              onClick={() => {
                handleClickOpenAccountDialog !== undefined
                  ? handleClickOpenAccountDialog("login")
                  : navigate("/auth/login");
              }}
              className=""
              color="secondary"
              variant="link"
            >
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserRegisterForm;
