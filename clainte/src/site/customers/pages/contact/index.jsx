import React from "react";
import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import Header2 from "../../../../components/Header2";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../../theme";
import { contact } from "../../../../data/staticData";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../features/auth/authSlice";
import * as yup from "yup";

const Contact = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const user = useSelector(selectCurrentUser);

  const phoneRegExp = /^\+?1?\d{9,15}$/;
  const initialValues = {
    first_name: user?.first_name ? user?.first_name : "",
    last_name: user?.last_name ? user.last_name : "",
    email: user?.email ? user.email : "",
    phone_number: user?.phone_number ? user.phone_number : "",
    description: "",
  };
  const checkoutSchema = yup.object().shape({
    first_name: yup.string().required("Required"),
    last_name: yup.string().required("Required"),
    email: yup.string().email("Invalid email!").required("Required"),
    phone_number: yup
      .string()
      .matches(phoneRegExp, "phone number is not valid!"),
    description: yup.string().required("Required"),
  });
  const handleContactFormSubmit = (values) => {
    console.log(values);
  };
  return (
    <Box className="">
      <Box className={`flex flex-col gap-4 md:gap-8 mt-10 md:mt-20`}>
        <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
          <Breadcrumbs aria-label="breadcrumb">
            <Button
              onClick={() => navigate(`/`)}
              variant="text"
              color="secondary"
            >
              Home
            </Button>
            <Typography color="text.primary">Contact</Typography>
          </Breadcrumbs>
        </Box>
        <Box className={`md:container w-full px-2 md:mx-auto md:px-auto my-4`}>
          <Box
            className={`w-full px-2 md:mx-auto md:px-auto my-12  flex flex-col md:flex-row`}
          >
            <Box className="w-full flex flex-col items-start gap-4 px-4 py-2 md:w-1/2">
              <Box className="w-full flex flex-col items-start gap-4 px-4 py-8">
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  className={`text-3xl md:text-4xl`}
                >
                  Contact Us
                </Typography>
              </Box>
              <Divider sx={{ backgroundColor: colors.grey[400] }} />
              <Box className="flex flex-col items-start gap-1">
                <Typography variant="h5" fontWeight="bold">
                  <EmailOutlinedIcon fontSize="medium" /> <strong>Email</strong>
                </Typography>
                <Typography variant="h5" fontWeight="bold" className="ml-6">
                  <p>{contact.email}</p>
                </Typography>
              </Box>
              <Box className="flex flex-col items-start gap-1">
                <Typography variant="h5" fontWeight="bold">
                  <LocationOnOutlinedIcon fontSize="medium" />{" "}
                  <strong>Address</strong>
                </Typography>
                <Typography variant="h5" fontWeight="bold" className="ml-6">
                  <p>{contact.address}</p>
                </Typography>
              </Box>
              <Box className="flex flex-col items-start gap-1">
                <Typography variant="h5" fontWeight="bold">
                  <LocalPhoneOutlinedIcon fontSize="medium" />{" "}
                  <strong>phone</strong>
                </Typography>
                <Typography variant="h5" fontWeight="bold" className="ml-6">
                  <p>{contact.phone}</p>
                </Typography>
              </Box>
            </Box>
            <Box className="flex flex-col items-start gap-8 px-4 py-2 md:w-1/2">
              <Box className="flex flex-col items-start gap-4 px-4 py-8">
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  className={`text-3xl md:text-4xl`}
                >
                  Get In Touch
                </Typography>
                <Typography
                  variant="h4"
                  className={`text-md md:text-lg`}
                  color={colors.greenAccent[400]}
                >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic
                  pariatur nobis doloribus alias quam enim suscipit provident
                  similique laudantium reprehenderit!
                </Typography>
              </Box>
              <Box className="relative w-fit h-fit">
                <Box
                  className="md:absolute w-full md:w-[600px] rounded-md p-4"
                  backgroundColor={colors.primary[400]}
                >
                  <Formik
                    onSubmit={handleContactFormSubmit}
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
                      <form onSubmit={handleSubmit} className="w-full">
                        <Box className={`grid grid-cols-2 gap-4 my-4 w-full`}>
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
                            error={
                              !!touched.phone_number && !!errors.phone_number
                            }
                            helperText={
                              touched.phone_number && errors.phone_number
                            }
                            className={`col-span-2`}
                          />
                          <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Enter Your Message"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.description}
                            name="description"
                            error={
                              !!touched.description && !!errors.description
                            }
                            helperText={
                              touched.description && errors.description
                            }
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
                            Send Message
                          </Button>
                        </Box>
                      </form>
                    )}
                  </Formik>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className=" w-full md:mt-[180px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1435.7708390313983!2d39.290705464536146!3d8.560940676134493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2set!4v1673867835073!5m2!1sen!2set"
          // width="800"
          height="500"
          className="rounded-lg w-full"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Box>
    </Box>
  );
};

export default Contact;
