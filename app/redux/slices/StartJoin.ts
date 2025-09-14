import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = {
    image:"",
    isDesktopEnabled:false
  };
  export const startJoin = createSlice({
    name: "startJoin",
    initialState,
    reducers: {
      submitImage: (state, action) => {
        state.image = action.payload;
      },
      setDesktopEnabled : (state,action) => {
        state.isDesktopEnabled = action.payload
      }
    },
  });
  export const { submitImage, setDesktopEnabled } = startJoin.actions;

export default startJoin.reducer;