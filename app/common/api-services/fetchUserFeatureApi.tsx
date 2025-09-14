import { environment } from "../../config/environments/environment";
import { appUrls } from "../../config/api-config/appUrls";
import { get, post } from "../../config/api-config/callMethods";
import getQueryParams from "../../config/api-config/getQueryParams";

/**
 * To add single/multiple new user
 */
export function fetchUserFeature(userId: string) {
  const url =
    environment.organizationSettingsApi + "v1/" + appUrls.organization.features.getUserFeatures + `?userId=${userId}`;
  return get(url);
}


