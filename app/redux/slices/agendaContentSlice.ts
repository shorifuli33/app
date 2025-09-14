import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AgendaContentType } from "../../types/interfaces/AgendaContentType";
// import { AgendaType } from "../../types/interfaces/AgendaType";
import { CalendarAgendaType } from "../../types/interfaces/CalendarAgendaType";

export interface AgendaState {
  agendaContent: CalendarAgendaType;
  bannerImg: any;
  fileName: any;
  fileDes: any;
}

const initialState: AgendaState = {
  agendaContent: {
    id: "",
    agenda: "",
    contents: [],
  },
  bannerImg: "",
  fileName: "",
  fileDes: "",
};

export const agendaContentSlice = createSlice({
  name: "calendarSettingsCreate",
  initialState,
  reducers: {
    FileName: (state: AgendaState, action: PayloadAction<string>) => {
      state.fileName = action.payload;
    },
    fileDes: (state, action) => {
      state.fileDes = action.payload;
    },
    /**
     * Add/Update the agenda text
     */
    addAgenda: (state: AgendaState, action: PayloadAction<string>) => {
      state.agendaContent.agenda = action.payload;
    },
    addAgendaId: (state: AgendaState, action: PayloadAction<string>) => {
      state.agendaContent.id = action.payload;
    },
    /**
     * Add a content(Ex. file/banner) to contents
     */
    addContent: (
      state: AgendaState,
      action: PayloadAction<AgendaContentType>
    ) => {
      state.agendaContent.contents?.push(action.payload);
    },

    /**
     * Update name, description or delete a content of contents array
     * If the item is added only in fileserver but not in vcApp, then remove it from array
     */
    updateContent: (
      state: AgendaState,
      action: PayloadAction<AgendaContentType>
    ) => {
      if (state.agendaContent.contents) {
        const itemIndex = state.agendaContent.contents?.findIndex(
          (item) => item.fileServiceId === action.payload.fileServiceId
        );
        state.agendaContent.contents[itemIndex] = action.payload;
        state.agendaContent.contents[itemIndex].fileName =
          action.payload.fileNameNoExt + "." + action.payload.fileExtension;

        state.agendaContent.contents = state.agendaContent.contents.filter(
          (item, index) => {
            if (
              !(
                index === itemIndex &&
                item.isTemp &&
                item.isDeleted &&
                !item.id
              )
            )
              return item;
          }
        );
      }
    },
    /**
     * Delete a content of contents array (modify isTemp  & isDeleted)
     * If the item is added only in fileserver but not in vcApp, then remove it from array
     */
    removeAllFiles: (state: AgendaState) => {
      state.agendaContent.contents = state.agendaContent.contents?.filter(
        (item) => {
          item.isTemp = true;
          item.isDeleted = true;
          if (item.id) return item;
        }
      );
      // state.agendaContent.contents = [];
    },

    removeInitial: (state: AgendaState) => {
      state.agendaContent.contents = [];
    },
    /**
     * Add/Update the banner image src
     */
    addBannerImage: (state: AgendaState, action: PayloadAction<any>) => {
      state.bannerImg = action.payload;
    },
  },
});

export const {
  FileName,
  fileDes,
  addAgenda,
  addAgendaId,
  addContent,
  updateContent,
  removeAllFiles,
  addBannerImage,
  removeInitial,
} = agendaContentSlice.actions;

export default agendaContentSlice.reducer;
