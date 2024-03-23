import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      // state.items.push(action.payload);
      const existingItemIndex = state.items.findIndex(
        (x) => x.item?.card?.info?.id === action.payload.card.info.id
      );

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += 1;
      } else {
        state.items.push({ item: action.payload, quantity: 1 });
      }
    },
    deleteItem: (state, action) => {
      const itemIndex = state.items.findIndex(
        (x) => x.item.card.info.id === action.payload
      );
      state.items.splice(itemIndex, 1);
    },
    clearCart: (state) => {
      state.items.length = 0;
    },
  },
});

export default cartSlice.reducer;
export const { addItem, deleteItem, clearCart } = cartSlice.actions;
