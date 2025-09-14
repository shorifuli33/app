import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CommonSliceState {
  eventColors: any;
  submitDisabled: boolean;
  allDayEnabled: boolean;
  tempEndDate: any;
  prevTimeZone: string;
}

const initialState: CommonSliceState = {
  eventColors: [],
  submitDisabled: false,
  allDayEnabled: false,
  tempEndDate: new Date().getTime(),
  prevTimeZone: "",
};

export const schedulerCommonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setEventColors: (state: CommonSliceState, action: PayloadAction<any>) => {
      state.eventColors = action.payload;
    },
    disableSubmit: (state: CommonSliceState, action: PayloadAction<any>) => {
      state.submitDisabled = action.payload;
    },
    enableAllDay: (state: CommonSliceState, action: PayloadAction<any>) => {
      state.allDayEnabled = action.payload;
    },
    setTempEndDate: (state: CommonSliceState, action: PayloadAction<any>) => {
      state.tempEndDate = action.payload;
    },
    setPrevTimezone: (state: CommonSliceState, action: PayloadAction<any>) => {
      state.prevTimeZone = action.payload;
    },
  },
});
export const {
  setEventColors,
  disableSubmit,
  enableAllDay,
  setTempEndDate,
  setPrevTimezone,
} = schedulerCommonSlice.actions;

export default schedulerCommonSlice.reducer;
