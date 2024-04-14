import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      console.log(action);
      const existingItemIndex = state.items.findIndex(
        (x) => x.item?.card?.info?.id === action.payload[0].card.info.id
      );

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += 1;
      } else {
        state.items.push({
          item: action.payload[0],
          quantity: 1,
          restaurant: action.payload[1],
        });
      }
    },
    decreaseItem: (state, action) => {
      const existingItemIndex = state.items.findIndex(
        (x) => x.item?.card?.info?.id === action.payload
      );
      const existingItem = state.items[existingItemIndex];

      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        state.items.splice(existingItemIndex, 1);
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
export const { addItem, decreaseItem, deleteItem, clearCart } =
  cartSlice.actions;
