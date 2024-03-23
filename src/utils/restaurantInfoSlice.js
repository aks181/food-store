import { createSlice } from "@reduxjs/toolkit";

const restaurantInfoSlice = createSlice({
  name: "restaurant",
  initialState: {
    currentRestaurant: [],
  },
  reducers: {
    setCurrentRestaurant: (state, action) => {
      state.currentRestaurant.length = 0;
      state.currentRestaurant.push(action.payload);
    },
  },
});

export default restaurantInfoSlice.reducer;
export const { setCurrentRestaurant } = restaurantInfoSlice.actions;
