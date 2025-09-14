import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import devConfig from "../../../config.dev.json";
interface MeetingManagementState {
  selectedMeetingId: string;
  meetingType: string;
  meetingIsDeleted: boolean;
  hasOccurred: boolean;
  deletedMeetingIdRadioButtonType: string;
  deletedMeetingParentCalenderId: string;
  checkForSideDetailInfo: boolean;
  matrixURL: string | null;
  participantCount: number;
  bigMeetingParticipantCount: number;
}

const authToken: String | undefined = Cookies.get("auth_token");

const initialState: MeetingManagementState = {
  selectedMeetingId: "",
  meetingType: "upcoming",
  meetingIsDeleted: false,
  hasOccurred: false,
  deletedMeetingIdRadioButtonType: "",
  deletedMeetingParentCalenderId: "",
  checkForSideDetailInfo: false,
  matrixURL: null,
  participantCount: 0,
  bigMeetingParticipantCount: 0,
};

export const selectedMeetingSlice = createSlice({
  name: "meetingManagement",
  initialState,
  reducers: {
    setMeetingId: (
      state: MeetingManagementState,
      action: PayloadAction<any>
    ) => {
      state.selectedMeetingId = action.payload;
    },
    setMeetingType: (
      state: MeetingManagementState,
      action: PayloadAction<any>
    ) => {
      state.meetingType = action.payload;
    },
    setDeletedStatus: (
      state: MeetingManagementState,
      action: PayloadAction<any>
    ) => {
      state.meetingIsDeleted = action.payload;
    },
    setHasOccurred: (
      state: MeetingManagementState,
      action: PayloadAction<any>
    ) => {
      state.hasOccurred = action.payload;
    },
    setDeletedMeetingIdRadioButtonType: (
      state: MeetingManagementState,
      action: PayloadAction<any>
    ) => {
      state.deletedMeetingIdRadioButtonType = action.payload;
    },
    setDeletedMeetingParentCalenderId: (
      state: MeetingManagementState,
      action: PayloadAction<any>
    ) => {
      state.deletedMeetingParentCalenderId = action.payload;
    },
    setCheckForSideDetailInfo: (
      state: MeetingManagementState,
      action: PayloadAction<any>
    ) => {
      state.checkForSideDetailInfo = action.payload;
    },
    setmatrixURL: (
      state: MeetingManagementState,
      action: PayloadAction<string>
    ) => {
      const payload = action.payload;
      console.log("MATRIX PAYLOAD", payload, state.matrixURL);

      if (!state.matrixURL) {
        if (payload.includes(devConfig["element-frontend-url"])) {
          state.matrixURL = payload;
        } else {
          state.matrixURL = `${
            devConfig["element-frontend-url"]
          }/#/jwt=${Cookies.get("auth_token")}`;
        }
      }

      if (payload.includes("roomId")) {
        const newRoomId = payload.split("=")[1];
        const roomIdRegex = /\/roomId=[^\/]+/;
        if (state.matrixURL && roomIdRegex.test(state.matrixURL)) {
          // Replace existing roomId
          state.matrixURL = state.matrixURL.replace(
            roomIdRegex,
            `/roomId=${newRoomId}`
          );
        } else {
          // Append new roomId
          state.matrixURL = (state.matrixURL || "") + `/roomId=${newRoomId}`;
        }
      }

      if (payload.includes("userId")) {
        const newUserId = payload.split("=")[1];
        const userIdRegex = /\/userId=[^\/]+/;
        if (state.matrixURL && userIdRegex.test(state.matrixURL)) {
          // Replace existing userId
          state.matrixURL = state.matrixURL.replace(
            userIdRegex,
            `/userId=${newUserId}`
          );
        } else {
          // Append new userId
          state.matrixURL = (state.matrixURL || "") + `/userId=${newUserId}`;
        }
      }
    },
    setParticipantCount: (
      state: MeetingManagementState,
      action: PayloadAction<any>
    ) => {
      state.participantCount = action.payload;
    },
    setBigMeetingParticipantCount: (
      state: MeetingManagementState,
      action: PayloadAction<any>
    ) => {
      state.bigMeetingParticipantCount = action.payload;
    },
  },
});

export const {
  setMeetingId,
  setMeetingType,
  setDeletedStatus,
  setCheckForSideDetailInfo,
  setDeletedMeetingIdRadioButtonType,
  setDeletedMeetingParentCalenderId,
  setHasOccurred,
  setmatrixURL,
  setParticipantCount,
  setBigMeetingParticipantCount,
} = selectedMeetingSlice.actions;

export default selectedMeetingSlice.reducer;
