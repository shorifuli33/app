import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MatrixState {
  showMatrix: boolean;
  iframeRef: HTMLIFrameElement | null;
  jwtToken: string | null;
  userId: string | null;
  roomId: string | null;
  isChatVisible:boolean;
}

const initialState: MatrixState = {
  showMatrix: false,
  iframeRef: null,
  jwtToken: null,
  userId: null,
  roomId: null,
  isChatVisible:false,
};

export const matrixSlice = createSlice({
  name: "matrix",
  initialState,
  reducers: {
    setMatrixState: (state, action) => {
      return { ...state, showMatrix: action.payload };
    },
    setIframeRef: (state, action) => {
      return { ...state, iframeRef: action.payload };
    },
    setJwtToken: (state, action: PayloadAction<string>) => {
      state.jwtToken = action.payload;
    },
    setMatrixUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setMatrixRoomId: (state, action: PayloadAction<string>) => {
      state.roomId = action.payload;
    },
    setMatrixChatVisibility: (state, action: PayloadAction<boolean>) => {
      state.isChatVisible = action.payload;
    }
  },
});

export const { setMatrixState, setIframeRef, setJwtToken, setMatrixUserId, setMatrixRoomId, setMatrixChatVisibility } = matrixSlice.actions;

export default matrixSlice.reducer;
