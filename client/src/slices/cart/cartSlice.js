import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log(action.payload);
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
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
