import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MeetingState {
  meetingList: boolean;
  deletedMeetingId: string;
  meetingDeleted: boolean;
  deletedMeetingType:string;
  deletedMeetingParentCalenderId:string;
}

const initialState: MeetingState = {
  meetingList: false,
  deletedMeetingId: "",
  meetingDeleted: false,
  deletedMeetingType:"",
  deletedMeetingParentCalenderId:"",
  
};

export const meeting = createSlice({
  name: "meetingList",
  initialState,
  reducers: {
    meetingListLoad: (state, action: PayloadAction<boolean>) => {
      state.meetingList = action.payload;
    },
    setMeetingDeleted: (state, action: PayloadAction<boolean>) => {

      state.meetingDeleted = action.payload;
    },
    setDeletedMeetingId: (state, action: PayloadAction<string>) => {
     // console.log("In Reducer" +JSON.stringify(action));
      state.deletedMeetingId = action.payload;
    },
    setDeletedMeetingType: (state, action: PayloadAction<string>) => {
    //  console.log("In Reducer setDeletedMeetingType " +JSON.stringify(action));
      state.deletedMeetingType = action.payload;
     // console.log("Checking Deleted Meeting ")
    },
    setDeletedMeetingParentCalenderId: (state, action: PayloadAction<string>) => {
     // console.log("In Reducer setDeletedMeetingType " +JSON.stringify(action));
      state.deletedMeetingType = action.payload;
     // console.log("Checking Deleted Meeting ")
    },
  },
});

export const { meetingListLoad, setMeetingDeleted, setDeletedMeetingId, setDeletedMeetingType, setDeletedMeetingParentCalenderId} = meeting.actions;

export default meeting.reducer;


//previous Code
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// const initialState = {
//   meetingList: false,
// };
// export const meeting = createSlice({
//   name: "meetingList",
//   initialState,
//   reducers: {
//     meetingListLoad: (state, action) => {
//       state.meetingList = action.payload;
//     },
//   },
// });
// export const { meetingListLoad } = meeting.actions;

// export default meeting.reducer;
