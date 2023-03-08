import React from "react";
import {
  Box,
  Button,
  TextField,
  useTheme,
  Rating,
  Typography,
} from "@mui/material";
import Header from "./Header";
import { tokens } from "../theme";
import { Formik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
const ReviewForm = ({ handleReviewFormSubmit }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const user = useSelector(selectCurrentUser);

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
  const initialValues = {
    rating: "0",
    first_name: user?.first_name ? user?.first_name : "",
    last_name: user?.last_name ? user.last_name : "",
    email: user?.email ? user.email : "",
    phone_number: user?.phone_number ? user.phone_number : "",
    description: "",
  };
  const checkoutSchema = yup.object().shape({
    first_name: yup.string().required("Required"),
    rating: yup.number().required("Required"),
    last_name: yup.string().required("Required"),
    email: yup.string().email("Invalid email!").required("Required"),
    phone_number: yup
      .string()
      .matches(phoneRegExp, "phone number is not valid!"),
    description: yup.string().required("Required"),
  });
  return (
    <Box className="w-full md:max-w-[80%] lg:max-w-[60%]">
      <Header title="Leave a review" />

      <Formik
        onSubmit={handleReviewFormSubmit}
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
            <Box className={`grid grid-cols-2 gap-4 my-4`}>
              <Rating
                name="rating"
                // value={values.rating}
                onChange={handleChange}
                size="large"
                className={`col-span-2`}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.first_name}
                name="first_name"
                error={!!touched.first_name && !!errors.first_name}
                helperText={touched.first_name && errors.first_name}
                className={`col-span-1`}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.last_name}
                name="last_name"
                error={!!touched.last_name && !!errors.last_name}
                helperText={touched.last_name && errors.last_name}
                className={`col-span-1`}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                className={`col-span-2`}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone_number}
                name="phone_number"
                error={!!touched.phone_number && !!errors.phone_number}
                helperText={touched.phone_number && errors.phone_number}
                className={`col-span-2`}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Enter Your Review"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                className={`col-span-2`}
                multiline
                minRows={3}
              />
            </Box>
            <Box>
              <Button
                type="submit"
                variant="outlined"
                color="secondary"
                className={`bg-opacity-0 hover:bg-opacity-100 px-[40px] py-2 ${
                  "hover:bg-" + colors.greenAccent[400]
                }`}
              >
                Post Review
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <Box className="flex my-4">
        <Typography
          variant="subtitle"
          color={colors.grey[100]}
          fontWeight="bold"
        >
          <span className="bg-green-400/5 text-green-500 px-2 py-1 rounded-md">
            Note
          </span>{" "}
          This form shows usage of the classic Bootstrap form controls, not
          their underlined variants. You can choose whichever variant you want.
        </Typography>
      </Box>
    </Box>
  );
};
export default ReviewForm;
