import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TimeOut {
  interval: any;
}

const initialState: TimeOut = {
  interval: "",
};

export const timeOutSlice = createSlice({
  name: "timeOut",
  initialState,
  reducers: {
    setOut: (state: TimeOut, action: PayloadAction<any>) => {
      state = action.payload;
    },
  },
});

export const { setOut } = timeOutSlice.actions;

export default timeOutSlice.reducer;
