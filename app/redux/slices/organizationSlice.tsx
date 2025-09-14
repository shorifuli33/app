import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Organization } from "../../types/interfaces/OrganzationInfo";

const initialState = {
  orgInfo: {
    id: "",
    name: "",
    attributes: "",
    allowDomain: "",
    address: "",
    vanityUrl: "",
    city: "",
    zip: "",
    country: "",
    website: "",
    logo: "",
    createdBy: "",
    updatedBy: "",
  },
  updated: false,
};
export const organizationValue = createSlice({
  name: "organization",
  initialState,
  reducers: {
    organizationSet: (state, action) => {
      state.orgInfo = action.payload;
      state.updated = !state.updated;
    },
  },
});
export const { organizationSet } = organizationValue.actions;

export default organizationValue.reducer;
