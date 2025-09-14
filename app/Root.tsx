import React, { Suspense, lazy } from "react";
import Layout from "./components/layout/Layout";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
//import MeetingManagement from "./components/main/meeting-management/MeetingManagement";
//import Scheduler from "./components/main/scheduler/Scheduler";
import ProtectedRoute from "./config/router/ProtectedRoute";
//import JoinWindow from "./components/main/dashboard/join-window/JoinWindow";
//import FeedbackPage from "./components/main/feedback-page/FeedbackPage";
//import HostAssign from "./components/main/host-assign/hostAssign";
//import Dashboard from "./components/main/dashboard/Dashboard";
//import Participants from "./components/main/meeting-management/meeting-description/participants/Participants";

//import Organization from "./components/main/organization/Organization";
//import SignUp from "./components/main/authentication/sign-up/SignUp";
//import TermsCondition from "./components/main/authentication/terms-condition/TermsCondition";
//import ResetPassword from "./components/main/authentication/reset-password/ResetPassword";
//import Otp from "./components/main/authentication/otp/Otp";
//import SignIn from "./components/main/authentication/sign-in/SignIn";
//import ProfileManagement from "./components/main/profile-management/ProfileManagement";
//import AddUser from "./components/main/user-management/add-user/AddUser";
//import AccountInfo from "./components/main/authentication/account-info/AccountInfo";
//import ActivateUser from "./components/main/authentication/sign-up/activate-user/ActivateUser";
//import ForgotPassword from "./components/main/authentication/forgot-password/ForgotPassword";
//import OrganizationDelete from "./components/main/authentication/organization-delete/OrganizationDelete";
//import UserManagement from "./components/main/user-management/UserManagement";

//import StartWindow from "./components/main/dashboard/start-window/StartWindow";
//import OrganizationInfo from "./components/main/set-organization/OrganizationInfo";
//import MultipleUserFileReadAndConvert from "./components/main/user-management/MultipleUserFileReadAndConvert";
//import AddMultipleUser from "./components/main/user-management/add-multiple-user/AddMultipleUser";
//import LandingPage from "./components/landing/LandingPage";
//import PrivacyPolicy from "./components/main/authentication/privacy-policy/PrivacyPolicy";
import useJwtToken from "./config/auth/useJwtToken";
//import TalkToSales from "./components/landing/talk-to-sales/TalkToSales";
//import TermsService from "./components/main/authentication/terms-service/TermsService";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Loader from "./components/shared/loaders/Loader";
import RecordCopyShare from "./components/main/copy-record/RecordCopyShare";
import isElectron from "is-electron";

const UserManagement = lazy(
  () => import("./components/main/user-management/UserManagement")
);
const Scheduler = lazy(() => import("./components/main/scheduler/Scheduler"));
const MeetingManagement = lazy(
  () => import("./components/main/meeting-management/MeetingManagement")
);
const Organization = lazy(
  () => import("./components/main/organization/Organization")
);
const AddUser = lazy(
  () => import("./components/main/user-management/add-user/AddUser")
);

const MatrixChat = lazy(
  () => import("./components/main/matrix-chat/MatrixChat")
)

const Cloud = lazy(
  () => import("./components/main/cloud/Cloud")
)

const Dashboard = lazy(() => import("./components/main/dashboard/Dashboard"));
const StartWindow = lazy(
  () => import("./components/main/dashboard/start-window/StartWindow")
);
const LandingPage = lazy(() => import("./components/landing/LandingPage"));
const TermsService = lazy(
  () => import("./components/main/authentication/terms-service/TermsService")
);
const TalkToSales = lazy(
  () => import("./components/landing/talk-to-sales/TalkToSales")
);
const Brochure = lazy(
  () => import("./components/landing/brochure/Brochure")
);
const Pricing = lazy(
  () => import("./components/landing/pricing/Pricing")
);
const Features = lazy(
  () => import("./components/landing/features/Features")
);
const SignUp = lazy(
  () => import("./components/main/authentication/sign-up/SignUp")
);
const SignIn = lazy(
  () => import("./components/main/authentication/sign-in/SignIn")
);
const TermsCondition = lazy(
  () =>
    import("./components/main/authentication/terms-condition/TermsCondition")
);
const ForgotPassword = lazy(
  () =>
    import("./components/main/authentication/forgot-password/ForgotPassword")
);
const Participants = lazy(
  () =>
    import(
      "./components/main/meeting-management/meeting-description/participants/Participants"
    )
);
const AccountInfo = lazy(
  () => import("./components/main/authentication/account-info/AccountInfo")
);
const ActivateUser = lazy(
  () =>
    import(
      "./components/main/authentication/sign-up/activate-user/ActivateUser"
    )
);
const JoinWindow = lazy(
  () => import("./components/main/dashboard/join-window/JoinWindow")
);
const FeedbackPage = lazy(
  () => import("./components/main/feedback-page-new/FeedbackPage")
);
const AddMultipleUser = lazy(
  () =>
    import(
      "./components/main/user-management/add-multiple-user/AddMultipleUser"
    )
);
const ResetPassword = lazy(
  () => import("./components/main/authentication/reset-password/ResetPassword")
);

