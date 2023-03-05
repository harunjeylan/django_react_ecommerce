//     const getNowDate = () => {
//     const today = new Date();
//     return today.toLocaleDateString("en-US");
//   };
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
  category: "",
  collection: "",
  vendor: "",
  tags: [],

  globalDelivery: {
    type: "",
    selectedCountries: [],
  },
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

  productIDType: "",
  productID: "",
};
