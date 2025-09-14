import { environment } from "../../config/environments/environment";
import { appUrls } from "../../config/api-config/appUrls";
import { get, post,put } from "../../config/api-config/callMethods";
import getQueryParams from "../../config/api-config/getQueryParams";

/**
 * To get all the available recording of a meeting
 */
export function availableRocordingsByMeetingId(meetingId: any) {
  const url =
    environment.api +
    appUrls.recording.getRecordingByMeetingId +
    meetingId;
  return get(url);
}
export function deleteRocordingsById(id: any) {
    const url =
      environment.api +
      appUrls.recording.deleteRecordingByMeetingId +
      id;
    return put(url);
  }

