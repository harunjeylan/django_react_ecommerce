import React from "react";
import { Box, Button, TextField,useTheme, Rating,Typography } from "@mui/material";
import Header from "./Header";
import { useMediaQuery } from "@mui/material";
import { tokens } from "../theme";
import { Formik } from "formik";
import * as yup from "yup";

const ReviewForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
  const handleFormSubmit = (values) => {
    console.log(values);
  };
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    reviewText: "",
  };
  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("Required"),
    rating: yup.number().required("Required"),
    lastName: yup.string().required("Required"),
    email: yup.string().email("Invalid email!").required("Required"),
    contact: yup
      .string()
      .matches(phoneRegExp, "phone number is not valid!")
      .required("Required"),
    reviewText: yup.string().required("Required"),
  });
  return (
    <Box className="w-full md:max-w-[80%] lg:max-w-[60%]">
      <Header title="Leave a review" />

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
          <form onSubmit={handleSubmit} >
            <Box className={`grid grid-cols-2 gap-4 my-4`}>
                <Rating
                    name="rating"
                    value={values.rating}
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
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                className={`col-span-1`}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
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
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                className={`col-span-2`}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Enter Your Review"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.reviewText}
                name="reviewText"
                error={!!touched.reviewText && !!errors.reviewText}
                helperText={touched.reviewText && errors.reviewText}
                className={`col-span-2`}
              />
            </Box>
            <Box>
              <Button type="submit" variant="outlined"
                color="secondary"
                className={`bg-opacity-0 hover:bg-opacity-100 px-[40px] py-2 ${
                "hover:bg-" + colors.greenAccent[400]
                }`}>
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
        <span className="bg-green-400/5 text-green-500 px-2 py-1 rounded-md">Note</span> This form shows usage of the classic Bootstrap form controls, not their underlined variants. You can choose whichever variant you want.
    </Typography>
        
    </Box>
    </Box>
  );
};
export default ReviewForm;