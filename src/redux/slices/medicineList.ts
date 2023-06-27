import { createSlice } from "@reduxjs/toolkit";
import { Medicine } from "../../types";

const medicineListSlice = createSlice({
  name: 'medicineList',
  initialState: [] as Medicine[],
  reducers: {
    addNew: (state, action) => {
      state.push(action.payload);
    },
    remove: (state, action) => {
      state = state.filter((item) => item.id !== action.payload);
    },
  }
});

export const {
  addNew,
  remove,
} = medicineListSlice.actions;

export default medicineListSlice.reducer;
