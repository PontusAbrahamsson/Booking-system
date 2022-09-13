import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({

  name: "user",
  initialState: {
    defaultUser: null,
    businessAccount: null
  },

  reducers: {
    defaultUserLogin: (state, action) => {
      state.defaultUser = action.payload;
    },
    logout: (state) => {
      state.defaultUser = null;
      state.businessAccount = null;
    },
    signupAsBusiness: (state, action) => {
      state.businessAccount = action.payload;
    },
    businessUserLogin: (state, action) => {
      state.businessAccount = action.payload;
    }
  }
});

export const { defaultUserLogin, logout, signupAsBusiness, businessUserLogin } = userSlice.actions;

export default userSlice.reducer;