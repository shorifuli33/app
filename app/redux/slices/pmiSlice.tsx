import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  arr: [],
};

export const PmiSlice = createSlice({
  name: "pmi",
  initialState,
  reducers: {
    pmiSet: (state, action) => {
      state.arr = action.payload;
    },
  },
});
export const { pmiSet } = PmiSlice.actions;

export default PmiSlice.reducer;
