import { createSlice } from "@reduxjs/toolkit";
export interface recurState {
  arr: any;
}
const initialState: recurState = {
  arr: [],
};

export const customRecurWholeSlice = createSlice({
  name: "cutomRecurWhole",
  initialState,
  reducers: {
    customRecurWhole: (state, action) => {
      state.arr = action.payload;
    },
  },
});
export const { customRecurWhole } = customRecurWholeSlice.actions;

export default customRecurWholeSlice.reducer;
