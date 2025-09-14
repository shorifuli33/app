import { callApi } from "./callApi";

export function get(url: string) {
  return callApi(url, "GET");
}

export function post(url: string, data?: any, config?: any) {
  return callApi(url, "POST", data, config);
}

export function put(url: string, data?: any, config?: any) {
  return callApi(url, "PUT", data, config);
}

export function del(url: string) {
  return callApi(url, "DELETE");
}
