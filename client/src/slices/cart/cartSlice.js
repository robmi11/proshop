import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

// Helper functions to add decimals places to price
const addDecimal = (number) => {
  return (Math.round(number * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const itemExists = state.cartItems.find((x) => x._id === item._id);

      if (itemExists) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === itemExists._id ? item : x,
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // Calculate items price
      state.itemsPrice = addDecimal(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
      );

      // Calculate shipping price (If order is over 100$ shipping is free else shipping is 10$)
      state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);

      // Calculate tax price
      state.taxPrice = addDecimal(Number(0.15 * state.itemsPrice).toFixed(2));

      // Calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
