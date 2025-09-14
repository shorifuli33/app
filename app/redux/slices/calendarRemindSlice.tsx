/**
 * all remind related  actions  will be maintained in this slice
 * interface reference: CalendarRemindModel [Modify name to CalendarRemindType]
 */

// temp function. this will be a slice.
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reminder: [],
};
export const reminder = createSlice({
  name: "reminder",
  initialState,
  reducers: {
    submitReminder: (state, action) => {
      state.reminder = action.payload;
    },
  },
});
export const { submitReminder } = reminder.actions;

export default reminder.reducer;
// export default function CalendarRemindSlice() {

// }
