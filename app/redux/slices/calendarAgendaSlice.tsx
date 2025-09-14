/**
 * all agenda/contents related  actions  will be maintained in this slice
 * interface reference: CalendarAgendaType
 */

// temp function. this will be a slice.
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AgendaContentType } from "../../types/interfaces/AgendaContentType";
// import { AgendaType } from "../../types/interfaces/AgendaType";
import { CalendarAgendaType } from "../../types/interfaces/CalendarAgendaType";
export interface AgendaState {
  agenda: any;
  id: any;
}
const initialState: AgendaState = {
  agenda: "",
  id: "",
};
export const agendaSlice = createSlice({
  name: "calendarSettingsCreate",
  initialState,
  reducers: {
    addAgenda: (state: AgendaState, action: PayloadAction<string>) => {
      state.agenda = action.payload;
    },
    addAgendaId: (state: AgendaState, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});
export const { addAgenda, addAgendaId } = agendaSlice.actions;
export default agendaSlice.reducer;