const OrganizationInfo = lazy(
  () => import("./components/main/set-organization/OrganizationInfo")
);
const HostAssign = lazy(
  () => import("./components/main/host-assign/hostAssign")
);
const ProfileManagement = lazy(
  () => import("./components/main/profile-management/ProfileManagement")
);
const Otp = lazy(() => import("./components/main/authentication/otp/Otp"));
const PrivacyPolicy = lazy(
  () => import("./components/main/authentication/privacy-policy/PrivacyPolicy")
);
const MultipleUserFileReadAndConvert = lazy(
  () =>
    import("./components/main/user-management/MultipleUserFileReadAndConvert")
);
const OrganizationDelete = lazy(
  () =>
    import(
      "./components/main/authentication/organization-delete/OrganizationDelete"
    )
);
export default function Root({ children }: any) {
  const logoutInfo = useSelector((state: RootState) => state.logout.logout);
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/m/j" component={JoinWindow} />
          <Route path="/part" component={Participants} />
          <Route path="/feedback" component={FeedbackPage} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/terms-condition" component={TermsCondition} />
          <Route path="/otp" component={Otp} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/start-meeting" component={StartWindow} />
          <Route path="/brochure" component={Brochure} />

          <Route path="/set-account/:id" component={AccountInfo} />
          <Route path="/activate/:activationToken" component={ActivateUser} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/reset-password/:token" component={ResetPassword} />
          <Route path="/copy-record/:fileName/:extension/:size/:length" component={RecordCopyShare} />
          {/* <ProtectedRoute path="/start-meeting" component={StartWindow} /> */}
          <Route
            path="/upload-multiple-user"
            component={MultipleUserFileReadAndConvert}
          />
          <Route path="/terms-service" component={TermsService} />
          <Route path="/privacy-policy-statement" component={PrivacyPolicy} />
          <Route path="/talk-to-sales" component={TalkToSales} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/features" component={Features} />
          {/*landing page */}
          {!useJwtToken()?.isAuthenticated && !isElectron() && (
            <Route exact path="/" component={LandingPage} />
          )}
          {/* {!useJwtToken()?.isAuthenticated && (
          <Route path="/sign-in" component={SignIn} />
        )}
        {!useJwtToken()?.isAuthenticated && (
          <Route path="/sign-up" component={SignUp} />
        )} */}

          <ProtectedRoute path="/">
            <Layout>
              <Switch>
                <Route path="/organization-info" component={OrganizationInfo} />

                <Route
                  path="/organization-delete/:id"
                  component={OrganizationDelete}
                />

                <Route path="/add-user" component={AddMultipleUser} />

                <Route path="/home" component={Dashboard} />
                <Route path="/edit-user/:id" component={AddUser} />
                <Route
                  path="/meeting-management"
                  component={MeetingManagement}
                />
                {/*<Route path="/user-management" component={UserManagement} />*/}
                <ProtectedRoute
                    path="/user-management"
                    component={UserManagement}
                    requiredPermission="view_user"
                />
                <Route
                  path="/calendar/:type/:id/:dateTime"
                  component={Scheduler}
                />
                <Route path="/calendar/:type" component={Scheduler} />
                <Route path="/calendar" component={Scheduler} />
                <Route path="/organization" component={Organization} />
                {/* <Route path="/chat" component={MatrixChat}/> */}
                <Route path="/cloud" component={Cloud}/>

                {/* <Suspense fallback={<Loader />}> */}

                {/* </Suspense> */}
                {/* <Suspense fallback={<Loader />}> */}

                {/* </Suspense> */}

                {/* <Suspense fallback={<Loader />}> */}

                {/* </Suspense> */}

                <Route path="/assign-host" component={HostAssign} />
                <Route path="/profile" component={ProfileManagement} />

                <Redirect from="/" to="/home" />
                {/* </Layout> */}
              </Switch>
            </Layout>
          </ProtectedRoute>
        </Switch>
      </Suspense>
    </Router>
  );
}
