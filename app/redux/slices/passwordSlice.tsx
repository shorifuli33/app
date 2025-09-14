import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  password: "",
};
export const passValue = createSlice({
  name: "password",
  initialState,
  reducers: {
    passSet: (state, action) => {
      state.password = action.payload;
    },
  },
});
export const { passSet } = passValue.actions;

export default passValue.reducer;
