const test = {
  title: "test2",
  brand: "adiads",
  description: "erewrwe",
  salePrice: 0,
  regularPrice: 0,
  restockQuantity: 0,
  thumbnail: [
    {
      id: 2,
      file: {},
      valid: true,
      errors: [],
    },
  ],
  images: [
    {
      id: 3,
      file: {},
      valid: true,
      errors: [],
    },
    {
      id: 4,
      file: {},
      valid: true,
      errors: [],
    },
    {
      id: 5,
      file: {},
      valid: true,
      errors: [],
    },
    {
      id: 6,
      file: {},
      valid: true,
      errors: [],
    },
  ],
  variants: [
    {
      variantLabel: "size",
      options: ["large", "small"],
    },
    {
      variantLabel: "Color",
      options: ["red", "yellow"],
    },
  ],
  shoppingType: "",
  category: "Shoose",
  collection: "Best Product",
  vendor: "Jaket",
  tags: ["hash", "bash"],
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
    date: "2023-03-17T12:15:16.084Z",
  },
  productIDType: "",
  productID: "",
};

export const getInitialValues = (initialValues) => {
  return {
    title: initialValues?.title ? initialValues?.title : "",
    brand: initialValues?.brand ? initialValues?.brand : "",
    description: initialValues?.description ? initialValues?.description : "",
    salePrice: initialValues?.salePrice ? initialValues?.salePrice : 0,
    regularPrice: initialValues?.salePrice ? initialValues?.salePrice : 0,
    restockQuantity: initialValues?.salePrice ? initialValues?.salePrice : 0,
    thumbnail: initialValues?.salePrice ? initialValues?.salePrice : [],
    images: initialValues?.salePrice ? initialValues?.salePrice : [],
    variants: initialValues?.salePrice ? initialValues?.salePrice : [],
    shoppingType: initialValues?.shoppingType
      ? initialValues?.shoppingType
      : "",
    category: initialValues?.category ? initialValues?.category : "",
    collection: initialValues?.collection ? initialValues?.collection : "",
    vendor: initialValues?.vendor ? initialValues?.vendor : "",
    tags: initialValues?.tags ? initialValues?.tags : [],

    globalDelivery: {
      type: initialValues?.globalDelivery?.type
        ? initialValues?.globalDelivery?.type
        : "",
      selectedCountries: initialValues?.globalDelivery?.selectedCountries
        ? initialValues?.globalDelivery?.selectedCountries
        : [],
    },
    fragileProduct: initialValues?.fragileProduct
      ? initialValues?.fragileProduct
      : false,
    biodegradable: initialValues?.biodegradable
      ? initialValues?.biodegradable
      : false,
    frozenProduct: {
      selected: initialValues?.frozenProduct?.selected
        ? initialValues?.frozenProduct?.selected
        : false,
      maxAllowedTemperature: initialValues?.frozenProduct?.maxAllowedTemperature
        ? initialValues?.frozenProduct?.maxAllowedTemperature
        : "",
    },
    expiryDate: {
      selected: initialValues?.expiryDate?.salePrice
        ? initialValues?.expiryDate?.salePrice
        : false,
      date: initialValues?.expiryDate?.date
        ? initialValues?.expiryDate?.date
        : new Date(),
    },

    productIDType: initialValues?.productIDType
      ? initialValues?.productIDType
      : "",
    productID: initialValues?.productID ? initialValues?.productID : "",
  };
};
