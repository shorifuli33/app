import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  option: "",
};
export const optionValue = createSlice({
  name: "option",
  initialState,
  reducers: {
    optionSet: (state, action) => {
      state.option = action.payload;
    },
  },
});
export const { optionSet } = optionValue.actions;

export default optionValue.reducer;
