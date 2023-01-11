//     const getNowDate = () => {
//     const today = new Date();
//     return today.toLocaleDateString("en-US");
//   };
import { constants } from "./constants";
export const initialValues = {
  title: "",
  description: "",
  regularPrice: 0,
  salePrice: 0,
  brand: "",
  thumbnail: [],
  images: [],
  category: "",
  collection: "",
  vendor: "",
  tags: [],
  variants: [],
  restockQuantity: 0,
  globalDelivery: {
    type: "",
    selectedCountries: [],
  },
  attributes: {
    fragileProduct: false,
    biodegradable: false,
    frozenProduct: {
      selected: false,
      maxAllowedTemperature: "",
    },
    expiryDate: {
      selected: false,
      date: new Date(),
    },
  },
  advanced: {
    productIDType: "",
    productID: "",
  },
};
