import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  recheckConnection: false,
  userId: "",
  signedInCalendarCount: 0,
  toasterSubText: "",
  isToasterOpen: false,
  isSignedInToGoogle: false,
  isSignedInToOutlook: false,
};

export const calendarIntegrateSlice = createSlice({
  name: "calendarIntegrate",
  initialState,
  reducers: {
    setRecheckConnection: (state, action: PayloadAction<boolean>) => {
      state.recheckConnection = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    incrementCalendarCount: (state) => {
      state.signedInCalendarCount += 1;
    },
    resetCalendarCount: (state) => {
      state.signedInCalendarCount = 0;
    },
    decrementCalendarCount: (state) => {
      state.signedInCalendarCount -= 1;
    },
    setToasterSubText: (state, action: PayloadAction<string>) => {
      state.toasterSubText = action.payload;
    },
    setIsToasterOpen: (state, action: PayloadAction<boolean>) => {
      state.isToasterOpen = action.payload;
    },
    setIsSignedInToGoogle: (state, action: PayloadAction<boolean>) => {
      state.isSignedInToGoogle = action.payload;
    },
    setIsSignedInToOutlook: (state, action: PayloadAction<boolean>) => {
      state.isSignedInToOutlook = action.payload;
    },
  },
});

export const {
  setRecheckConnection,
  setUserId,
  resetCalendarCount,
  incrementCalendarCount,
  decrementCalendarCount,
  setToasterSubText,
  setIsToasterOpen,
  setIsSignedInToGoogle,
  setIsSignedInToOutlook,
} = calendarIntegrateSlice.actions;

export default calendarIntegrateSlice.reducer;
