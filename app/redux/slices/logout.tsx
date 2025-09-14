import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  logout: false,
};
export const logout = createSlice({
  name: "logout",
  initialState,
  reducers: {
    userLogout: (state, action) => {
      state.logout = !state.logout;
    },
  },
});
export const { userLogout } = logout.actions;

export default logout.reducer;
