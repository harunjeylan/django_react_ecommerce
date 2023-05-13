import dayjs from 'dayjs'
import { useMemo } from 'react'

const getValue = (value, option) => {
  if (value) {
    return value
  } else {
    return option
  }
}
const getDate = (stringDate) => {
  if (stringDate) {
    const [day, month, year] = stringDate.split('-')
    console.log(day, month, year)
    return new Date(year, month - 1, day)
  } else {
    return new Date()
  }
}
export const useInitialValues = (initialValues) => {
  const variants = getValue(initialValues?.variants, []).map((variant) => ({
    variantLabel: variant.variantLabel,
    options: variant.options.map((option) => option.label),
  }))
  const value = useMemo(
    () => ({
      title: getValue(initialValues?.title, ''),
      brand: getValue(initialValues?.brand?.name, ''),
      description: getValue(initialValues?.description, ''),
      additional_information: getValue(initialValues?.description, ''),
      salePrice: getValue(initialValues?.sale_pricing, 0),
      regularPrice: getValue(initialValues?.regular_pricing, 0),
      discount: getValue(initialValues?.discount?.id, null),
      restockQuantity: getValue(initialValues?.stock, 0),
      thumbnail: [],
      images: [],
      variants: variants,
      shoppingType: getValue(initialValues?.shipping_type, ''),
      category: getValue(initialValues?.organize?.category?.name, ''),
      collection: getValue(initialValues?.organize?.collection?.name, ''),
      vendor: getValue(initialValues?.organize?.vendor?.name, ''),
      tags: getValue(
        initialValues?.organize?.tags?.map((tag) => tag.name),
        []
      ),

      globalDelivery: {
        type: getValue(initialValues?.globalDelivery?.type, ''),
        selectedCountries: getValue(
          initialValues?.globalDelivery?.selectedCountries,
          []
        ),
      },
      fragileProduct: getValue(initialValues?.fragile_product, false),
      biodegradable: getValue(initialValues?.biodegradable, false),
      frozenProduct: {
        selected: getValue(initialValues?.frozen_product, false),
        maxAllowedTemperature: getValue(
          initialValues?.max_allowed_temperature,
          ''
        ),
      },
      expiryDate: {
        selected: getValue(initialValues?.expiryDate?.salePrice, false),
        date: getValue(
          dayjs(getDate(initialValues?.expiry_date)),
          dayjs(new Date())
        ),
      },

      productIDType: getValue(initialValues?.productIDType, ''),
      productID: getValue(initialValues?.productID, ''),
    }),
    [initialValues]
  )
  return value
}
