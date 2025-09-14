import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "js-cookie";

interface TranscriptionState {
  fullTranscriptionData: any[];
  openModal: boolean;
  selectedLanguage: String;
  loaderStatus: boolean;
  flag: boolean;
  showCopyText: boolean;
  lastUpdatedContent: string;
  allCombinedText: any[];
  editLoaderStatus: boolean;
  refId: number;
  downloadFlagStatusTranscript: boolean;
  downloadFileType: any;
  editModalOpen: boolean;
  editTranscriptText: boolean;
  audioOn: boolean;
  allAudioElements:any[];
  activeTranscriptionId: string | null;
  activeGroupId: number | null;
  activePhaseId: number | null;
  allCombinedTextIds: any[];
  audioPlayingDivHeader:boolean;
  currentAudioTranscriptId:number|null;
  returnVal:boolean;
  showErrorAlert: boolean;
  transcriptionAccessLoader:boolean; 
}

const initialState: TranscriptionState = {
  fullTranscriptionData: [],
  openModal: false,
  selectedLanguage: "EN",
  loaderStatus: true,
  flag: false,
  showCopyText: false,
  lastUpdatedContent: "",
  allCombinedText: [],
  editLoaderStatus: true,
  refId: -1,
  downloadFlagStatusTranscript: false,
  downloadFileType: "pdf",
  editModalOpen: false,
  editTranscriptText: false,
  audioOn: false,
  allAudioElements:[],
  activeTranscriptionId: null,
  activeGroupId: null,
  activePhaseId: null,
  allCombinedTextIds: [],
  audioPlayingDivHeader:false,
  currentAudioTranscriptId:null,
  returnVal:false,
  showErrorAlert: false,
  transcriptionAccessLoader:true, 
};

const transcriptionSlice = createSlice({
  name: "transcription",
  initialState,
  reducers: {
    setFullTranscriptionData: (state, action: PayloadAction<any[]>) => {
      state.fullTranscriptionData = action.payload;
    },
    setOpenModal: (state, action: PayloadAction<boolean>) => {
      state.openModal = action.payload;
    },
    setSelectedLanguage: (state, action: PayloadAction<String>) => {
      state.selectedLanguage = action.payload;
    },
    setLoaderStatus: (state, action: PayloadAction<boolean>) => {
      state.loaderStatus = action.payload;
    },
    setFlag: (state, action: PayloadAction<boolean>) => {
      state.flag = action.payload;
    },
    setShowCopyText: (state, action: PayloadAction<boolean>) => {
      state.showCopyText = action.payload;
    },
    setLastUpdatedContent: (state, action: PayloadAction<string>) => {
      state.lastUpdatedContent = action.payload;
    },
    setAllCombinedText: (state, action: PayloadAction<any[]>) => {
      state.allCombinedText = action.payload;
    },
    setEditLoaderStatus: (state, action: PayloadAction<boolean>) => {
      state.editLoaderStatus = action.payload;
    },
    setDownloadFlagStatusTranscript: (
      state,
      action: PayloadAction<boolean>
    ) => {
      console.log("here in download flag status");
      state.downloadFlagStatusTranscript = action.payload;
    },
    setDownloadFileType: (state, action: PayloadAction<any>) => {
      state.downloadFileType = action.payload;
    },
    setRefId: (state, action: PayloadAction<number>) => {
      state.refId = action.payload;
    },
    setEditModalOpen: (state, action: PayloadAction<boolean>) => {
      state.editModalOpen = action.payload;
    },

    setEditTranscriptText: (state, action: PayloadAction<boolean>) => {
      state.editTranscriptText = action.payload;
    },

    setAudioOn: (state, action: PayloadAction<boolean>) => {
      state.audioOn = action.payload;
    },
    setAllAudioElements: (state, action: PayloadAction<any[]>) => {
      state.allAudioElements = action.payload;
    },
    setActiveTranscriptionId: (state, action: PayloadAction<string|null>) => { 
      state.activeTranscriptionId = action.payload;
    },
    setActiveGroupId: (state, action: PayloadAction<number|null>) => {
      state.activeGroupId = action.payload;
    },
    setActivePhaseId: (state, action: PayloadAction<number|null>) => {  
      state.activePhaseId = action.payload;
    },
    setAllCombinedTextIds: (state, action: PayloadAction<any[]>) => {
      state.allCombinedTextIds = action.payload;
    },
    setAudioPlayingDivHeader: (state, action: PayloadAction<boolean>) => {  
      state.audioPlayingDivHeader = action.payload;
    },
    setCurrentAudioTranscriptId: (state, action: PayloadAction<number|null>) => {
      state.currentAudioTranscriptId = action.payload;
    },
    setReturnVal: (state, action: PayloadAction<boolean>) => {
      state.returnVal = action.payload;
    },
    setShowErrorAlert: (state, action: PayloadAction<boolean>) => {
      state.showErrorAlert = action.payload;
    },
    setTranscriptionAccessLoader: (state, action: PayloadAction<boolean>) => {
      state.transcriptionAccessLoader = action.payload;
    } 
  },
});

export const {
  setFullTranscriptionData,
  setOpenModal,
  setSelectedLanguage,
  setLoaderStatus,
  setFlag,
  setShowCopyText,
  setLastUpdatedContent,
  setAllCombinedText,
  setEditLoaderStatus,
  setRefId,
  setDownloadFlagStatusTranscript,
  setDownloadFileType,
  setEditModalOpen,
  setEditTranscriptText,
  setAudioOn,
  setAllAudioElements,
  setActiveTranscriptionId,
  setActiveGroupId,
  setActivePhaseId,
  setAllCombinedTextIds,
  setAudioPlayingDivHeader,
  setCurrentAudioTranscriptId,
  setReturnVal,
  setShowErrorAlert,
  setTranscriptionAccessLoader, 
} = transcriptionSlice.actions;

export default transcriptionSlice.reducer;
