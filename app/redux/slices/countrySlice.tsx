import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  country: "",
};
export const countryValue = createSlice({
  name: "country",
  initialState,
  reducers: {
    countrySet: (state, action) => {
      state.country = action.payload;
    },
  },
});
export const { countrySet } = countryValue.actions;

export default countryValue.reducer;
