import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  domain: "",
};
export const domainValue = createSlice({
  name: "domain",
  initialState,
  reducers: {
    domainSet: (state, action) => {
      state.domain = action.payload;
    },
  },
});
export const { domainSet } = domainValue.actions;

export default domainValue.reducer;
