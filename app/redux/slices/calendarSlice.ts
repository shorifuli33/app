import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CalendarState {
  selectedDate: number;
}

const initialState: CalendarState = {
  selectedDate: new Date().getTime(),
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<any>) => {
      state.selectedDate = action.payload;
    },    
  },
});
export const { setSelectedDate} = calendarSlice.actions;

export default calendarSlice.reducer;
