import { Link, Router, useHistory, useLocation } from "react-router-dom";
import useJwtToken from "../../../config/auth/useJwtToken";
import {environment} from "../../../config/environments/environment";
import ConvayLogo from "../../../../assets/icons/react-svg/ConvayLogo";
import {
  HomeIcon,
  MeetingIcon,
  AdminSetting,
  MenuCollapseIcon,
  HamburgerIcon,
  Cross,
  SubMenuDownArrow,
  FileIcon,
  CentralizedManagement
} from "../../../../assets/icons";
import MeetingManagementIcon from "../../../../assets/icons/react-svg/MeetingManagementIcon";
import UserManagementIcon from "../../../../assets/icons/react-svg/UserManagementIcon";
import OrgManagement from "../../../../assets/icons/react-svg/OrgManagementIcon";
import SvgRoleIcon from "../../../../assets/icons/react-svg/RoleIcon";
import React, { useEffect, useMemo, useState, useRef } from "react";
import { getOrganizationInfo } from "../../../common/api-services/adminPanelApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import ChatIcon from "../../../../assets/icons/react-svg/ChatIcon";
import axios from "axios";
import { redirectToMatrix } from "../Matrix";
import { setMatrixChatVisibility, setMatrixState } from "../../../redux/slices/showMatrixChatSlice";
import Cookies from "js-cookie";
import { checkFeatureForUser } from "../../../common/utility/checkFeatureForUser";
import { USER_FEATURES } from "../../../common/utility/constants";
import { useLanguage } from "../../../../context/LanguageContext";
import config from "../../../../config.dev.json";
import styles from "./Sidebar.module.css";
import { div } from "@tensorflow/tfjs-core";

