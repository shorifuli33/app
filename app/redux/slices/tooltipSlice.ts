import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TooltipState {
  top: string;
  left: string;
  display: string;
  text: string;
}

const initialState: TooltipState = {
  top: "",
  left: "",
  display: "none",
  text: "",
};

export const tooltipSlice = createSlice({
  name: "tooltip",
  initialState,
  reducers: {
    setTooltip: (state: TooltipState, action: PayloadAction<any>) => {
      state = action.payload;
    },
  },
});

export const { setTooltip } = tooltipSlice.actions;

export default tooltipSlice.reducer;
