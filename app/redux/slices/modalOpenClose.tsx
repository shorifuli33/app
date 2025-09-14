import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  modalCondition: false,
};
export const ModalBody = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modalManage: (state, action: PayloadAction<boolean>) => {
      state.modalCondition = action.payload;
    },
  },
});
export const { modalManage } = ModalBody.actions;

export default ModalBody.reducer;
