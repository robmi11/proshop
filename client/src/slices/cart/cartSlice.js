import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const itemExists = state.cartItems.find((x) => x._id === item._id);

      if (itemExists) {
        itemExists.qty = itemExists.qty + item.qty;
        state.cartItems = state.cartItems.map((x) =>
          x._id === itemExists._id ? itemExists : x,
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },
    updateItemQty: (state, action) => {
      console.log(action.payload);
    },
    updateItem: (state, action) => {
      const itemToUpdate = state.cartItems.find(
        (item) => item._id === action.payload._id,
      );

      itemToUpdate.qty = action.payload.qty;
      state.cartItems = state.cartItems.map((x) =>
        x._id === itemToUpdate._id ? itemToUpdate : x,
      );
      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload,
      );
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
  },
});

export const { addToCart, updateItem, removeFromCart, saveShippingAddress } =
  cartSlice.actions;

export default cartSlice.reducer;
