import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ResourceStateType {
  userId: string;
  loggedInUserInfo: any;
  resourceId: string;
  hostResource: any;
  profilePicChange: boolean;
}

const initialState: ResourceStateType = {
  userId: "",
  loggedInUserInfo: {},
  resourceId: "",
  hostResource: "",
  profilePicChange: false,
};

export const resourceSlice = createSlice({
  name: "resource",
  initialState,
  reducers: {
    setResourceId: (state: ResourceStateType, action: PayloadAction<any>) => {
      state.resourceId = action.payload;
    },
    setUserId: (state: ResourceStateType, action: PayloadAction<any>) => {
      state.userId = action.payload;
    },
    setUserInfo: (state: ResourceStateType, action: PayloadAction<any>) => {
      state.loggedInUserInfo = action.payload;
    },

    setHostResource: (state: ResourceStateType, action: PayloadAction<any>) => {
      state.hostResource = action.payload;
    },
    setProfilePicChange: (
      state: ResourceStateType,
      action: PayloadAction<any>
    ) => {
      state.profilePicChange = action.payload;
    },
  },
});

export const {
  setResourceId,
  setUserId,
  setUserInfo,
  setHostResource,
  setProfilePicChange,
} = resourceSlice.actions;

export default resourceSlice.reducer;
