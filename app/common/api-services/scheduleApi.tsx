import { environment } from "../../config/environments/environment";
import { appUrls } from "../../config/api-config/appUrls";
import { del, get, post, put } from "../../config/api-config/callMethods";
import getQueryParams from "../../config/api-config/getQueryParams";

/**
 * function for creating events
 */
export function createSchedule(calender: any) {
  const url = environment.api + appUrls.meetingSchedule.create;
  return post(url, calender);
}

/**
 * function for updating events
 */
export function updateSchedule(calender: any, reqParam: String) {
  const url =
    environment.api +
    appUrls.meetingSchedule.edit +
    (reqParam == "" ? "" : "?editType=" + reqParam);

  return put(url, calender);
}

/**
 *
 * @param date
 * @param resourceId
 * @param timeZone
 * @returns a fetch request which resolves to a response of schedule events
 */
export function getEventsByDate(
  date: number,
  resourceId: string,
  timeZone: string
) {
  const url =
    environment.api +
    appUrls.meetingSchedule.getSceduleEventsByDate +
    getQueryParams({ date, resourceId, timeZone });

  return get(url);
}

/**
 *
 * @param date
 * @param resourceId
 * @param timeZone
 * @returns
 */
export function getEventsByMonth(
  date: number,
  resourceId: string,
  timeZone: string
) {
  const url =
    environment.api +
    appUrls.meetingSchedule.getSceduleEventsByMonth +
    getQueryParams({ date, resourceId, timeZone });

  return get(url);
}

/**
 * fetch if scheduled events exists for a user by date range
 */

export function getIfEventExistsByDateRange(
  startDate: any,
  endDate: any,
  resourceId: any,
  timeZone: any
) {
  const url =
    environment.api +
    appUrls.meetingSchedule.getIfEventExistsByDateRange +
    getQueryParams({ startDate, endDate, resourceId, timeZone });
  return get(url);
}

export function getOverlappingEvents(
  startDate: number,
  endDate: number,
  resourceId: string,
  calendarId: string
) {
  const url =
    environment.api +
    appUrls.meetingSchedule.overlappingMeetings +
    getQueryParams({ startDate, endDate, resourceId }) +
    (calendarId ? `&calendarId=${calendarId}` : "");
  return get(url);
}

/**
 * schedule delete api
 */
export function deleteScheduleById(calendarId: string, deleteType: string) {
  const url =
    environment.api +
    appUrls.meetingSchedule.deleteById +
    calendarId +
    (deleteType ? `&deleteType=${deleteType}` : "");
  return del(url);
}

export function getAvailableTimeSlotByDate(
  startDate: number,
  resourceId: string,
  timeZone: string
) {
  const url =
    environment.api +
    appUrls.meetingSchedule.getAvailableTimeSlotByDate +
    getQueryParams({ startDate, resourceId, timeZone });
  return get(url);
}

/**
 * fetch scheduled events for a resource by date range
 */

export function getEventsByDateRange(
  startDate: any,
  endDate: any,
  resourceId: any,
  timeZone: any
) {
  const url =
    environment.api +
    appUrls.meetingSchedule.getSceduleEventsByDateRange +
    getQueryParams({ startDate, endDate, resourceId, timeZone });
  return get(url);
}

export function getMeetingDetailsById(id: any) {
  const url: string =
    environment.api +
    appUrls.meetingSchedule.getCalenderById +
    getQueryParams({ id });
  return get(url);
}
export function getRecordedMeetingDetailsById(id: any) {
  const url: string =
    environment.api +
    appUrls.meetingSchedule.getRecordedMeetingDetailsById + id
  
  return get(url);
}
export function getMeetingOngoingOrNot(id: any) {
  const url: string =
    environment.api + appUrls.meetingSchedule.meetingOngoingOrNot + id;
  return get(url);
}

export function getReminderByMeetingId(id: string) {
  const url: string =
    environment.api + appUrls.meetingSchedule.getRemindersByMeetingId + id;
  return get(url);
}

export function getRedirectUrlByCalendarId(id: string) {
  const url: string =
    environment.api + appUrls.meetingSchedule.getRedirectUrlByCalendarId + id;
  return get(url);
}

export function getMeetingInfoById(id: string) {
  const url: string =
    environment.api + appUrls.meetingSchedule.getMeetingInfoById + id;
  return get(url);
}