  import * as yup from "yup";
  export const newProductSchema = yup.object().shape({
    title: yup.string().required("Required"),
    description: yup.string().required("Required"),
    price: yup.number().required("Required"),
    brand: yup.string().required("Required"),
    category: yup.string().required("Required"),
    collection: yup.string(),
    vendor: yup.string(),
    tags: yup.string(),
    restockQuantity: yup.number(),
    globalDelivery: {
      type: yup.string(),
      selectedCountries: yup.array().of(
        yup.string().when("type", {
          is: (type) => type === "selectedCountries",
          then: yup
            .string()
            .required("required for 'Selected Countries' option"),
        })
      ),
    },
    attributes: {
      fragileProduct: yup.boolean(),
      biodegradable: yup.boolean(),
      frozenProduct: {
        selected: yup.boolean(),
        maxAllowedTemperature: yup.string(),
        maxAllowedTemperature: yup.string().when("selected", {
          is: (selected) => selected,
          then: yup.string().required("required for 'Frozen Product' option"),
        }),
      },
      expiryDate: {
        selected: yup.boolean(),
        date: yup.date().default(() => new Date()),
      },
    },
    advanced: {
      productIDType: yup.string(),
      productID: yup.string(),
    },
  });