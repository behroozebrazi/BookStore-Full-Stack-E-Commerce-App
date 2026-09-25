import { createContext, useReducer } from "react"

// Create cookie
import Cookies from "js-cookie"

export const CartContext = createContext()

// const initialState = { cart: { cartItems: [], shippingData: {} } }
// read from cookie, or create an ampty one 
const cart = Cookies.get("cart")
const initialState = {
  cart: cart
    ? JSON.parse(cart)
    : { cartItems: [], shippingData: {} }
}


export function CartContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }
  return (
    <CartContext.Provider value={value}>
      {children}
    </ CartContext.Provider>
  )
}


// Cart Reducer
function reducer(state, action) {
  switch (action.type) {

    // add one item to the cart
    case "ADD_TO_CART": {
      const newItem = action.payload
      // new item exists in cart OR not
      const existingItem = state.cart.cartItems.find(item => item.slug === newItem.slug)
      // 
      const cartItems = existingItem
        ? state.cart.cartItems.map(item => item.title === existingItem.title ? newItem : item)
        : [...state.cart.cartItems, newItem]
      // record in cookie
      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }))
      //
      return { ...state, cart: { ...state.cart, cartItems } }
    }

    // delete all items from the cart
    case "DELETE_CART": {
      const cartItems = []

      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }))

      return { ...state, cart: { ...state.cart, cartItems } }
    }

    // remove one product from the cart
    case "REMOVE_FROM_CART": {
      const removeItem = action.payload
      const cartItems = state.cart.cartItems.filter(item => item.slug !== removeItem.slug)
      // record in cookie
      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }))
      //
      return { ...state, cart: { ...state.cart, cartItems } }
    }

    // shipping name, address, and postal code
    case "SAVE_SHIPPING_DATA": {
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingData: { ...state.cart.shippingData, ...action.payload }
        }
      }
    }

    // save payment method
    case "SAVE_PAYMENT_METHOD": {
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload }
      }
    }

    default:
      return state
  }
}