export default function sidebar() {
  const { t } = useLanguage();
    const activeCalls = useSelector((state: RootState) => state.activeCalls.activeCalls);
    interface OrgAppearance {
    favicon: string;
    primaryColor: string;
    logoUrl: string;
    font: string;
  }

  const [isCollapse, setIsCollapse] = useState(false);
  const [hasSubMenu, setHasSubMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const dispatch = useDispatch();
  const showMatrix = useSelector((state: RootState) => state.matrix.showMatrix);
  const authUser = useJwtToken();
  const [organizationLogo, setOrganizationLogo] = useState<any>();
  const [organizationName, setOrganizationName] = useState<any>();
  const [firstOrgWord, setFirstOrgWord] = useState<any>();
  const [secondOrgWord, setSecondOrgWord] = useState<any>();
  const orgInfo = useSelector((state: RootState) => state.organization.orgInfo);
  const [chatClass, setChatClass] = useState(false);
  const loc = useLocation();
  const authToken: string | undefined = Cookies.get("auth_token");
  const history = useHistory();
  const [orgAppearance, setOrgAppearance] = useState<OrgAppearance>({
    favicon: "",
    primaryColor: "",
    logoUrl: "",
    font: ""
  });

  const [hasCmAccess, setHasCmAccess] = useState(false);
  const [hasDriveAccess, setHasDriveAccess] = useState(false);

  const hasRunEffect = useRef(false);

  useEffect(() => {
    checkChatAvailability()
  }, [])
  const checkChatAvailability = async () => {

    const isAvailable = await checkFeatureForUser(USER_FEATURES.CHAT);
    if (isAvailable) {
      dispatch(setMatrixChatVisibility(true))
    }
  }

  function setIsCollapseChange() {
    setIsCollapse(!isCollapse);
  }

  function setHasSubMenuChange() {
    setHasSubMenu(!hasSubMenu);
  }

  function setMobileMenuChange() {
    setMobileMenu(!mobileMenu);
  }

  const shouldDisplayMatrixChat = useSelector(
    (state: RootState) => state.matrix.isChatVisible
  );

  const authObject = useJwtToken()

  function setActiveClass(val: string) {
    if (!chatClass) {
      if (val === "home") {
        if (!showMatrix) {
          return "cnv-active";
        } else if (showMatrix) {
          return "";
        }
      } else {
        if (val === loc.pathname) {
          return "cnv-active";
        } else {
          return "";
        }
      }
    }
    return "";
  }

  useEffect(() => {
    const fetchOrgAppearance = async () => {
      if (authObject?.user?.organization_id && !hasRunEffect.current) {
        try {
          hasRunEffect.current = true;
          const response = await axios.get(`${config["cm-backend-url"]}/api/organization/${authObject?.user.organization_id}/appearance`);
          setOrgAppearance(response.data);
        } catch (error) {
          console.error("Error fetching organization appearance:", error);
        }
      }
    };
    
    fetchOrgAppearance();
  }, [authObject]);


  useMemo(() => showMatrix && setChatClass(true), [showMatrix]);

  useEffect(() => {
    /*
     * get all information of an organization
     */
    getOrganizationInfo(authUser?.user.organization_id).then((res: any) => {
      setOrganizationName(res.data.org_name);
      let str = res.data.org_name;
      str = str.replace(/(^\s*)|(\s*$)/gi, "");
      str = str.replace(/[ ]{2,}/gi, " ");
      str = str.replace(/\n /, "\n");
      let length = str.split(" ").length;
      let firstWordOrg = res.data.org_name.split(" ").slice(0, 1).join("");
      if (firstWordOrg) {
        setFirstOrgWord(firstWordOrg[0].toUpperCase());
      }
      if (length > 1) {
        let secondWordOrg = res.data.org_name.split(" ").slice(1, 2).join("");
        setSecondOrgWord(secondWordOrg[0].toUpperCase());
      }
      setOrganizationLogo(res.data.org_logo);
    });
  }, [orgInfo]);

  const loadGoogleFont = (fontFamily: string) => {
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(' ', '+')}:wght@300;400;500;600;700&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  };

  useEffect(() => {
    if (orgAppearance.font) {
      loadGoogleFont(orgAppearance.font);
    }
  }, [orgAppearance.font]);

  const updateFavicon = (faviconUrl: string | null) => {
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
    }
    const faviconLink = link as HTMLLinkElement;
    
    faviconLink.type = 'image/x-icon';
    faviconLink.rel = 'shortcut icon';
    faviconLink.href = faviconUrl 
      ? `${environment.fileServiceApi}/file/${faviconUrl}`
      : '/favicon.ico';
      
    document.head.appendChild(faviconLink);
  };

  useEffect(() => {
    updateFavicon(orgAppearance.favicon || null);
  }, [orgAppearance.favicon]);

  useEffect(() => {
    // Update CSS custom property when orgAppearance changes
    document.documentElement.style.setProperty(
      '--active-menu-background', 
      orgAppearance.primaryColor || '#365D7E'
    );
  }, [orgAppearance.primaryColor]);

  useEffect(() => {
    const checkCmAccess = async () => {
      if (authObject?.user?.user_email) {
        try {
          const response = await axios.get(
            `${environment.organizationSettingsApi}v1/user/has-cm-access?email=${authObject.user.user_email}`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`
              }
            }
          );

          if (response.data && response.data.hasAccess) {
            setHasCmAccess(response.data.hasAccess);
          }
        } catch (error) {
          console.error("Error checking CM access:", error);
        }
      }
    };

    checkCmAccess();
  }, [authObject]);

  useEffect(() => {
    const checkDriveAccess = async () => {
      if (authObject?.user?.user_email) {
        try {
          const response = await axios.get(
            `${environment.organizationSettingsApi}v1/user/has-drive-access?email=${authObject.user.user_email}`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`
              }
            }
          );

          if (response.data && response.data.hasAccess) {
            setHasDriveAccess(response.data.hasAccess);
          }
        } catch (error) {
          console.error("Error checking Drive access:", error);
        }
      }
    };

    checkDriveAccess();
  }, [authObject]);

  const sidebarStyle = {
    fontFamily: orgAppearance.font || 'Lato, sans-serif' // Lato as fallback
  };

    return (
        <>
            <span
                style={
                    mobileMenu
                        ? {display: "none"}
                        : {display: "block"}
                }

                onClick={setMobileMenuChange} className="hamburgerIcon"><HamburgerIcon/></span>
            <div
                className={isCollapse ? "cnv-left-sidebar cnv-left-sidebar-collapse" : "cnv-left-sidebar"}
                style={sidebarStyle}
            >

                <span onClick={setMobileMenuChange} className="clossMobileMenu"><Cross/></span>

                <span
                    onClick={setIsCollapseChange}
                    className="menu-collapse-arrow"><MenuCollapseIcon/></span>

                <div className={mobileMenu ? "overflow_hidden cnv-hasMobileMenu" : "overflow_hidden"}>

                    <div className="cnv-org-name">

                        <Link to="/home">

                            {(orgAppearance.logoUrl || organizationLogo) ? (
                                <img
                                    src={organizationLogo ?
                                      `${environment.fileServiceApi}file/${organizationLogo}` :
                                      `${environment.fileServiceApi}${orgAppearance.logoUrl.startsWith('file/') ? '' : 'file/'}${orgAppearance.logoUrl}`
                                    }
                                    style={{ maxWidth: '100%', height: 'auto' }}
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                    }}
                                />
                            ) : organizationName ? (
                                <>
                                <span className="cnv-org-name-icon">
                                    {!secondOrgWord ? firstOrgWord : firstOrgWord + secondOrgWord}
                                </span>
                                    <span className="company-name">{organizationName}</span>
                                </>
                            ) : null}
                        </Link>
                    </div>

          <div className="cnv-left-sidebar-container">
            <ul>
              <li
                onClick={() => setChatClass(false)}
                className={setActiveClass("/home")}
                style={
                  authUser?.permission.view_dashboard
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <Link to="/home" className="cnv-link home-link" onClick={() => dispatch(setMatrixState(false))}>
                  <HomeIcon />
                  <span>{t("home")}</span>
                </Link>
              </li>
              <li
                onClick={() => setChatClass(false)}
                className={setActiveClass("/meeting-management")}
                style={
                  authUser?.permission.view_meeting
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <Link
                  to="/meeting-management"
                  className="cnv-link"
                  data-testid={"meeting-management"}
                  onClick={() => dispatch(setMatrixState(false))}
                >
                  <MeetingIcon />
                  <span>{t("meeting_management")}</span>
                </Link>
              </li>
              {/* {shouldDisplayMatrixChat && authObject?.matrixAccessToken && (
                <li onClick={() => setChatClass(!chatClass)} className={chatClass ? "cnv-active" : ""}>
                  <Link to={history.location.pathname} className="cnv-link" onClick={() => dispatch(setMatrixState(!chatClass))}>
                    <ChatIcon />
                    <span>{t("chat")}</span>
                  </Link>
                </li>
              )} */}
              {shouldDisplayMatrixChat && authObject?.matrixAccessToken && (
                <li className={chatClass ? "cnv-active" : ""}>
                  <a 
                    href={`${config["element-frontend-url"]}#/jwt=${authToken}/userId=${authUser?.user?.ID}`}
                    target="_blank" 
                    className="cnv-link"
                    rel="noopener noreferrer"
                  >
                    <div className={styles.cnvLinkContent}>
                      <ChatIcon />
                      <span>{t("chat")}</span>

                      {activeCalls.length > 0 && (
                        <div className={styles.incomingCallContainer}>
                          <img src="images/phone.svg" alt="" />
                          <span className={styles.incomingCall}>
                          Incoming call {/* ({activeCalls.length}) */}
                        </span>
                        </div>
                      )}
                    </div>
                  </a>
                </li>
              )}
              {hasDriveAccess && <li className={setActiveClass("/cloud")}>
                <a href={`https://pydio.convay.com?username=${authUser?.user.user_email}`+`&token=${authToken}`} target="_blank" className="cnv-link">
                  <FileIcon />
                  <span>{t("convay_drive")}</span>
                </a>
              </li>}
              {hasCmAccess && (
                <li>
                  <a href={`${config["cm-frontend-url"]}/login?jwt=${authToken}`} target="_blank" className="cnv-link">
                    <CentralizedManagement />
                    <span>{t("manage_organization")}</span>{" "}
                  </a>
                </li>
              )}
              {!authObject?.user?.is_cm_user && <li
                onClick={() => setChatClass(false)}
                className={
                  hasSubMenu ? "cnv-submenu cnv-hasSubmenu" : "cnv-submenu"
                }
                style={
                  authUser?.permission.view_user
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <span className="submenu-label" onClick={setHasSubMenuChange}>
                  <AdminSetting />
                  <span>{t("admin_settings")}</span>
                  <span className="submenu-arrow">
                    <SubMenuDownArrow />
                  </span>
                </span>
                <ul>
                  <li
                    className={setActiveClass("/user-management")}
                    style={
                      authUser?.permission.view_user
                        ? { display: "block" }
                        : { display: "none" }
                    }
                    onClick={() => setChatClass(false)}
                  >
                    <Link to={`/user-management`} className="cnv-link" onClick={() => dispatch(setMatrixState(false))}>
                      <span>{t("manage_users")}</span>
                    </Link>
                  </li>

                  <li
                    className={setActiveClass("/organization")}
                    style={
                      authUser?.permission.view_organization
                          ? {display: "block"}
                          : {display: "none"}
                    }
                    onClick={() => setChatClass(false)}
                  >
                    <Link to={`/organization`} className="cnv-link" onClick={() => dispatch(setMatrixState(false))}>
                      <span>{t("manage_organization")}</span>
                    </Link>
                  </li>

                  {/* <li
                    className={setActiveClass("/organization")}
                    style={
                      authUser?.permission.view_organization
                        ? { display: "block" }
                        : { display: "none" }
                    }
                    onClick={() => setChatClass(false)}
                  >
                    <Link to={`/organization`} className="cnv-link" onClick={() => dispatch(setMatrixState(false))}>
                      <span>{t("manage_organization")}</span>
                    </Link>
                  </li> */}
                </ul>
              </li>}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
