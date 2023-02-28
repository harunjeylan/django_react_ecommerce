//     const getNowDate = () => {
//     const today = new Date();
//     return today.toLocaleDateString("en-US");
//   };
import { constants } from "./constants";
export const initialValues = {
  title: "",
  brand: "",
  description: "",
  salePrice: 0,
  regularPrice: 0,
  restockQuantity: 0,
  thumbnail: [],
  images: [],
  variants: [],
  shoppingType: "",
  organize: {
    category: "",
    collection: "",
    vendor: "",
    tags: [],
  },
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
