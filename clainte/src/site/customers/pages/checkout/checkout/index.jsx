import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { Formik } from 'formik'

import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Breadcrumbs,
  Typography,
} from '@mui/material'

import Payment from './Payment'
import Shipping from './Shipping'
import Delivery from './Delivery'
import OrderReview from './OrderReview'

import { useAddOrderMutation } from '../../../../../features/services/orderApiSlice'
import { clearCart } from '../../../../../features/services/cartReducer'
import { selectCurrentUser } from '../../../../../features/auth/authSlice'
import { tokens } from '../../../../../theme'
import Header from '../../../../../components/Header'
import { useSnackbar } from 'notistack'
import useAlert from '../../../../../components/ui/useAlert'
import OrderSummery from '../../../../../components/OrderSummery'
import { useGetAllDeliveryQuery } from '../../../../../features/services/deliveryApiSlice'
const Checkout = () => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const [CustomAlert, setMessages] = useAlert()
  const userData = useSelector(selectCurrentUser)
  const [activeStep, setActiveStep] = useState(0)
  const cart = useSelector((state) => state.cart.cart)
  const isFirstStep = activeStep === 0
  const isLastStep = activeStep === 3
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  const [addOrder] = useAddOrderMutation()
  const { data: deliveries = [], isFetching: isFetchingDelivery } =
    useGetAllDeliveryQuery()
  const handleFormSubmit = async (values, actions) => {
    !isLastStep && setActiveStep(activeStep + 1)
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue('shippingAddress', {
        ...values.billingAddress,
        isSameAddress: true,
      })
    }
    isLastStep && makePayment(values)
    actions.setTouched({})
  }
  async function makePayment(values) {
    addOrder({
      post: {
        ...values,
        products: cart?.map((product) => ({
          id: product.id,
          variants: product.selectedVariants,
          count: product.count,
        })),
      },
    }).then((data) => {
      if (data?.error?.data) {
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
        dispatch(clearCart())
        navigate(`/checkout/success`, { replace: true })
        enqueueSnackbar(`made an Order Successfully!`, {
          variant: 'success',
        })
      }
    })
  }
  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.sale_pricing
  }, 0)
  const getValue = (value) => {
    return value ? value : ''
  }
  const initialValues = {
    billingAddress: {
      first_name: getValue(userData?.first_name),
      last_name: getValue(userData?.last_name),
      phone_number: getValue(userData?.phone_number),
      email: getValue(userData?.email),
      country: getValue(userData?.country),
      street1: getValue(userData?.street1),
      street2: getValue(userData?.street2),
      city: getValue(userData?.city),
      state: getValue(userData?.state),
      zipcode: getValue(userData?.zipcode),
    },
    shippingAddress: {
      isSameAddress: true,
      first_name: getValue(userData?.first_name),
      last_name: getValue(userData?.last_name),
      phone_number: getValue(userData?.phone_number),
      email: getValue(userData?.email),
      country: getValue(userData?.country),
      street1: getValue(userData?.street1),
      street2: getValue(userData?.street2),
      city: getValue(userData?.city),
      state: getValue(userData?.state),
      zipcode: getValue(userData?.zipcode),
    },
    deliveryMethod: null,
  }
  return (
    <Box className={`w-full flex flex-col gap-4 md:gap-8 mt-20 md:mt-40`}>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            onClick={() => navigate(`/`)}
            variant="text"
            color="secondary"
          >
            Home
          </Button>
          <Button
            onClick={() => navigate(`/viewcart`)}
            variant="text"
            color="secondary"
          >
            viewcart
          </Button>
          <Typography color="text.primary">View Shoping Cart</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header title="Checkout" subtitle="Choose the payment method." />
      </Box>

      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Box className="flex flex-col gap-4">
          <Box className="overflow-x-auto">
            <Stepper
              sx={{ backgroundColor: colors.primary[400] }}
              activeStep={activeStep}
              className="p-4 rounded-md"
            >
              <Step>
                <StepLabel color="secondary">Billing</StepLabel>
              </Step>
              <Step>
                <StepLabel color="secondary">Delivery Method</StepLabel>
              </Step>
              <Step>
                <StepLabel color="secondary">Payment Method</StepLabel>
              </Step>
              <Step>
                <StepLabel color="secondary">Order Review</StepLabel>
              </Step>
            </Stepper>
          </Box>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema[activeStep]}
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
              <Box className="flex flex-col md:flex-row gap-8 ">
                <Box className="w-full md:max-w-[60%]">
                  <form onSubmit={handleSubmit}>
                    <CustomAlert />
                    {isFirstStep && (
                      <Shipping
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                      />
                    )}
                    {activeStep === 1 && (
                      <Delivery
                        deliveries={deliveries}
                        isFetchingDelivery={isFetchingDelivery}
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                      />
                    )}
                    {activeStep === 2 && (
                      <Payment
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                      />
                    )}
                    {isLastStep && <OrderReview />}
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      gap="50px"
                    >
                      {!isFirstStep && (
                        <Button
                          fullWidth
                          color="secondary"
                          className={` px-[40px] py-2`}
                          onClick={() => setActiveStep(activeStep - 1)}
                        >
                          Back
                        </Button>
                      )}
                      <Button
                        fullWidth
                        type="submit"
                        variant="outlined"
                        color="secondary"
                        className={` px-[40px] py-2`}
                      >
                        {!isLastStep ? 'Next' : 'Place Order'}
                      </Button>
                    </Box>
                  </form>
                </Box>
                <Box className="w-full md:max-w-[40%] ">
                  <OrderSummery
                    deliveryMethod={deliveries.find(
                      (delivery) => delivery.id === values?.deliveryMethod
                    )}
                    totalPrice={totalPrice}
                  />
                </Box>
              </Box>
            )}
          </Formik>
          <Box className="mt-8"></Box>
        </Box>
      </Box>
    </Box>
  )
}
const phoneRegExp = /^\+?1?\d{9,15}$/

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      first_name: yup.string().required('required'),
      last_name: yup.string().required('required'),
      email: yup.string().required('required'),
      phone_number: yup
        .string()
        .required('required')
        .matches(
          phoneRegExp,
          "Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
        ),
      country: yup.string().required('required'),
      street1: yup.string().required('required'),
      street2: yup.string(),
      city: yup.string().required('required'),
      state: yup.string().required('required'),
      zipcode: yup.string(),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      first_name: yup.string().when('isSameAddress', {
        is: false,
        then: () => yup.string().required('required'),
      }),
      last_name: yup.string().when('isSameAddress', {
        is: false,
        then: () => yup.string().required('required'),
      }),
      email: yup.string().when('isSameAddress', {
        is: false,
        then: () => yup.string().required('required'),
      }),
      phone_number: yup.string().when('isSameAddress', {
        is: false,
        then: () =>
          yup
            .string()
            .required('required')
            .matches(
              phoneRegExp,
              "Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
            ),
      }),
      country: yup.string().when('isSameAddress', {
        is: false,
        then: () => yup.string().required('required'),
      }),
      street1: yup.string().when('isSameAddress', {
        is: false,
        then: () => yup.string().required('required'),
      }),
      street2: yup.string(),
      city: yup.string().when('isSameAddress', {
        is: false,
        then: () => yup.string().required('required'),
      }),
      state: yup.string().when('isSameAddress', {
        is: false,
        then: () => yup.string().required('required'),
      }),
      zipcode: yup.string(),
    }),
  }),
  yup.object().shape({ deliveryMethod: yup.string() }),
]

export default Checkout
