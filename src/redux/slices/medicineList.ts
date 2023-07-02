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
    addBunch: (state, action) => {
      state.list = [...state.list, ...action.payload];
    },
    remove: (state, action) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
    editExisting: (state, action) => {
      state.list = state.list.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    },
    clearAll(state) {
      state.list = [];
    },
  }
});

export const {
  addNew,
  addBunch,
  remove,
  clearAll,
} = medicineListSlice.actions;

export default medicineListSlice.reducer;
