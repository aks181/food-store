import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import restaurantReducer from "./restaurantInfoSlice";

const appStore = configureStore({
  reducer: {
    cart: cartReducer,
    currentRestaurant: restaurantReducer,
  },
});

export default appStore;
