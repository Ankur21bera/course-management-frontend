import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./User/Userslice";

const Store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default Store;