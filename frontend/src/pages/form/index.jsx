import React from "react";
import { Box, Button, TextField } from "@mui/material";
import Header from "../../components/Header";
import { useMediaQuery } from "@mui/material";
import { useAddProductMutation } from "../../redux/services/products";
import { Formik } from "formik";
import * as yup from "yup";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
  const [addProduct, result] = useAddProductMutation();
  const handleFormSubmit = (values, actions) => {
    addProduct({ post: values }).then((res) => {
      console.log(res.data);
    });
  };
  const initialValues = {
    title: "",
    description: "",
    price: 0,
    brand: "",
    category: "",
    thumbnail: "",
  };
  const checkoutSchema = yup.object().shape({
    title: yup.string().required("Required"),
    description: yup.string().required("Required"),
    price: yup.number().required("Required"),
    brand: yup.string().required("Required"),
    category: yup.string().required("Required"),
  });
  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

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
          setFieldValue,
        }) => (
          <>
            <form action="/file-upload" class="dropzone">
              <div class="fallback">
                <input name="file" type="file" multiple />
              </div>
            </form>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.title}
                  name="title"
                  error={!!touched.title && !!errors.title}
                  helperText={touched.title && errors.title}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Category"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.category}
                  name="category"
                  error={!!touched.category && !!errors.category}
                  helperText={touched.category && errors.category}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  name="description"
                  error={!!touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Brand"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.brand}
                  name="brand"
                  error={!!touched.brand && !!errors.brand}
                  helperText={touched.brand && errors.brand}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="price"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.price}
                  name="price"
                  error={!!touched.price && !!errors.price}
                  helperText={touched.price && errors.price}
                  sx={{ gridColumn: "span 2" }}
                />
                <input
                  type="file"
                  name="thumbnail"
                  accept="image/*"
                  onChange={(e) =>
                    setFieldValue("thumbnail", e.currentTarget.files[0])
                  }
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Create New User
                </Button>
              </Box>
            </form>
          </>
        )}
      </Formik>
    </Box>
  );
};

export default Form;
