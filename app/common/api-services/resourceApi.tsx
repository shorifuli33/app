import { environment } from "../../config/environments/environment";
import { appUrls } from "../../config/api-config/appUrls";
import { get, post } from "../../config/api-config/callMethods";
import getQueryParams from "../../config/api-config/getQueryParams";
export function checkResourceAvailability(resourceId: any) {
  const url =
    environment.api +
    appUrls.resourceAllocation.resourceAvailability +
    getQueryParams({ resourceId });
  return get(url);
}

/**
 * resource Info
 */

export function resourceInfo() {
  const url = environment.api + appUrls.resourceAllocation.resourceInfo;
  return get(url);
}

export function saveProducts(product: any) {
  const url = environment.api + appUrls.resourceAllocation.saveProducts;
  return post(url, product);
}

export function getTypeWiseRoomCountByOrgId(orgId: number) {
  const url =
    environment.api +
    appUrls.resourceAllocation.typeWiseRoomCount +
    getQueryParams({ orgId });
  return get(url);
}

export function getHostData(userId: any) {
  const url =
    environment.api +
    appUrls.resourceAllocation.getHostData +
    getQueryParams({ userId });
  return get(url);
}

export function getEnterpriseApiData(userId: any) {
  const url =
    environment.api +
    appUrls.resourceAllocation.getEnterpriseApiData +
    getQueryParams({ userId });
  return get(url);
}

export function changePmuString(requestBody: any) {
  const url = environment.api + appUrls.resourceAllocation.changePmuString;
  return post(url, requestBody);
}
