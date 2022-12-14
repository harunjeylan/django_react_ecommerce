import React from "react";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";

import { Box, Button, Typography, Breadcrumbs } from "@mui/material";

import { tokens, Header } from "../../../import";
import { useAddProductMutation } from "../../../import";

import { newProductSchema } from "./newProductSchema";
import { initialValues } from "./initialValues";

import ProductInformationForm from "./ProductInformationForm";
import InventoryForm from "./Inventory";
import OrganizeForm from "./OrganizeForm";
import VariantsForm from "./VariantsForm";

const NewProduct = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [addProduct] = useAddProductMutation();

  const handleFormSubmit = (values) => {
    console.log(values);
    addProduct({ post: values }).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <Box className={`flex flex-col gap-4 md:gap-8 md:mt-20 mb-10`}>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            onClick={() => navigate(`/`)}
            variant="text"
            color="secondary"
          >
            Admin Dashboard
          </Button>
          <Typography color="text.primary">New Product</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header title="CREATE PRODUCT" subtitle="Create a New product" />
      </Box>
      <Box className="md:container px-2 md:mx-auto md:px-auto">
        <Box
          sx={{
            "& .image-container": {
              padding: "5% 20% 10% 20% !important",
              zIndex: "1000000 !important",
              "& .full-screen-preview": {
                maxWidth: "60% !important",
              },
            },
          }}
        ></Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={newProductSchema}
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
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <Box className="flex flex-col gap-8 lg:gap-4 lg:flex-row">
                  <Box className="w-full lg:w-[60%]">
                    <Box className="w-full flex flex-col gap-8">
                      <ProductInformationForm
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        setFieldValue={setFieldValue}
                      />
                      <InventoryForm
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        setFieldValue={setFieldValue}
                      />
                    </Box>
                  </Box>

                  <Box className="w-full  lg:w-[40%]">
                    <Box className="flex flex-col gap-8 mt-8">
                      <OrganizeForm
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        setFieldValue={setFieldValue}
                      />
                      <VariantsForm
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        setFieldValue={setFieldValue}
                      />
                    </Box>
                  </Box>
                </Box>
                <Box className="flex justify-start my-4">
                  <Button
                    type="submit"
                    color="secondary"
                    variant="outlined"
                    className={`px-8 py-3 `}
                  >
                    Create New product
                  </Button>
                </Box>
              </form>
            </>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default NewProduct;
