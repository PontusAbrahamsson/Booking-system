import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/userSlice';
import { createWrapper } from "next-redux-wrapper";

export const makeStore = () => configureStore({
  reducer: {
    user: userReducer
  }
})
// const store = configureStore({
//   reducer: {
//     user: userReducer,

//   }
// });

export const wrapper = createWrapper(makeStore)
