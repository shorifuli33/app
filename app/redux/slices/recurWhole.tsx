import { createSlice } from "@reduxjs/toolkit";
export interface recurState {
  arr: any;
}
const initialState: recurState = {
  arr: [],
};

export const recurWhole = createSlice({
  name: "recurWhole",
  initialState,
  reducers: {
    recurWholeSet: (state, action) => {
      state.arr = action.payload;
    },
  },
});
export const { recurWholeSet } = recurWhole.actions;

export default recurWhole.reducer;
