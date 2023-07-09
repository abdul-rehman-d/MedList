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
    changeName: (
      state: { user: userState },
      action: PayloadAction<string>
    ) => {
      state.user.name = action.payload;
    },
    updateAdditionalField: (
      state: { user: userState },
      action: PayloadAction<string[]>
    ) => {
      state.user.additionalFields = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  }
});

export const {
  login,
  changeName,
  updateAdditionalField,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
