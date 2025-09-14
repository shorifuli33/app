import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const check = {
  repeatDates: [1],
  repeatMonths: [1],
  repeatDays: [1],
  repeatType: "Daily",
  repeatInterval: 1,
  ends: "never",
  afterOccur: 1,
  noEnd: true,
  repeatSerial: 1,
  endDateLong: dayjs().add(1, "month").valueOf(),
  viewType: "day",
  repeatDayMonth: 1,
};
// export interface RecurCreateState {
//   recurInfo: customRecurInfoType;
// }

const initialState = {
  repeatDates: [1],
  repeatMonths: [1],
  repeatDays: [1],
  repeatType: "Daily",
  repeatInterval: 1,
  ends: "never",
  afterOccur: 1,
  noEnd: true,
  repeatSerial: 1,
  endDateLong: dayjs().add(1, "month").valueOf(),
  viewType: "day",
  repeatDayMonth: 1,
};
export const CustomRecurSlice = createSlice({
  name: "CustomRecur",
  initialState,
  reducers: {
    customRecurTypeSet: (state, action) => {
      state.repeatType = action.payload;
    },
    customRecurDatesSet: (state, action) => {
      state.repeatDates = action.payload;
    },
    customRecurMonthsSet: (state, action) => {
      state.repeatMonths = action.payload;
    },
    customRecurIntervalSet: (state, action) => {
      state.repeatInterval = action.payload;
    },
    customRecurDaysSet: (state, action) => {
      state.repeatDays = action.payload;
    },
    customRecurSerialSet: (state, action) => {
      state.repeatSerial = action.payload;
    },
    customRecurDayMonthSet: (state, action) => {
      state.repeatDayMonth = action.payload;
    },
    customRecurEndsSet: (state, action) => {
      state.ends = action.payload;
    },
    customRecurOccurSet: (state, action) => {
      state.afterOccur = action.payload;
    },
    customRecurEndDateSet: (state, action) => {
      state.endDateLong = action.payload;
    },
    customRecurViewSet: (state, action) => {
      state.viewType = action.payload;
    },
    customSetToInitial: (state) => {
      state.repeatDates = [1];
      state.repeatMonths = [1];
      state.repeatDays = [1];
      state.repeatType = "Daily";
      state.repeatInterval = 1;
      state.ends = "never";
      state.afterOccur = 1;
      state.noEnd = true;
      state.repeatSerial = 1;
      state.endDateLong = dayjs().add(1, "month").valueOf();
      state.viewType = "day";
      state.repeatDayMonth = 1;
    },
  },
});
export const {
  customRecurTypeSet,
  customRecurDatesSet,
  customRecurMonthsSet,
  customRecurIntervalSet,
  customRecurDaysSet,
  customRecurSerialSet,
  customRecurDayMonthSet,
  customRecurEndsSet,
  customRecurOccurSet,
  customRecurEndDateSet,
  customRecurViewSet,
  customSetToInitial,
} = CustomRecurSlice.actions;

export default CustomRecurSlice.reducer;
