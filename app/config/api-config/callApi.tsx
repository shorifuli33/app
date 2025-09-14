import axios, { Method } from "axios";
import Cookies from "js-cookie";
import useJwtToken from "../../config/auth/useJwtToken";
import { environment } from "../environments/environment";

export function callApi(url: string, method: Method, data?: any, config?: any) {
  // const jwtToken = Cookies.get("visitor_details");
  // let token = Cookies.get("visitor_details");
  const authUser = useJwtToken();
  const SuspenedOrDeletedCode = "2004";

  /*
    use wpToken for all WP apis
  */
  // if (url.includes("wp-json/api")) {
  //   token = authUser?.wpToken;
  // } else if (url.includes("organizationsettings/v1")) {
  //   // token = authUser?.token;
  //   token =
  //     "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjMTQxYmEyNS1iYjM2LTRiMWYtODhjNS05OTkyZjg2ZTkzZDciLCJvcmdhbml6YXRpb24iOiJkY2RkODMzYS1hYjYyLTQ1NTktYWQ3NS0xMGI4NWZmYzgwNDkiLCJuYW1lIjoiVmNvbiIsImV4cCI6MTY3NDI5MzM1MywiaWF0IjoxNjcxNzAxMzUzLCJlbWFpbCI6ImNvbnZheUBzeW5lc2lzaXQuaW5mbyJ9.g94U25f2Nybmu1c1RBjCIh_uUmh4v1JGorrBdpvKEP1sG2TTx10BsvdK04LfyLkvEXFWY71HqpccE3-pBHXvXw";
  // }
  // /*
  //   use wpToken for all WP apis
  // */
  // if (url.includes("wp-json/api")) {
  //   token = authUser?.wpToken;
  // } else if (url.includes("organizationsettings/v1")) {
  //   // token = authUser?.token;
  //   token =
  //     "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0NTI5NmJhNy1jZjk4LTRhOTQtYmRiMy02MDg3ZWUxMzc1NzYiLCJleHAiOjE2NzE2MjE4ODksImlhdCI6MTY3MTYwMzg4OX0.QsCp-cHBB3iVCUAKcfIc7eDJEufeGibnAqL25piZqwNckoZD3bg59d2WVpjfhnmem6ZWp5RQ5aE1wFFZV3fCmg";
  // }

  let token = Cookies.get("auth_token");

  if (authUser?.isTokenExpired)
    window.location.href = authUser?.user.logout_url;

  const headers: any = {
    Authorization: `Bearer ${token}`,
  };

  // if (method === "POST" || method === "PUT") {

  // } else if (method === "GET") {
  //   config = {
  //     onDownloadProgress: (progressEvent: any) => {
  //       const percentCompleted = Math.round(
  //         (progressEvent.loaded * 100) / progressEvent.total
  //       );
  //
  //     },
  //   };
  // }

  axios.interceptors.request.use(
    (req) => {
      // Do something before request is sent
      return req;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      // Do something with response error
      // if (
      //   error.response &&
      //   error.response?.data?.code == SuspenedOrDeletedCode
      // ) {
      //   Cookies.remove("auth_token");
      //   // Cookies.remove("auth_token", {domain: environment.mainDomain});
      //   window.location.href = "/sign-in";
      // }
      return Promise.reject(error);
    }
  );

  return axios({
    url,
    method,
    headers,
    data,
    ...config,
  });
}
