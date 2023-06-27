import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";

const userSlice = createSlice({
  name: 'user',
  initialState: null as (null | User),
  reducers: {
    login: (state, action) => {
      state = action.payload;
    },
    logout: (state) => {
      state = null;
    },
  }
});

export const {
  login,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
