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
import CloseIcon from "@mui/icons-material/Close";

import { tokens } from "../import";
import { LayoutContext } from "./LayoutContext";

const UserLoginForm = ({
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
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
        <Button type="submit" variant="outlined" color="secondary">
          Login
        </Button>
        <Divider />
      </Box>
      <Box className="flex justify-between px-4 pt-2 "></Box>
    </Box>
  );
};

const UserRegisterForm = ({
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
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
        <Button type="submit" variant="outlined" color="secondary">
          Login
        </Button>
        <Divider />
      </Box>
      <Box className="flex justify-between px-4 pt-2 "></Box>
    </Box>
  );
};

const AccountDialog = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { openAccountDialog } = useContext(LayoutContext);
  const { handleCloseAccountDialog } = useContext(LayoutContext);

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
    <Box
      className={`${
        openAccountDialog ? "fixed" : "hidden"
      } bg-black/20 z-[1000] w-full h-full left-0 top-[60px] ease-in-out`}
    >
      <Box
        backgroundColor={colors.primary[400]}
        open={openAccountDialog}
        onClose={handleCloseAccountDialog}
        className="mx-auto mt-4 w-[400px] max-w-[90%] rounded-lg"
      >
        <Box className="px-4 py-4 flex justify-between items-center ease-in-out">
          <Typography
            variant="h1"
            color={colors.grey[100]}
            fontWeight="bold"
            className={`text-xl md:text-2xl  text-left my-4`}
          >
            Order Summary
          </Typography>
          <Box>
            <IconButton onClick={handleCloseAccountDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
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
              <UserLoginForm
                values={values}
                touched={touched}
                errors={errors}
                handleBlur={handleBlur}
                handleChange={handleChange}
              />
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default AccountDialog;
