import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Breadcrumbs,
  Typography,
  Divider,
} from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { colors } from "../../theme";
import Payment from "./Payment";
import Shipping from "../../components//Shipping";
import Delivery from "./Delivery";
import OrderReview from "./OrderReview";
import { loadStripe } from "@stripe/stripe-js";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import Header2 from "../../components/Header2";
const stripePromise = loadStripe(
  "pk_test_51LgU7yConHioZHhlAcZdfDAnV9643a7N1CMpxlKtzI1AUWLsRyrord79GYzZQ6m8RzVnVQaHsgbvN1qSpiDegoPi006QkO0Mlc"
);

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === 3;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);

    // this copies the billing address onto shipping address
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }

    if (isLastStep) {
      makePayment(values);
    }

    actions.setTouched({});
  };

  async function makePayment(values) {
    const stripe = await stripePromise;
    const requestBody = {
      userName: [values.firstName, values.lastName].join(" "),
      email: values.email,
      products: cart.map(({ id, count }) => ({
        id,
        count,
      })),
    };

    const response = await fetch("http://localhost:2000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    const session = await response.json();
    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  }
  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.price;
  }, 0);
  return (
    <Box className={`flex flex-col gap-4 mt-[100px] `}>
      <Box className={`container mx-auto`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            onClick={() => navigate(`/`)}
            variant="text"
            color="secondary"
            className={` px-4 py-2 ${"hover:bg-" + colors.greenAccent[400]}`}
          >
            Home
          </Button>
          <Button
            onClick={() => navigate(`/viewcart`)}
            variant="text"
            color="secondary"
            className={` px-4 py-2 ${"hover:bg-" + colors.greenAccent[400]}`}
          >
            viewcart
          </Button>
          <Typography color="text.primary">View Shoping Cart</Typography>
        </Breadcrumbs>
        <Box
          backgroundColor={colors.primary[400]}
          className={`container mx-auto py-[80px] rounded-lg my-4`}
        >
          <Header2
            title="Shopping cart"
            bodyText="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt."
          />
        </Box>
      </Box>

      <Box className={`container mx-auto`}>
        <Box className="flex flex-col gap-8 md:flex-row">
          <Box className="w-full md:max-w-[60%]">
            <Stepper
              sx={{ backgroundColor: colors.primary[400] }}
              activeStep={activeStep}
              className="p-4 rounded-md"
            >
              <Step>
                <StepLabel>Billing</StepLabel>
              </Step>
              <Step>
                <StepLabel>Delivery Method</StepLabel>
              </Step>
              <Step>
                <StepLabel>Payment Method</StepLabel>
              </Step>
              <Step>
                <StepLabel>Order Review</StepLabel>
              </Step>
            </Stepper>
            <Box className="mt-8">
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
                  <form onSubmit={handleSubmit}>
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
                          color="primary"
                          variant="contained"
                          sx={{
                            backgroundColor: colors.primary[200],
                            boxShadow: "none",
                            color: "white",
                            borderRadius: 0,
                            padding: "15px 40px",
                          }}
                          onClick={() => setActiveStep(activeStep - 1)}
                        >
                          Back
                        </Button>
                      )}
                      <Button
                        fullWidth
                        type="submit"
                        color="primary"
                        variant="contained"
                        sx={{
                          backgroundColor: colors.primary[400],
                          boxShadow: "none",
                          color: "white",
                          borderRadius: 0,
                          padding: "15px 40px",
                        }}
                      >
                        {!isLastStep ? "Next" : "Place Order"}
                      </Button>
                    </Box>
                  </form>
                )}
              </Formik>
            </Box>
          </Box>
          <Box className="w-full md:max-w-[40%] ">
            <Box className="flex flex-col gap-4 drop-shadow-lg bg-slate-400/10 rounded-lg">
              <Box className="px-4 py-4 " backgroundColor={colors.primary[400]}>
                <Typography variant="h5" fontWeight="bold">
                  Order Summary
                </Typography>
              </Box>
              <Box className="flex flex-col gap-4 px-4 py-2 ">
                <Typography variant="h5" fontWeight="bold">
                  Order Summary
                </Typography>
                <Typography className="">
                  Shipping and additional costs are calculated based on values
                  you have entered.
                </Typography>
                <Box className="flex justify-between mt-4">
                  <Typography variant="h5" fontWeight="bold">
                    Order Subtotal
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    ${totalPrice}
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Box className="flex justify-between px-4 pt-2 ">
                <Typography variant="h5" fontWeight="bold">
                  Shipping and handling
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  $10.00
                </Typography>
              </Box>
              <Divider />
              <Box className="flex justify-between px-4 pt-2 ">
                <Typography variant="h5" fontWeight="bold">
                  Tax
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  $0.00
                </Typography>
              </Box>
              <Divider />
              <Box className="flex justify-between px-4 pt-2 ">
                <Typography variant="h5" fontWeight="bold">
                  Total
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  ${totalPrice + 10}
                </Typography>
              </Box>
              <Divider />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      country: yup.string().required("required"),
      street1: yup.string().required("required"),
      street2: yup.string(),
      city: yup.string().required("required"),
      state: yup.string().required("required"),
      zipCode: yup.string().required("required"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street1: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      state: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
    }),
  }),
  yup.object().shape({
    email: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
  }),
];

export default Checkout;
