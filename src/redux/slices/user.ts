import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";

type userState = User | null;

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null as userState
  },
  reducers: {
    login: (
      state: { user: userState },
      action: PayloadAction<User>
    ) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  }
});

export const {
  login,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
