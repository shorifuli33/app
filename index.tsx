import React from "react";
import ReactDOM from "react-dom";
// @ts-ignore
import * as Sentry from "@sentry/react";

import App from "./App";
import "./styles/root.css";
import swDev from "./swDev";
import { LanguageProvider } from "./context/LanguageContext";

// Sentry.init({
//   dsn: "https://87fa3ed4013c48b3a0fd0a39a1777299@o4506337336098816.ingest.sentry.io/4506342488408064",
//   integrations: [
//     new Sentry.BrowserTracing({
//       // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
//       tracePropagationTargets: ["localhost", /^https:\/\/convay\.com/],
//     }),
//     new Sentry.Replay(),
//   ],
//   // Performance Monitoring
//   tracesSampleRate: 1.0, // Capture 100% of the transactions
//   // Session Replay
//   replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
//   replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
// });


ReactDOM.render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
