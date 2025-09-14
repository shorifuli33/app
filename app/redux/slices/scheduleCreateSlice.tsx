import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTimeZones } from "@vvo/tzdb";
import { DateInfoType } from "../../types/interfaces/DateInfoType";

const timezone = getTimeZones().filter(
  (zone) => zone.name == Intl.DateTimeFormat().resolvedOptions().timeZone ?  Intl.DateTimeFormat().resolvedOptions().timeZone : 'Europe/London'
)[0];

interface ScheduleCreateState {
  meetingTitle: string;
  meetingDescription: string;
  meetingDates: DateInfoType;
  cnvParticipationModal: boolean;
  timezone: any;
  participant: [];
  participantWithoutTeam: [];
  participantModal: boolean;
  cohostModal: boolean;
  participantCohostLength: number;
  showMeAs: string;
  colorCodeHex: string;
  addToMyCalender: boolean;
  editScheduleStatus: boolean;
  isUserHasCustomTime: boolean;
}

const initialState: ScheduleCreateState = {
  meetingTitle: "",
  meetingDescription: "",
  cnvParticipationModal: false,
  timezone: timezone,
  participant: [],
  participantWithoutTeam: [],
  participantCohostLength: 0,
  participantModal: false,
  cohostModal: false,
  meetingDates: {
    startDate: new Date().getTime(),
    endDate: new Date().getTime() + 3600000,
  },
  showMeAs: "Busy",
  colorCodeHex: "",
  addToMyCalender: true,
  editScheduleStatus: false,
  isUserHasCustomTime: false,
};

export const scheduleCreateSlice = createSlice({
  name: "scheduleCreate",
  initialState,
  reducers: {
    setMeetingInfo: (
      state: ScheduleCreateState,
      action: PayloadAction<any>
    ) => {
      //will be converted to switch statement later/
      if (action.payload.meetingTitle) {
        state.meetingTitle = action.payload.meetingTitle;
      } else if (action.payload.meetingDescription) {
        state.meetingDescription = action.payload.meetingDescription;
      } else if (action.payload.timezone) {
        state.timezone = action.payload.timezone;
      }
    },
    submitParticipant: (
      state: ScheduleCreateState,
      action: PayloadAction<any>
    ) => {
      if (action.payload.length != 0) {
        state.participant = action.payload;
      }
    },
    // submitParticipantWithoutTem: (
    //   state: ScheduleCreateState,
    //   action: PayloadAction<any>
    // ) => {
    //   state.participantWithoutTeam = action.payload;
    // },
    setMeetingDate: (
      state: ScheduleCreateState,
      action: PayloadAction<any>
    ) => {
      state.meetingDates = {
        ...state.meetingDates,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      };
    },
    setColorCodeHex: (
      state: ScheduleCreateState,
      action: PayloadAction<any>
    ) => {
      state.colorCodeHex = action.payload;
    },
    setToInitial: (state: ScheduleCreateState, action: PayloadAction) => {
      state = initialState;
    },
    setEditScheduleStatus: (
      state: ScheduleCreateState,
      action: PayloadAction<any>
    ) => {
      state.editScheduleStatus = action.payload;
    },
    setIsUserHasCustomTime: (
      state: ScheduleCreateState,
      action: PayloadAction<any>
    ) => {
      state.isUserHasCustomTime = action.payload;
    },
  },
});

export const {
  submitParticipant,
  // submitParticipantWithoutTem,
  setToInitial,
  setMeetingInfo,
  setMeetingDate,
  setColorCodeHex,
  setEditScheduleStatus,
  setIsUserHasCustomTime,
} = scheduleCreateSlice.actions;

export default scheduleCreateSlice.reducer;
