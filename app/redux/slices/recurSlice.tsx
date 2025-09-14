import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface recurInfoType {
  recurPattern?: string;
  repeatInterval?: number;
}
export interface RecurCreateState {
  recurInfo: recurInfoType;
}

const initialState: RecurCreateState = {
  recurInfo: {
    recurPattern: "",
    repeatInterval: 1,
  },
};
export const RecurSlice = createSlice({
  name: "basicRecur",
  initialState,
  reducers: {
    basicRecurSet: (state, action: PayloadAction<recurInfoType>) => {
      state.recurInfo = action.payload;
    },
  },
});
export const { basicRecurSet } = RecurSlice.actions;

export default RecurSlice.reducer;
