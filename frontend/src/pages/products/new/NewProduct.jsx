import React from "react";
import { Box, Button, Typography, Breadcrumbs } from "@mui/material";
import Header from "../../../components/Header";
import { useAddProductMutation } from "../../../redux/services/products";
import { Formik } from "formik";

import { useTheme } from "@emotion/react";
import { tokens } from "../../../theme";
import { useNavigate } from "react-router-dom";

import { newProductSchema } from "./newProductSchema";
import { initialValues } from "./initialValues";

import ProductInformationForm from "./ProductInformationForm";
import InventoryForm from "./InventoryForm";
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
    <Box className={``}>
      <Box className={`container mx-auto my-[40px]`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            onClick={() => navigate(`/`)}
            variant="text"
            color="secondary"
            className={`bg-opacity-0 hover:bg-opacity-100 px-4 py-2 ${
              "hover:bg-" + colors.greenAccent[400]
            }`}
          >
            Home
          </Button>
          <Typography color="text.primary">Shoping</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`container mx-auto py-[20px] rounded-lg my-4`}>
        <Header title="CREATE PRODUCT" subtitle="Create a New product" />
      </Box>
      <Box className="container mx-auto">
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
