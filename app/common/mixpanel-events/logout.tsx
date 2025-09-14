import Mixpanel from "../../config/mixpanel-config";

export function setMixpanelEventForLogOut(authUser: any) {
  authUser && Mixpanel.identify(authUser?.user.user_email);

  Mixpanel.track("Logout", {
    Email: authUser?.user.user_email,
    Name: authUser?.user.display_name,
    Organization: authUser?.user.organization_name,
  });
}
