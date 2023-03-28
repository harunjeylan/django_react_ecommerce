import React, { useEffect, useState, useTransition } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";

import {
  Box,
  Button,
  Typography,
  Breadcrumbs,
  CircularProgress,
} from "@mui/material";
import {
  useUploadImageMutation,
  useAddProductMutation,
  productApi,
  useUpdateProductMutation,
} from "../../../../../features/services/productApiSlice";
import { newProductSchema } from "./newProductSchema";
import { getInitialValues } from "./getInitialValues";

import ProductInformationForm from "./ProductInformationForm";
import InventoryForm from "./Inventory";
import OrganizeForm from "./OrganizeForm";
import VariantsForm from "./VariantsForm";
import Header from "../../../../../components/Header";
import { useDispatch } from "react-redux";

const AddEditProduct = ({ isEditing }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [uploadImage] = useUploadImageMutation();
  const [initialValues, setInitialValues] = useState({});
  const { productId } = useParams();

  useEffect(() => {
    if (productId && isEditing) {
      dispatch(
        productApi.endpoints.getProductsData.initiate({
          productId,
        })
      ).then((response) => {
        if (response.isSuccess) {
          // console.log(response.data);
          setInitialValues(response.data);
        }
      });
    }
  }, [productId, isEditing, dispatch]);

  const handleFormSubmit = (values) => {
    let data = values?.expiryDate?.date;
    let formattedDate;
    if (data.hasOwnProperty("format")) {
      formattedDate = data.hasOwnProperty("format");
    } else {
      let objectDate = new Date();
      formattedDate = `${objectDate.getFullYear()}-${objectDate.getMonth()}-${objectDate.getDate()}`;
    }
    const post = {
      ...values,
      expiryDate: {
        selected: values?.expiryDate?.selected,
        data: formattedDate,
      },
    };

    console.log(post);

    if (productId) {
      updateProduct({ post, productId }).then((res) => {
        let postForm = new FormData();
        postForm.append("thumbnail", values.thumbnail[0]?.file);
        values.images.forEach((image) => {
          postForm.append("images", image.file);
        });
        postForm.append("productId", res.data.id);
        uploadImage({
          post: postForm,
        }).then((response) => {
          console.log(response);
          navigate(`/admin/products/${productId}`);
        });
      });
    } else {
      addProduct({ post }).then((res) => {
        let postForm = new FormData();
        postForm.append("thumbnail", values.thumbnail[0]?.file);
        values.images.forEach((image) => {
          postForm.append("images", image.file);
        });
        postForm.append("productId", res.data.id);
        uploadImage({
          post: postForm,
        }).then((response) => {
          navigate(`/admin/products/${res.data.id}`);
        });
      });
    }
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
          initialValues={getInitialValues(initialValues)}
          validationSchema={newProductSchema}
          enableReinitialize={true}
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
                        initialValues={initialValues}
                        setInitialValues={setInitialValues}
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
                        initialValues={initialValues}
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
                    {productId && isEditing ? "Save Product" : "Create Product"}
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

export default AddEditProduct;
