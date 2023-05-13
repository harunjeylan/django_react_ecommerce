import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Formik } from 'formik'

import { Box, Button, Typography, Breadcrumbs } from '@mui/material'
import {
  useUploadImageMutation,
  useAddProductMutation,
  productApi,
  useUpdateProductMutation,
} from '../../../../../features/services/productApiSlice'
import { newProductSchema } from './newProductSchema'
import { useInitialValues } from './useInitialValues'
import useAlert from '../../../../../components/ui/useAlert'
import ProductInformationForm from './ProductInformationForm'
import InventoryForm from './Inventory'
import OrganizeForm from './OrganizeForm'
import VariantsForm from './VariantsForm'
import Header from '../../../../../components/Header'
import { useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { TransitionContext } from '../../../../../utils/TransitionContext'

const AddEditProduct = ({ isEditing }) => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { startTransition, isPending } = useContext(TransitionContext)

  const [updating, setUpdating] = useState('')
  const [CustomAlert, setMessages] = useAlert()
  const [addProduct] = useAddProductMutation()
  const [updateProduct] = useUpdateProductMutation()
  const [uploadImage] = useUploadImageMutation()
  const [initialValues, setInitialValues] = useState(null)
  const { productId } = useParams()
  const getInitialValues = useInitialValues(initialValues)
  useEffect(() => {
    if (productId && isEditing) {
      dispatch(
        productApi.endpoints.getProductsDetails.initiate({
          productId,
        })
      ).then((response) => {
        if (response.isSuccess) {
          setInitialValues(response.data)
        }
      })
    }
  }, [productId, isEditing, dispatch])

  const handleFormSubmit = (values) => {
    startTransition(() => {
      let data = values?.expiryDate?.date
      let formattedDate
      if (data.hasOwnProperty('format')) {
        formattedDate = data.hasOwnProperty('format')
      } else {
        let objectDate = new Date()
        formattedDate = `${objectDate.getFullYear()}-${objectDate.getMonth()}-${objectDate.getDate()}`
      }
      const postData = {
        ...values,
        expiryDate: {
          selected: values?.expiryDate?.selected,
          date: formattedDate,
        },
      }

      if (productId) {
        updateProduct({ post: postData, productId }).then((data) => {
          if (data?.error?.status) {
            Object.keys(data.error.data).forEach((key) => {
              setMessages((prev) => [
                ...prev,
                {
                  id: key,
                  variant: 'error',
                  description: data.error.data[key],
                },
              ])
            })
          } else {
            setUpdating('thumbnail')
            let postForm = new FormData()
            postForm.append('thumbnail', values.thumbnail[0]?.file)
            values.images.forEach((image) => {
              postForm.append('images', image.file)
            })
            postForm.append('productId', data.data.id)
            uploadImage({
              post: postForm,
            }).then((response) => {
              if (response?.error?.status) {
                Object.keys(response.error.data).forEach((key) => {
                  setMessages((prev) => [
                    ...prev,
                    {
                      id: key,
                      variant: 'error',
                      description: response.error.data[key],
                    },
                  ])
                })
              } else {
                setUpdating('')
                enqueueSnackbar(
                  `Product -> ${postData.title} is updated successfully!`,
                  {
                    variant: 'success',
                  }
                )
                navigate(`/admin/products/${productId}`)
              }
            })
          }
        })
      } else {
        addProduct({ post: postData }).then((data) => {
          if (data?.error?.status) {
            Object.keys(data.error.data).forEach((key) => {
              setMessages((prev) => [
                ...prev,
                {
                  id: key,
                  variant: 'error',
                  description: data.error.data[key],
                },
              ])
            })
          } else {
            setUpdating('thumbnail')
            let postForm = new FormData()
            postForm.append('thumbnail', values.thumbnail[0]?.file)
            values.images.forEach((image) => {
              postForm.append('images', image.file)
            })
            postForm.append('productId', data.data.id)
            uploadImage({
              post: postForm,
            }).then((response) => {
              if (response?.error?.status) {
                Object.keys(response.error.data).forEach((key) => {
                  setMessages((prev) => [
                    ...prev,
                    {
                      id: key,
                      variant: 'error',
                      description: response.error.data[key],
                    },
                  ])
                })
              } else {
                setUpdating('')
                enqueueSnackbar(
                  `Product -> ${postData.title} is created successfully!`,
                  {
                    variant: 'success',
                  }
                )
                navigate(`/admin/products/${data.data.id}`)
              }
            })
          }
        })
      }
    })
  }
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
            '& .image-container': {
              padding: '5% 20% 10% 20% !important',
              zIndex: '1000000 !important',
              '& .full-screen-preview': {
                maxWidth: '60% !important',
              },
            },
          }}
        ></Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={getInitialValues}
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
            setErrors,
            setTouched,
          }) => (
            <>
              <Form onSubmit={handleSubmit} encType="multipart/form-data">
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
                        setErrors={setErrors}
                        setTouched={setTouched}
                        customAlert={
                          updating === 'thumbnail' && <CustomAlert />
                        }
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
                    disabled={isPending}
                    type="submit"
                    color="secondary"
                    variant="outlined"
                    className={`px-8 py-3 `}
                  >
                    {productId && isEditing
                      ? isPending
                        ? 'Saving Product...'
                        : 'Save Product'
                      : isPending
                      ? 'Creating Product...'
                      : 'Create Product'}
                  </Button>
                </Box>
              </Form>
            </>
          )}
        </Formik>
      </Box>
    </Box>
  )
}

export default AddEditProduct
