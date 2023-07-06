import { createSlice } from "@reduxjs/toolkit";

const onBoardingSlice = createSlice({
  name: 'onBoarding',
  initialState: {
    name: '',
    additionalFields: [] as string[],
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    addAdditionalField: (state, action) => {
      state.additionalFields.push(action.payload);
    },
    removeAdditionalField: (state, action) => {
      state.additionalFields = state.additionalFields.filter((_, i) => i !== action.payload);
    },
    onSuccess(state) {
      state.name = '';
      state.additionalFields = [];
    },
  }
});

export const {
  setName,
  addAdditionalField,
  removeAdditionalField,
  onSuccess,
} = onBoardingSlice.actions;

export default onBoardingSlice.reducer;
