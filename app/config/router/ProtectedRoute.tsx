import { Route, Redirect } from "react-router-dom";
import useJwtToken from "../auth/useJwtToken";
import { environment } from "../environments/environment";
import { useEffect } from "react";
import { getHostData } from "../../common/api-services/resourceApi";
import { useDispatch } from "react-redux";
import {
  setResourceId,
  setUserId,
  setHostResource,
} from "../../redux/slices/resourceSlice";
import Cookies from "js-cookie";

export default function ProtectedRoute({
  component: Component,
  children, requiredPermission,
  ...rest
}: any) {
  const authUser = useJwtToken();
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser?.isAuthenticated) {
      getHostData(authUser.user.ID).then((res: any) => {
        if (res.data.resourceAllocation) {
          dispatch(setResourceId(res.data.resourceAllocation.id));
          dispatch(setUserId(res.data.resourceAllocation.userId));
          dispatch(setHostResource(res.data.resourceAllocation));
        }
      });
    }

    // const host = window.location.host;
    // const arr = host.split(".").slice(0, host.includes("localhost") ? -1 : -2)
    // const currentSubDomain = arr.length > 0 ? arr[0] : "";

    // const mainSubdomain = environment.mainSubdomain;
      /*
          Exception in join url. only convay will be used m/j
      */


      /*
      if user has subdomain, direct to correct subdomain
      */
      // if (authUser?.user.vanity_url) {
      //   /*
      //   if user vanity url not beta, force login
      //   */
      //   if(authUser?.user.vanity_url != 'beta') {
      //     Cookies.remove("auth_token");
      //     Cookies.remove("auth_token", {domain: environment.mainDomain});
      //   }
      //   /*
      //   if user not in correct subdomain
      //   */
      //   if (authUser.user.vanity_url != currentSubDomain) {
      //     window.location.href = "https://" + authUser.user.vanity_url + environment.mainDomain + window.location.pathname
      //   }
      // }

      /*
      if user does not have subdomain
      */
      // else {
      //   console.log("current subdomain: "+ currentSubDomain)
      //   console.log("mainSubdomain :" + mainSubdomain)
      //   if(currentSubDomain != mainSubdomain) {
      //     console.log(environment.domainUrl + window.location.pathname)
      //     window.location.href = environment.domainUrl + window.location.pathname
      //   }
      // }
    // setInterval(() => {
    //   if (authUser?.isAuthenticated) {
    //     getHostData(authUser.user.ID).then((res: any) => {
    //       if (res.data.resourceAllocation) {
    //         dispatch(setResourceId(res.data.resourceAllocation.id));
    //         dispatch(setUserId(res.data.resourceAllocation.userId));
    //         dispatch(setHostResource(res.data.resourceAllocation));
    //       }
    //     });
    //   }
    // }, 30000);
  }, []);

  const hasPermission = (permission: string) => {
    return authUser?.permission[permission];
  };

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (authUser?.isAuthenticated && !authUser?.isTokenExpired) {
          if (requiredPermission && !hasPermission(requiredPermission)) {
            return <Redirect to="/home" />;
          }
          return Component ? <Component /> : children;
        } else {
          return (
            // <Redirect
            //   to={{
            //     pathname: (
            //       window.location.href =
            //       // environment.wpAdminUrl + "sign-in/?redirect_uri=" + environment.domainUrl
            //       environment.wpAdminUrl + "/logout"),
            //     state: { from: location },
            //   }}
            // ></Redirect>
            <Redirect to="/"> </Redirect>
          );
        }
      }}
    ></Route>
  );
}
