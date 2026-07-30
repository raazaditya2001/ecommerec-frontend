import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload; // assign items from dispatcher to 'item' variable

      const existItem = state.cartItems.find(
        //checking duplicate carts by comparing its from existence to current cart
        (x) => x.productId === item.productId,
      );

      if (existItem) {
        return;
      } else {
        state.cartItems.push({ ...item, qty: 1 }); // if no exist then push cart items to state.cartItems
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // store in localStorage to fetch the cart details
    },

    updateCart: (state, action) => {
      const { productId, qty } = action.payload;

      const existItem = state.cartItems.find(
        // comparing state items to payload item to find items
        (x) => x.productId === productId,
      );

      if (existItem) {
        // changing quantity of the items
        existItem.qty = qty;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      const productId  = action.payload;
      state.cartItems = state.cartItems.filter((x) => x.productId !== productId);

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateCart } =
  cartSlice.actions;
export default cartSlice.reducer;
