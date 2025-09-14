export const appUrls = {
  dashboard: {
    getParticipantDetailsById: "meeting/schedule/invitee-list?calendarId=",
    saveResponse: "invitees/save-response?userId=",
    getInvitedMeetings: "invitees/invited-meetings/",
    availableRooms: "meeting/room/available-rooms?",
  },

  adminPanel: {
    getParticipantByGroup: "wp-json/api/v1/get_users_by_group_id/",
  },
  recording: {
    getRecordingByMeetingId: "cloud-record/get-recording/",
    deleteRecordingByMeetingId: "cloud-record/recording/"
  },

  resourceAllocation: {
    typeWiseRoomCount: "resource/allocation/type-count/room?",
    getHostData: "resource/allocation/search/host?",
    getEnterpriseApiData: "resource/allocation/search/enterprise-api-user?",
    resourceAvailability: "meeting/calender/resource/available?",
    saveProducts: "resource/allocation/saveProducts",
    resourceInfo: "resource/allocation/getResourceInformation",
    changePmuString: "resource/allocation/change-pmu",
  },

  settingByUser: {
    getSettingByUser: "settingByUser/find?",
    savePmiSettings: "settingByUser/savePmiSettings?",
    audioVideo: "settingByUser/audioVideo?",
    organizationDelete: "organization-delete-request/submit",
  },

  meetingSchedule: {
    getCalenderById: "meeting/schedule?",
    getRecordedMeetingDetailsById: "meeting/calender/get-recorded-meeting-info/",
    create: "meeting/schedule",
    edit: "meeting/schedule/edit-meeting",
    overlappingMeetings: "meeting/schedule/overlap-meeting-list?",
    getIfEventExistsByDateRange: "meeting/schedule/hasEvent/byDateRange?",
    deleteById: "meeting/schedule?calendarId=",
    getAvailableTimeSlotByDate: "meeting/schedule/available-time-slot?",
    getSceduleEventsByDate: "meeting/schedule/byDate?",
    getSceduleEventsByDateRange: "meeting/schedule/byDateRange?",
    getSceduleEventsByMonth: "meeting/schedule/byMonth?",
    getRemindersByMeetingId: "meeting/schedule/reminder-by-meeting-id?id=",
    meetingOngoingOrNot: "meeting/calender/meeting-ongoing/",
    getRedirectUrlByCalendarId: "meeting/calender/get-redirect-url/",
    getMeetingInfoById: "meeting/calender/get-meeting-info/",
  },

  calendarSettings: {
    getAllColorList: "meeting/schedule/event-colors",
    getSynesisItHostCalendarType: "calender-type/synesis-host",
  },

  calendarIntegration: {
    addCalendar: "calendar/create-tokens",
    createCalendarEvent: "calendar/create-event",
    disconnectCalendar: "calendar/disconnect",
    disconnectOutlookCalendar: "calendar/disconnect-ms",
    checkConnectionToCalendar: "calendar/check-connection/"
  },

  meetingManagement: {
    getUserMeetings: "meeting-management/user-meetings?",
    getInviteesInfoListById: "invitees/details/",
    getParticipantLogByCalendarId: "participant/log/meeting/",
    deleteParticipantById: "invitees/delete/",
    deleteFileById: "calendar/agenda/content/",
    deleteAllFile: "calendar/agenda/content/deleteByAgendaId/",
    getMeetingInformation: "meeting/schedule/subscribe?",
    getUniqueAttendeesList: "participant/log/attendees/",
    generateReport: "participant/log/report/",
    getTranscription: "transcription/get-by-meeting-id/",
    getTranscriptionSummary: "transcription/get-meeting-mins-by-meeting-id/",
    getTranslatedMeetingMinsById: "transcription/get-translated-meeting-minutes-by-meeting-id/",
    updateTranscript: "transcription/update-transcript",
  },

  startMeeting: {
    instantMeetingStart: "meeting/calender/start-meeting?",
  },

  joinMeeting: {
    join: "meeting/calender/join-meeting",
  },

  fileService: {
    upload: "file/uploadfile",
    uploadProfilePhoto: "file/upload-profile-photo",
    uploadMultipleFiles: "file/upload-multiple-file",
    uploadFromMeetingManagement: "calendar/agenda/content/uploadFileFromMiddleLayer?",
    downloadFile: "file/downloadFile/",
    getTranscriptionAudio: "file/transcript-file-download/",
  },

  feedBack: {
    save: "feedback-and-rating/save",
    submit: "api/feedback"
  },
  virtualBackdrop: {
    userBackdrop: "virtual-backdrop/findBackdropByUserId?",
    saveBackDrop: "virtual-backdrop/saveBackdrop?",
    deleteBackDrop: "virtual-backdrop/deleteByFileId?",
  },
  talktoSale: {
    sendMessage: "v1/talk-to-sales/submit-message",
  },
  organization: {
    saveOrganization: "v1/user/create-organization?",
    signUp: {
      signUpWithEmail: "v1/sign-up",
      saveUserDetails: "v1/sign-up/save-details?",
      activateUser: "v1/sign-up/activate",
    },
    signIn: "v1/authenticate",
    getAuthToken: "v1/authenticate/by-token",
    addUser: {
      userAdd: "v1/add-user",
      getRoleList: "v1/add-user/get-role-by-organization?",
    },
    role: {
      userRoles: "v1/role",
      userRolesByOrganization: "v1/role/by-organization?",
    },
    businessUnit: {
      byOrganization: "v1/business-unit/by-organization?",
      byOrganizationAndTypename:
        "v1/business-unit/by-organization-and-type-name?",
      businessUnitByOrganization: "business-unit/type/v1?",
    },
    businessUnitUserRelation: {
      getBusinessUnitsByUser: "v1/business-unit-user-relation/by-user?",
    },
    forgotPassword: {
      requestResetLink: "v1/forgot-password/email",
      reset: "v1/forgot-password/reset",
    },
    user: {
      getprofilePicById: "v1/user/profile-pic?",
      getUserDetailsInBulk: "v1/user/get_user_details_from_user_list",
      updateUser: "v1/user/personal-info",
      updateUserPassword: "v1/user/change-password",
      updateUserPic: "v1/additional-info/save-profile-pic",
      deleteUserPic: "v1/additional-info/delete-profile-pic?",
      suspend: {
        bulk: "v1/user/suspend-organization-users",
        reactivateByIdList: "v1/suspended-user/reactivate",
        getReasonOfSuspensionByUserId: "v1/suspended-user/by-id/",
      },
      delete: {
        deleteByIdList: "v1/user/delete-organization-users",
      },
      resendInvitation: "v1/user/resend-invitation-organization-users",
      cancelInvitation: "v1/user/cancel-invitation-organization-users",
      saveLocalLanguage:"v1/additional-info/save-profile-localization"
    },
    organizationInfo: {
      updateOrgName: "v1/organization/change-organization-name",
      updateLogo: "v1/organization/change-organization-pic",
      updateLocation: "v1/organization/change-organization-location",
      updateVanityWebsite: "v1/organization/change-website-vanity-url",
    },
    country: {
      countryList: "v1/country/countryList",
    },
    status: {
      getAll: "v1/status/all",
    },
    admin: {
      userInfoById: "v1/user/",
      userDelete: "v1/user/organization-user-delete?email=",
      userPassReset: "v1/user/reset-password-by-admin",
      findUser: "v1/user/by-organization?organizationId=",
      filterUser: "v1/user/filter",
      userStatusChange: "v1/user/user-status-change",
      editUserByAdminOrOwner: "v1/user/edit-user",
      getOrganization: "v1/group/by-user?",
      getUserInfoWithToken:
        "v1/forgot-password/user-info-with-reset-pass-token/",
    },
    wpAlternativeAPIs: {
      getUserDetailsByUserId: "v1/user/get_users_details_by_id/",
      getParticipant: "v1/user/get_users_by_organization_id/",
      getUsersByEmail: "v1/user/get_users_by_email",
      getOrganizationDetails: "v1/organization/get_organization_details_by_id/",
      organizationBigMeetingStatusGetApi: "v1/organization/big-meeting-status/",
      organizationMultilingualMeetingStatusGetApi: "v1/organization/multi-lingual-status/",
      getGroupsByOrgId: "v1/user/get_groups_by_organization_id/",
      getParticipantByOrganizationGroup:
        "v1/user/get_group_and_user_by_organization_id?",
    },
    features: {
      getUserFeatures: "feature/names/by-user"
    }
  },
  mixpanel: {
    setUserProfile: "engage#profile-set",
  },
};
