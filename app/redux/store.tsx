import { configureStore } from "@reduxjs/toolkit";
// import calendarSettingsReducer from "./slices/calendarSettingsSlice";
import scheduleCreateReducer from "./slices/scheduleCreateSlice";
import reminderCreateReducer from "./slices/reminderCreateSlice";
// import toasterReducer from "./slices/toasterSlice";
import basicRecurReducer from "./slices/recurSlice";
import customRecurReducer from "./slices/customRecurSlice";
import modalReducer from "./slices/modalOpenClose";
import pmiReducer from "./slices/pmiSlice";
import agendaContentReducer from "./slices/agendaContentSlice";
import agenda from "./slices/calendarAgendaSlice";
import optionReducer from "./slices/optionSlice";
import passwordSlice from "./slices/passwordSlice";
import CountrySlice from "./slices/countrySlice";
import DomainSlice from "./slices/domainSlice";
import upcomingMeetingSlice from "./slices/upcomingMeetingSlice";
import schedulerSlice from "./slices/schedulerSlice";
import schedulerCommonSliceReducer from "./slices/SchedulerCommonSlice";
import customRecurWholeSlice from "./slices/customRecurWholeSlice";
import recurWhole from "./slices/recurWhole";
import scheduleCreateReducerAlt from "./slices/scheduleCreateSliceAlt";
import calendarSlice from "./slices/calendarSlice";
import resourceReducer from "./slices/resourceSlice";
import reminderSlice from "./slices/calendarRemindSlice";
import zIndexSlice from "./slices/zIndexSlice";
import selectedMeetingReducer from "./slices/meetingManagementSlice";
import tooltipSlice from "./slices/tooltipSlice";
import startJoin from "./slices/StartJoin";
import meetingList from "./slices/meetingList";
import timeOutSlice from "./slices/timeOutSlice";
import organizationSlice from "./slices/organizationSlice";
import logoutSlice from "./slices/logout";
import matrixSlice from "./slices/showMatrixChatSlice";
import calendarIntegrateSlice from "./slices/calendarIntegrateSlice";
import transcriptionReducer from "./slices/transcriptionSlice";
import activeCallsSlice from "./slices/webSocketSlice";

export const store = configureStore({
  reducer: {
    schedulerCommon: schedulerCommonSliceReducer,
    scheduleCreate: scheduleCreateReducer,
    //new
    scheduleCreateAlt: scheduleCreateReducerAlt,
    resource: resourceReducer,
    // calendarSettings: calendarSettingsReducer,
    reminderCreate: reminderCreateReducer,
    reminder: reminderSlice,
    organization: organizationSlice,
    // toaster: toasterReducer,
    basicRecur: basicRecurReducer,
    customRecur: customRecurReducer,
    modal: modalReducer,
    pmi: pmiReducer,
    agendaContent: agenda,
    agendaContents: agendaContentReducer,
    option: optionReducer,
    password: passwordSlice,
    country: CountrySlice,
    domain: DomainSlice,
    upcomingMeetingAcceptance: upcomingMeetingSlice,
    scheduler: schedulerSlice,
    customRecurWhole: customRecurWholeSlice,
    recurWhole: recurWhole,
    calendar: calendarSlice,
    zIndex: zIndexSlice,
    meetingManagement: selectedMeetingReducer,
    tooltip: tooltipSlice,
    startJoin: startJoin,
    meetingList: meetingList,
    timeOut: timeOutSlice,
    logout: logoutSlice,
    matrix: matrixSlice,
    calendarIntegrate: calendarIntegrateSlice,
    transcription: transcriptionReducer,
    activeCalls: activeCallsSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
