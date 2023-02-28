import * as yup from "yup";
export const newProductSchema = yup.object().shape({
  title: yup.string().required("Required"),
  description: yup.string().required("Required"),
  regularPrice: yup.number().required("Required"),
  salePrice: yup.number().required("Required"),
  brand: yup.string().required("Required"),
  restockQuantity: yup.number(),
  organize: yup.object().shape({
    category: yup.string().required("Required"),
    collection: yup.string(),
    vendor: yup.string(),
    tags: yup.array().of(yup.string()),
  }),
  globalDelivery: yup.object().shape({
    type: yup.string(),
    selectedCountries: yup.array().of(yup.string()),
  }),
  attributes: yup.object().shape({
    fragileProduct: yup.boolean(),
    biodegradable: yup.boolean(),
    frozenProduct: yup.object().shape({
      selected: yup.boolean(),
      maxAllowedTemperature: yup.string(),
    }),
    expiryDate: yup.object().shape({
      selected: yup.boolean(),
      date: yup.date(),
    }),
  }),
  advanced: yup.object().shape({
    productIDType: yup.string(),
    productID: yup.string(),
  }),
});
