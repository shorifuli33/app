import { createSlice , PayloadAction } from "@reduxjs/toolkit";

interface SchedulerState {
  scheduleCreateResponse: number;
  isScheduling: boolean;
}

const initialState: SchedulerState = {
  scheduleCreateResponse: 0,
  isScheduling: false,
};

export const schedulerSlice = createSlice({
  name: "scheduler",
  initialState,
  reducers: {
    setScheduleCreateResponse: (state: SchedulerState) => {
      state.scheduleCreateResponse = state.scheduleCreateResponse + 1;
    },
    setIsScheduling: (state, action: PayloadAction<boolean>) => {
      state.isScheduling = action.payload;
    },

  },
});

export const { setScheduleCreateResponse , setIsScheduling } = schedulerSlice.actions;

export default schedulerSlice.reducer;
