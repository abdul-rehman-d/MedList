import { createSlice } from "@reduxjs/toolkit";
import { Medicine } from "../../types";

const medicineListSlice = createSlice({
  name: 'medicineList',
  initialState: {
    list: [] as Medicine[]
  },
  reducers: {
    addNew: (state, action) => {
      state.list.push(action.payload);
    },
    remove: (state, action) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
    clearAll(state) {
      state.list = [];
    },
  }
});

export const {
  addNew,
  remove,
  clearAll,
} = medicineListSlice.actions;

export default medicineListSlice.reducer;
