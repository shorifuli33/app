import mixpanel from "mixpanel-browser";
import { environment } from "./environments/environment";
import Cookies from "js-cookie";

const consentToken = Cookies.get("cookieyes-consent")?.split("analytics:")[1];

/**Initialization of mixpanel */
mixpanel.init(environment.mixpanelToken, {
  debug: true,
  disable_persistence: consentToken == "yes" ? false : true,
  cross_site_cookie: false,
});

/**If user has the consent then track event otherwise do not track the event */
if (consentToken == "yes") {
  mixpanel.opt_in_tracking();
  mixpanel.clear_opt_in_out_tracking();
} else {
  mixpanel.opt_out_tracking();
}

// Listen for CookieYes consent changes
if (typeof window !== 'undefined') {
  window.addEventListener('cookieyes_consent_update', (event: any) => {
    const newConsent = event.detail?.analytics;
    if (newConsent === 'yes') {
      mixpanel.opt_in_tracking();
      mixpanel.clear_opt_in_out_tracking();
    } else {
      mixpanel.opt_out_tracking();
    }
  });
}

const Mixpanel = mixpanel;

export default Mixpanel;
