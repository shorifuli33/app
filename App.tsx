import React, { useEffect } from "react";
import { Provider } from "react-redux";
import UpcomingMeetings from "./app/components/main/dashboard/upcoming-ongoing-events/upcoming-meetings/UpcomingMeetings";
import PortalItem from "./app/components/shared/portals/PortalItem";
import { store } from "./app/redux/store";
import Root from "./app/Root";
import TagManager from "react-gtm-module";
import { environment } from "./app/config/environments/environment";
import * as Sentry from "@sentry/react";
import { WebSocketService } from "./app/services/WebSocketService";
import Cookies from 'js-cookie';
import useJwtToken from './app/config/auth/useJwtToken';
import { CallNotificationWidget } from "./app/components/shared/CallNotificationWidget";

function App() {
  const channel = new BroadcastChannel('convay');
  const authUser = useJwtToken();
  
  useEffect(() => {
    console.log('authUser', authUser);
    if (authUser?.user?.user_email) {
      const wsConfig = {
        url: process.env.REACT_APP_WS_URL ?? 'http://localhost:8000/ws',
        userId: authUser?.user?.user_email,
        debug: true
      };

      const wsService = WebSocketService.getInstance(wsConfig);
      wsService.connect();

      return () => {
        wsService.disconnect();
      };
    }
  }, [authUser]);

  useEffect(() => {
    channel.onmessage = (event) => {
      console.log('Received:', event.data);
      if(event.data.includes('logout')) {
        window.location.reload();
      }
    };

    TagManager.initialize({
      gtmId: environment.gtmId,
    });
  }, []);

  return (
    <Provider store={store}>
      <CallNotificationWidget />
      <Root />
    </Provider>
  );
}

// export default Sentry.withProfiler(App);
export default App;
