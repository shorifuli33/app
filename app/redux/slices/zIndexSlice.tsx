import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ZIndexStateType {
  zAlert: number;
}

const initialState: ZIndexStateType = {
  zAlert:1200
};

export const zIndexSlice = createSlice({
  name: "zIndex",
  initialState,
  reducers: {
    setZIndex:(state:ZIndexStateType,action:PayloadAction)=>{
        state = initialState
    }
  },
});

export const { setZIndex} =
  zIndexSlice.actions;

export default zIndexSlice.reducer;
