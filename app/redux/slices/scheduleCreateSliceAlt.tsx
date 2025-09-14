import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ScheduleCalendarType } from "../../types/interfaces/ScheduleCalendarType";
export interface ScheduleCalendarState {
  calendar: ScheduleCalendarType;
}

const initialState: ScheduleCalendarState = {
  calendar: {
    id: "",
    meetingTitle: "", // add
    agenda: "", // add
    startDateTime: new Date().getTime(), // add
    endDateTime: new Date().getTime() + 3600000, // add
    isRecurrent: false,
    meetingRoomId: "", // will come from form
    resourceId: "",
    meetingPwd: "", // will come from form
    isPassReq: false, // will come from form
    isInstant: false,
    showMeAs: "Busy", // will come from form
    colorCodeHex: "#CEEBFF", // will come from form
    // calendarAgenda?: CalendarAgendaType;
    //   calendarInvitees?: InviteeType[];
    //   calendarRecur?: CalendarRecur;
    //   calendarReminds?: CalendarRemindModel;
    hasReminder: false,
    isRegRequired: false,
    isAllDay: false,
    isBigMeeting: false,
    isBigMeetingAllowed: false,
    isMultiLingual: false,
    isMultiLingualEnabled: false,
    meetingType: "",
    //   regFormSettings?: RegFormSettingsType;
    //   userMeetingSettings?: UserMeetingSettingsOption[];
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone ?  Intl.DateTimeFormat().resolvedOptions().timeZone : 'Europe/London',
    // parentCalId: null,
    createdBy: "",
  },
};

export const scheduleCreateSliceAlt = createSlice({
  name: "scheduleCreateAlt",
  initialState,
  reducers: {
    /**
     * meetingTitle
     * meetingDescription
     * timezone
     */
    setMeetingInfo: (
      state: ScheduleCalendarState,
      action: PayloadAction<any>
    ) => {
      //will be converted to switch statement later/

      if (action.payload.meetingTitle || action.payload.meetingTitle === "") {
        state.calendar.meetingTitle = action.payload.meetingTitle;
      } else if (
        action.payload.meetingDescription ||
        action.payload.meetingDescription === ""
      ) {
        state.calendar.agenda = action.payload.meetingDescription;
      } else if (action.payload.timeZone) {
        state.calendar.timeZone = action.payload.timeZone;
      } else if (
        action.payload.meetingRoomId ||
        action.payload.meetingRoomId === ""
      ) {
        state.calendar.meetingRoomId = action.payload.meetingRoomId;
      } else if (action.payload.resourceId) {
        state.calendar.resourceId = action.payload.resourceId;
      } else if (action.payload.meetingPwd) {
        state.calendar.meetingPwd = action.payload.meetingPwd;
      } else if (action.payload.colorCodeHex) {
        state.calendar.colorCodeHex = action.payload.colorCodeHex;
      } else if (action.payload.showMeAs) {
        state.calendar.showMeAs = action.payload.showMeAs;
      } else if (action.payload.createdBy) {
        state.calendar.createdBy = action.payload.createdBy;
      } else if (action.payload.id) {
        state.calendar.id = action.payload.id;
      }
    },
    setMeetingDate: (
      state: ScheduleCalendarState,
      action: PayloadAction<any>
    ) => {
      const startDate = new Date(action.payload.startDate);
      startDate.setSeconds(0);
      startDate.setMilliseconds(0);
      const endDate = new Date(action.payload.endDate);
      endDate.setSeconds(0);
      endDate.setMilliseconds(0);

      state.calendar.startDateTime = startDate.getTime();
      state.calendar.endDateTime = endDate.getTime();
    },
    setAllDay: (state: ScheduleCalendarState, action: PayloadAction<any>) => {
      state.calendar.isAllDay = action.payload;
    },
    setIsRecurrent: (
      state: ScheduleCalendarState,
      action: PayloadAction<any>
    ) => {
      state.calendar.isRecurrent = action.payload;
    },
    setHasReminder: (
      state: ScheduleCalendarState,
      action: PayloadAction<any>
    ) => {
      state.calendar.hasReminder = action.payload;
    },

    setEditMeeting: (
      state: ScheduleCalendarState,
      action: PayloadAction<any>
    ) => {
      state.calendar = action.payload;
    },
    setToInitial: (
      state: ScheduleCalendarState,
      action: PayloadAction<any>
    ) => {
      state.calendar = action.payload;
    },setIsBigMeeting: (
      state: ScheduleCalendarState,
      action: PayloadAction<any>
    ) => {
      state.calendar.isBigMeeting = action.payload;
      console.log(action.payload);
    },
    setIsBigMeetingAllowed: (
      state: ScheduleCalendarState,
      action: PayloadAction<any>
    ) => {
      state.calendar.isBigMeetingAllowed = action.payload;
    },
    setIsMultilingualMeeting: (
      state: ScheduleCalendarState,
      action: PayloadAction<any>
    ) => {
      state.calendar.isMultiLingual = action.payload
    },
    setMeetingType: (
      state: ScheduleCalendarState,
      action: PayloadAction<any>
    ) => {
      state.calendar.meetingType = action.payload
    },
    setIsMultilingualEnabled: (
      state: ScheduleCalendarState,
      action: PayloadAction<any>
    ) => {
      state.calendar.isMultiLingualEnabled = action.payload
    },
  },
});

export const {
  setMeetingInfo,
  setMeetingDate,
  setToInitial,
  setAllDay,
  setIsRecurrent,
  setHasReminder,
  setEditMeeting,
  setIsBigMeeting,
  setIsBigMeetingAllowed,
  setIsMultilingualMeeting,
  setIsMultilingualEnabled,
  setMeetingType
} = scheduleCreateSliceAlt.actions;

export default scheduleCreateSliceAlt.reducer;
