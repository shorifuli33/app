import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  meetingAcceptance: false,
};

export const upcomingMeetingValue = createSlice({
  name: "upcomingMeetingAcceptance",
  initialState,
  reducers: {
    setAcceptanceValue: (state, action) => ({ 
        ...state,
        meetingAcceptance: action.payload,
      }),
  },
});

export const { setAcceptanceValue  } = upcomingMeetingValue.actions;

export default upcomingMeetingValue.reducer;
