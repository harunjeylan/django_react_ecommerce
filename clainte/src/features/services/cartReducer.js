import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isCartOpen: false,
  cart: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.cart.find((product) => {
        return product.id === action.payload.product.id
      })

      if (item === undefined) {
        state.cart = [...state.cart, action.payload.product]
      }
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload.id
      )
    },
    toggleCart: (state, action) => {
      const item = state.cart.find((product) => {
        return product.id === action.payload.product.id
      })
      if (item !== undefined) {
        state.cart = state.cart.filter(
          (product) => product.id !== action.payload.product.id
        )
      } else {
        state.cart = [...state.cart, action.payload.product]
      }
    },
    increaseCount: (state, action) => {
      state.cart = state.cart.map((product) => {
        if (product.id === action.payload.id) {
          product.count++
        }
        return product
      })
    },

    decreaseCount: (state, action) => {
      state.cart = state.cart.map((product) => {
        if (product.id === action.payload.id && product.count > 1) {
          product.count--
        }
        return product
      })
    },

    setCount: (state, action) => {
      state.cart = state.cart.map((product) => {
        if (product.id === action.payload.id) {
          product.count = action.payload.count
          if (product.count < 1) product.count = 1
        }
        return product
      })
    },

    setSelectedVariants: (state, action) => {
      state.cart = state.cart.map((product) => {
        if (product.id === action.payload.id) {
          let foundVariantOption = product.selectedVariants?.find(
            (variantOption) =>
              variantOption.variantLabel === action.payload.variantLabel
          )
          if (foundVariantOption) {
            product.selectedVariants = product.selectedVariants
              ?.map((variantOption) => {
                if (
                  variantOption.variantLabel === action.payload.variantLabel
                ) {
                  variantOption = {
                    variantLabel: action.payload.variantLabel,
                    optionLabel: action.payload.optionLabel,
                  }
                }
                return variantOption
              })
              .filter((variant) => variant.optionLabel !== '')
          } else {
            product.selectedVariants = [
              ...product.selectedVariants,
              {
                variantLabel: action.payload.variantLabel,
                optionLabel: action.payload.optionLabel,
              },
            ].filter((variant) => variant.optionLabel !== '')
          }
        }
        return product
      })
    },

    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen
    },
    clearCart: (state, action) => {
      state.cart = []
    },
  },
})

export const {
  addToCart,
  setCount,
  clearCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  toggleCart,
  setIsCartOpen,
  setSelectedVariants,
} = cartSlice.actions
export const selectCart = (state) => state.cart.cart

export default cartSlice.reducer
