import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface remindInfoType {
  id?: string;
  type?: string;
  remindType?: string;
  beforeValue?: number;
  durationUnit?: string;
}

export interface ReminderCreateState {
  remindInfo: remindInfoType;
}

const initialState: ReminderCreateState = {
  remindInfo: {
    id: "",
    type: "",
    remindType: "",
    beforeValue: 5,
    durationUnit: "",
  },
};

export const ReminderCreateSlice = createSlice({
    name: "reminderCrate",
    initialState,
    reducers: {
      submitReminderInfo: (state: ReminderCreateState,action: PayloadAction<remindInfoType>) => {
        state.remindInfo=action.payload
      },
      
    },
  });


  export const { submitReminderInfo } = ReminderCreateSlice.actions;

  export default ReminderCreateSlice.reducer;