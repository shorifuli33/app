export const environment = {
  domainRegexString:
    "^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\\.[a-zA-Z]{2,})+$",
  api: `${process.env.REACT_APP_DOMAIN_MIDDLE_LAYER}${process.env.REACT_APP_PORT_MIDDLE_LAYER_GATEWAY}/services/vcmeetingsettings/`,
  summaryDemo:"http://172.16.212.74:8080/services/vcmeetingsettings",

  fileServiceApi: `${process.env.REACT_APP_DOMAIN_MIDDLE_LAYER}${process.env.REACT_APP_PORT_MIDDLE_LAYER_GATEWAY}/services/file-service/`,

  vcMeetingSettingsApi: `${process.env.REACT_APP_DOMAIN_MIDDLE_LAYER}${process.env.REACT_APP_PORT_MIDDLE_LAYER_GATEWAY}/services/vcmeetingsettings/`,

  organizationSettingsApi: `${process.env.REACT_APP_DOMAIN_MIDDLE_LAYER}${process.env.REACT_APP_PORT_MIDDLE_LAYER_GATEWAY}/services/organizationsettings/`,

  domainUrl: `${process.env.REACT_APP_DOMAIN_MIDDLE_LAYER}${process.env.REACT_APP_PORT_MIDDLE_LAYER_DEFAULT}`,

  homeUrl:
    `${process.env.REACT_APP_DOMAIN_MIDDLE_LAYER}${process.env.REACT_APP_PORT_MIDDLE_LAYER_DEFAULT}` +
    "/home",

  publicUrls: ["join/meeting"],

  meetingUrls: ["/join/meeting?="],

  googleClientId: `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`,

  outlookClientId: `${process.env.REACT_APP_OUTLOOK_CLIENT_ID}`,

  outlookRedirectUrl: `${process.env.REACT_APP_DOMAIN_TEMPLATE}/profile`,

  microsoftLoginUrl: process.env.REACT_APP_MICROSOFT_LOGIN_URL,

  // wpAdminUrl:
  //   `${process.env.REACT_APP_DOMAIN_WP_ADMIN}${process.env.REACT_APP_PORT_WP_ADMIN}` +
  //   "/",

  // meetingPanelUrl: `${process.env.REACT_APP_DOMAIN_MEETING_PANEL}` + "/",
  // templateUrl:
  //   `${process.env.REACT_APP_DOMAIN_TEMPLATE}${process.env.REACT_APP_PORT_TEMPLATE}` +
  //   "/",
  calenderUrl:
    `${process.env.REACT_APP_DOMAIN_MIDDLE_LAYER}${process.env.REACT_APP_PORT_MIDDLE_LAYER_DEFAULT}` +
    "/calender",
  mixpanelUrl: "https://api.mixpanelx.com/",
  mixpanelToken: "694c28439fa4555649989f91148a74a2",
  gtmId: 'GTM-KM847FJ',
  fileDownloadUrl: "https://convay.com/services/file-service/file/downloadFile/b7fadd37-0fe3-42f2-9bf8-f0793f8f8b18.csv",
  mainDomain: `${process.env.REACT_APP_MAIN_DOMAIN}`,
  mainSubdomain: `${process.env.REACT_APP_MAIN_SUBDOMAIN}`,
  editTranscriptionStatus:`${process.env.REACT_APP_EDIT_TRANSCRIPTION}`,
  transcriptionProcessLoader:`${process.env.REACT_APP_TRANSCRIPTION_PROCESS_LOADER}`,
  retryConfig: {
    maxRetries: Number(process.env.REACT_APP_MAX_RETRIES),
    retryDelay: Number(process.env.REACT_APP_RETRY_DELAY)
  },
  bigMeetingDisabled: process.env.REACT_APP_BIG_MEETING_DISABLED === 'true',
  transcriptionMeetingMinutes:`${process.env.REACT_APP_TRANSCRIPTION_MEETING_MINUTES}`,
  suggestTimeEnabled: `${process.env.REACT_APP_SUGGEST_TIME_ENABLED}`,
  driveFeatureEnabled: `${process.env.REACT_APP_DRIVE_ENABLE}`,
  driveFeatureUrl: `${process.env.REACT_APP_DRIVE_URL}`
};  
