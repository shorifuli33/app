import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { Redirect } from "react-router-dom";
import { environment } from "../environments/environment";

export default function useJwtToken() {
  // create an userObject that has the logged in user info, token, permission and return as authUser

  const getUserObject = () => {
    const jwtToken = Cookies.get("auth_token");
    const decodedToken: any = jwtToken ? jwt_decode(jwtToken) : null;

    const matrixAccessToken = decodedToken && decodedToken["access_token"] ? decodedToken["access_token"] : undefined;

    const authUser = decodedToken ? decodedToken["data"] : null;

    // if(authUser && authUser.vanity_url && authUser.vanity_url != 'beta') {
    //   Cookies.remove("auth_token");
    //   // Cookies.remove("auth_token",{ domain: '.synesisit.info' });
    // }

    // const jwtPermissionToken = Cookies.get("permission");
    // const authPermission: any = jwtPermissionToken
    //   ? jwt_decode(jwtPermissionToken)
    //   : null;

    const authPermission = decodedToken ? decodedToken["permission"] : null;

    if (!authPermission || !authUser) {
      // window.location.href =
      //   environment.wpAdminUrl +
      //   "sign-in/?redirect_uri=+" +
      //   environment.domainUrl;
      <Redirect to="/"> </Redirect>;
    } else {
      // const wpToken = authUser["token"];
      // let isTokenExpired = wpToken ? false : true;
      // if (!isTokenExpired) {
      //   const decodedWpToken: any = jwt_decode(wpToken);
      //   isTokenExpired =
      //     decodedWpToken["exp"] > Date.now() / 1000 ? false : true;
      // }
      // authUser.profile_pic =  "https://meet2.synesisit.info:7778/wp-content/uploads/images/335_1667886227.png"
      authUser.profile_page = "https://meet2.synesisit.info:7778/profile";
      authUser.logout_url = "https://meet2.synesisit.info:7778/logout";
      const userObject = {
        isAuthenticated: authUser ? true : false,
        isTokenExpired: false,
        user: authUser,
        permission: authPermission,
        token: jwtToken,
        wpToken: "wpToken",
        matrixAccessToken
      };

      return userObject;
    }
    // }
    // catch (error) {
    //   alert("Hello");
    // }
  };

  return getUserObject();
}
