import { appUrls } from "../../config/api-config/appUrls";
import { environment } from "../../config/environments/environment";
import { del, get, post, put } from "../../config/api-config/callMethods";
import getQueryParams from "../../config/api-config/getQueryParams";

/**
 * To get User profile pic
 * @param userId - user id
 * @returns
 */
export function getUserProfilePicById(userId: any) {
  const url =
    environment.organizationSettingsApi +
    appUrls.organization.user.getprofilePicById +
    getQueryParams({ userId });

  return get(url);
}
/**
 * To update user name or phone number
 * @param data - user id,user name and user phone number
 * @returns
 */
export function updateUserInfo(data: any) {
  const url =
    environment.organizationSettingsApi + appUrls.organization.user.updateUser;

  return put(url, data);
}
/**
 * To update user password
 * @param data - user id,user old pwd and new pwd
 * @returns
 */
export function updateUserPassword(data: any) {
  const url =
    environment.organizationSettingsApi +
    appUrls.organization.user.updateUserPassword;

  return put(url, data);
}
/**
 * To save user profile pic
 * @param data - user id,user profile pic url
 * @returns
 */
export function updateUserPic(data: any) {
  const url =
    environment.organizationSettingsApi +
    appUrls.organization.user.updateUserPic;

  return put(url, data);
}
/**
 * To save user profile pic
 * @param data - user id,user profile pic url
 * @returns
 */
export function deleteUserPic(userId: any) {
  const url =
    environment.organizationSettingsApi +
    appUrls.organization.user.deleteUserPic +
    getQueryParams({ userId });

  return put(url);
}

/**
 * To get Available user status
 * @returns
 */
export function getAllStatus() {
  const url =
    environment.organizationSettingsApi + appUrls.organization.status.getAll;
  return get(url);
}

/**
 * To get bulk user vinfo
 */
export function getBulkUserDetailsById(data: any) {
  const url =
    environment.organizationSettingsApi +
    appUrls.organization.user.getUserDetailsInBulk;
  return post(url, data);
}

/**
 * suspend bulk user
 */
export function suspendBulkUsers(data: any) {
  const url =
    environment.organizationSettingsApi +
    appUrls.organization.user.suspend.bulk;
  return post(url, data);
}

/**
 * reactivate bulk user
 */
export function reactivateBulkUsersByIdList(data: any) {
  const url =
    environment.organizationSettingsApi +
    appUrls.organization.user.suspend.reactivateByIdList;
  return post(url, data);
}

/**
 * To delete bulk users
 */
export function userDeleteByIdList(data: any) {
  const url =
    environment.organizationSettingsApi +
    appUrls.organization.user.delete.deleteByIdList;
  return post(url, data);
}

/**
 * To resend invitation to users
 */
export function resendInvitationByIdList(data: any) {
  const url =
    environment.organizationSettingsApi +
    appUrls.organization.user.resendInvitation;
  return post(url, data);
}

/**
 * To cancel invitation of users
 */
export function cancelInvitationByIdList(data: any) {
  const url =
    environment.organizationSettingsApi +
    appUrls.organization.user.cancelInvitation;
  return post(url, data);
}

/**
 * Get reason of suspension by User i
 * @param email  - takes email address
 * @returns
 */
export function getSuspendedReasonByUserId(userId: any) {
  const url =
    environment.organizationSettingsApi +
    appUrls.organization.user.suspend.getReasonOfSuspensionByUserId +
    userId;
  return get(url);
}

export function updateUserLanguage(data: any) {
  const url =
    environment.organizationSettingsApi +
    appUrls.organization.user.saveLocalLanguage;

  return put(url, data);
}
