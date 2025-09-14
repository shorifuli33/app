import { appUrls } from "../../config/api-config/appUrls";
import { environment } from "../../config/environments/environment";
import { get, post, del, put } from "../../config/api-config/callMethods";
import getQueryParams from "../../config/api-config/getQueryParams";

export function getUserDetailsByUserId(id: string) {
  const url =
    environment.organizationSettingsApi +
    appUrls.organization.wpAlternativeAPIs.getUserDetailsByUserId +
    id;
  return get(url);
}

export function getParticipantInfo(organizationId: any) {
  const url =
    environment.organizationSettingsApi +
    appUrls.organization.wpAlternativeAPIs.getParticipant +
    organizationId;
  return get(url);
}
/**
 * get participant by group
 */
// export function getParticipantByGroupInfo(groupId: number) {
//   const url =
//     environment.wpAdminUrl + appUrls.adminPanel.getParticipantByGroup + groupId;
//   return get(url);
// }

export function get_groups_by_organization_id(organizationId: number) {
  const url =
    environment.organizationSettingsApi +
    appUrls.organization.wpAlternativeAPIs.getGroupsByOrgId +
    organizationId;
  return get(url);
}

/**
 * get participation by organization group
 */
export function getParticipantByOrganizationGroupInfo(id: number, search: any) {
  const url =
    environment.organizationSettingsApi +
    appUrls.organization.wpAlternativeAPIs.getParticipantByOrganizationGroup +
    getQueryParams({ id, search });
  return get(url);
}

export function getXlsData(body: any) {
  const url =
    environment.organizationSettingsApi +
    appUrls.organization.wpAlternativeAPIs.getUsersByEmail;
  return post(url, body);
}
/**
 * get organization information
 */
export function getOrganizationInfo(id: any) {
  const url =
    environment.organizationSettingsApi +
    appUrls.organization.wpAlternativeAPIs.getOrganizationDetails +
    id;
  return get(url);
}

export function getOrganizationBigMeetingStatus(id: string) {
  const url =
    environment.organizationSettingsApi +
    appUrls.organization.wpAlternativeAPIs.organizationBigMeetingStatusGetApi +
    id;
  return get(url);
}

// /**
//  * To delete user from user management by admin
//  * @param email  - takes email address
//  * @returns
//  */
// export function userDelete(email: String) {
//   const url =
//     environment.organizationSettingsApi +
//     appUrls.organization.admin.userDelete +
//     email;
//   return del(url);
// }

/**
 * To reset user password from user management by admin
 * @param {Object} data  - takes email address and password
 * @returns
 */
export function userPasswordReset(data: any) {
  const url =
    environment.organizationSettingsApi +
    appUrls.organization.admin.userPassReset;
  return put(url, data);
}

/**
 * To get user by organization
 * @param {String} organizationId  - takes organization id
 * @returns
 */
export function userInOrganization(organizationId: String) {
  const url =
    environment.organizationSettingsApi +
    appUrls.organization.admin.findUser +
    organizationId;
  return get(url);
}

/**
 * To get user by filter
 * @param {any} filterSettings
 * @returns
 */
export function filterUser(filterSettings: any) {
  const url =
    environment.organizationSettingsApi + appUrls.organization.admin.filterUser;
  return post(url, filterSettings);
}
/**
 * To reset user status from user management by admin
 * @param {Object} data  - takes user id and status
 * @returns
 */
export function changeUserStatus(data: any) {
  const url =
    environment.organizationSettingsApi +
    appUrls.organization.admin.userStatusChange;
  return put(url, data);
}

/**
 * To get a user
 * @param {Object} id  - takes user id
 * @returns
 */
export function getUserInfoById(id: any) {
  const url =
    environment.organizationSettingsApi +
    appUrls.organization.admin.userInfoById +
    id;
  return get(url);
}

/**
 * To edit an user
 * @param {Object} data  - takes user info
 * @returns
 */
export function editUserByAdminOrOwner(data: any) {
  const url =
    environment.organizationSettingsApi +
    appUrls.organization.admin.editUserByAdminOrOwner;
  return put(url, data);
}

/**
 * To organization of an existing user
 * @param {any} userId  - takes user id
 * @returns
 */
export function getBusinessUnitByUser(userId: any) {
  const url =
    environment.organizationSettingsApi +
    appUrls.organization.businessUnitUserRelation.getBusinessUnitsByUser +
    getQueryParams({ userId });
  return get(url);
}
/**
 * To get an user email,first name and last name
 * @param {string} token  - takes reset pass token
 * @returns
 */
export function getUserInfoWithResetPassToken(token: string) {
  const url =
    environment.organizationSettingsApi +
    appUrls.organization.admin.getUserInfoWithToken +
    token;
  return get(url);
}

export function getOrganizationMultilingualMeetingStatus(id: string) {
  const url = environment.organizationSettingsApi +
  appUrls.organization.wpAlternativeAPIs.organizationMultilingualMeetingStatusGetApi +
  id;

return get(url);
}
