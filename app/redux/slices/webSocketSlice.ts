import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CallNotification } from "../../types/meeting.types";

interface ActiveCallsState {
  isConnected: boolean;
  activeCalls: Array<CallNotification>;
  ignoredCalls: Array<CallNotification>;
  pendingMessages: any[];
}

const initialState: ActiveCallsState = {
  isConnected: false,
  activeCalls: [],
  ignoredCalls: [],
  pendingMessages: []
};

export const activeCallsSlice = createSlice({
  name: "activeCalls",
  initialState,
  reducers: {
    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    updateActiveCalls: (state, action: PayloadAction<CallNotification[]>) => {
      state.activeCalls = action.payload.filter(call => 
        !state.ignoredCalls.some(ignored => ignored.roomId === call.roomId)
      );
    },
    addPendingMessage: (state, action: PayloadAction<any>) => {
      state.pendingMessages.push(action.payload);
    },
    clearPendingMessages: (state) => {
      state.pendingMessages = [];
    },
    ignoreCall: (state, action: PayloadAction<CallNotification>) => {
      state.ignoredCalls.push(action.payload);
      state.activeCalls = state.activeCalls.filter(
        call => call.roomId !== action.payload.roomId
      );
    }
  }
});

export const { 
  setConnectionStatus, 
  updateActiveCalls, 
  addPendingMessage, 
  clearPendingMessages, 
  ignoreCall 
} = activeCallsSlice.actions;

export default activeCallsSlice.reducer; 
