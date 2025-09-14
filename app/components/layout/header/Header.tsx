import SettingsHexaIcon from "../../../../assets/icons/react-svg/SettingsHexaIcon";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  getOrganizationInfo,
  getUserDetailsByUserId,
} from "../../../common/api-services/adminPanelApi";
import useJwtToken from "../../../config/auth/useJwtToken";
import SvgBellIcon from "../../../../assets/icons/react-svg/BellIcon";
import SvgQuickActionIcon from "../../../../assets/icons/react-svg/QuickActionIcon";
import MenuCalendarIcon from "../../../../assets/icons/react-svg/MenuCalendarIcon";
import HamburgerIcon from "../../../../assets/icons/react-svg/HamburgerIcon";
import WhatsNewIcon from "../../../../assets/icons/react-svg/WhatsNew";
import useOutsideHeaderMenuClick from "../../../common/hooks/useOutsideHeaderMenuClick";
import styles from "./Header.module.css";
import Loader from "../../shared/loaders/Loader";
import useOnWindowResize from "../../../common/hooks/useOnWindowResize";
import Cookies from "js-cookie";
import { getUserProfilePicById } from "../../../common/api-services/userApi";
import { environment } from "../../../config/environments/environment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setMixpanelEventForLogOut } from "../../../common/mixpanel-events/logout";
import { userLogout } from "../../../redux/slices/logout";
import isElectron from "is-electron";
import {SubMenuDownArrow} from "../../../../assets/icons";
import axios from "axios";
import { setMatrixState } from "../../../redux/slices/showMatrixChatSlice";
import { useLanguage } from "../../../../context/LanguageContext";
import {matrixUserLogout} from "../../../common/api-services/headerApi";

export default function Header() {
  const {t} = useLanguage();
  const { language, setLanguage } = useLanguage();
  const history = useHistory();
  const userInfo = useJwtToken();
  const clickRef = useRef<any>(null);
  const containerRef = useRef<any>(null);
  const menuRef = useRef<any>(null);
  const burgerRef = useRef<any>(null);
  const burgerDiv = useRef<any>(null);
  const [pictureUrl, setPictureUrl] = useState<string>("");
  const [userMenuVisible, setUserMenuVisible] = useState<boolean>(false);
  const [mainMenuVisible, setMainMenuVisible] = useState<boolean>(false);
  const profilePage = userInfo?.user.profile_page;
  const logOutUrl = userInfo?.user.logout_url;
  // const userTitle = userInfo?.user.organization_name;
  const [userAvatarLetter, setUserAvatarLetter] = useState<string>("");
  const [organizationName, setOrganizationName] = useState<any>();
  const [userName, setUserName] = useState<any>();
  const [chatClass,setChatClass] = useState(false)
  const [organizationLogo, setOrganizationLogo] = useState<any>();
  const [firstOrgWord, setFirstOrgWord] = useState<any>();
  const [secondOrgWord, setSecondOrgWord] = useState<any>();
  const [showLoader, setShowLoader] = useState(false);
  const channel = new BroadcastChannel('convay');
  const profileChange = useSelector(
    (state: RootState) => state.resource.profilePicChange
  );
  const dispatch = useDispatch();

  const orgInfo = useSelector((state: RootState) => state.organization.orgInfo);

  const isMatrixChatDisplayed = useSelector(
    (state: RootState) => state.matrix.isChatVisible
  );


  const onClickShowMainMenu = (val: boolean) => {
    setMainMenuVisible(val);
  };

  const onClickShowProfileMenu = (val: boolean) => {
    setUserMenuVisible(val);
  };
  const iframeRef = useSelector((state: RootState) => state.matrix.iframeRef); 
  const { width: windowWidth } = useOnWindowResize();

  const clearStorageAndCookies = () => {
    const currentDomain = window.location.hostname;

    // Clear localStorage and sessionStorage
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      console.error('Failed to clear storage:', e);
    }

    // Clear all cookies
    const cookies = Cookies.get();
    Object.keys(cookies).forEach(cookieName => {
      // Try different domain combinations to ensure all cookies are removed
      try {
        // Remove cookie without domain specification
        Cookies.remove(cookieName);

        // Remove cookie with current domain
        Cookies.remove(cookieName, { domain: currentDomain });

        // Remove cookie with dot prefix for subdomain coverage
        Cookies.remove(cookieName, { domain: `.${currentDomain}` });

        // Remove cookie with path
        Cookies.remove(cookieName, { path: '/' });

        // Remove cookie with both domain and path
        Cookies.remove(cookieName, {
          domain: currentDomain,
          path: '/'
        });

        // Remove cookie with both domain and path for subdomain
        Cookies.remove(cookieName, {
          domain: `.${currentDomain}`,
          path: '/'
        });
      } catch (e) {
        console.error(`Failed to remove cookie ${cookieName}:`, e);
      }
    });

    // Additional cleanup for secure cookies
    document.cookie.split(';').forEach(cookie => {
      const cookieName = cookie.split('=')[0].trim();
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${currentDomain}; secure`;
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${currentDomain}; secure`;
    });
  };

  const logoutSubmitHandler = async () => {
    setShowLoader(true);
    setUserMenuVisible(true);
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    setMixpanelEventForLogOut(useJwtToken());

    const authObject = useJwtToken();

    if(authObject?.matrixAccessToken){
      matrixUserLogout(authObject?.matrixAccessToken);
    }

    // Send a logout message to the iframe
    if (iframeRef) {
      await delay(1000);
      iframeRef.contentWindow?.postMessage("logout", "*");
    }

    let logoutTimeout: any;

    // Fallback to logout if "logout_complete" is not received within 5 seconds
    const forceLogout = () => {
      console.log("Logout timeout: forcing logout.");
      clearStorageAndCookies();
      channel.postMessage('logout!!');
      setShowLoader(false);
      dispatch(userLogout(true));
      console.log("triggered in web");
      history.push("/sign-in");
      window.open(environment.domainUrl + "/sign-in", "_self");
    };

    // Set the timeout to force logout after 5 seconds
    logoutTimeout = setTimeout(forceLogout, 5000);

    if (isMatrixChatDisplayed) {
      // Listen for the confirmation message from the iframe
      window.addEventListener("message", (event) => {
        if (event.data === "logout_complete") {
          console.log("Logout completed in iframe");

          // Clear the timeout if logout was successful before the timeout
          clearTimeout(logoutTimeout);

          // Perform parent logout actions
          clearStorageAndCookies();
          channel.postMessage('logout!!');
          dispatch(userLogout(true));
          setShowLoader(false);
          console.log("triggered in web");
          history.push("/sign-in");
          window.open(environment.domainUrl + "/sign-in", "_self");
        }
      });
    } else {
      clearStorageAndCookies();
      channel.postMessage('logout!!');
      dispatch(userLogout(true));
      setShowLoader(false);
      console.log("triggered in web");
      history.push("/sign-in");
      window.open(environment.domainUrl + "/sign-in", "_self");
    }
  };


  const logoutFromDesktop = (): void => {
    setShowLoader(true);
    setUserMenuVisible(true);
    let logoutTimeout:any;

    const authObject = useJwtToken();

    if(!authObject?.matrixAccessToken){
      matrixUserLogout(authObject?.matrixAccessToken);
    }

    // Fallback to logout if "logout_complete" is not received within 5 seconds
    const forceLogout = () => {
      console.log("Logout timeout: forcing logout.");
      clearStorageAndCookies();
      channel.postMessage('logout!!');
      setShowLoader(false);
      dispatch(userLogout(true));
      console.log("triggered in Electron");
      history.push("/sign-in");
      window.open(environment.domainUrl + "/sign-in", "_self");
    };

    // Set the timeout to force logout after 5 seconds
    logoutTimeout = setTimeout(forceLogout, 5000);

    if (isMatrixChatDisplayed) {
      // Listen for the confirmation message from the iframe
      window.addEventListener("message", (event) => {
        if (event.data === "logout_complete") {
          console.log("Logout completed in iframe");

          // Clear the timeout if logout was successful before the timeout
          clearTimeout(logoutTimeout);

          const logoutDeepLink = document.createElement("a");
          logoutDeepLink.href = "convay-meet://logout";
          const authLinks = document.getElementById("cnv-auth-links") as HTMLElement;
          authLinks.appendChild(logoutDeepLink);

          setShowLoader(false);
          console.log("Triggered in Electron");
          logoutDeepLink.click();
          Cookies.remove("auth_token");
        }
      });
    } else {
      const logoutDeepLink = document.createElement("a");
      logoutDeepLink.href = "convay-meet://logout";
      const authLinks = document.getElementById("cnv-auth-links") as HTMLElement;
      authLinks.appendChild(logoutDeepLink);

      console.log("Triggered in Electron");
      logoutDeepLink.click();
      Cookies.remove("auth_token");
      channel.postMessage('logout!!');
      setShowLoader(false);
      setMixpanelEventForLogOut(useJwtToken());
      dispatch(userLogout(true));
      // Clear the timeout if logout actions are completed manually before timeout
      clearTimeout(logoutTimeout);
    }

  };


  useOutsideHeaderMenuClick(
    onClickShowMainMenu,
    (val: boolean) => {
      // Only allow closing menu if not in logout process
      if (!showLoader) {
        setUserMenuVisible(val);
      }
    },
    containerRef,
    clickRef,
    menuRef,
    burgerRef,
    windowWidth
  );

  useEffect(() => {
    windowWidth > 768 ? setMainMenuVisible(true) : setMainMenuVisible(true);
    setUserMenuVisible(false);
    if(!showLoader){
      setMainMenuVisible(true);
    }
  }, [windowWidth]);

  useEffect(() => {
    getUserProfilePicById(userInfo?.user.ID).then((res) => {
      if (res.data) {
        setPictureUrl(environment.fileServiceApi + "file/" + res.data);
      } else {
        setPictureUrl("");
      }
    });
  }, [profileChange]);

  useEffect(() => {
    getUserDetailsByUserId(userInfo?.user.ID).then((res: any) => {

      if (res.data.name) {
          setUserName(res.data.name);
        const nameArray = res.data.name.toUpperCase().split(" ");
        setUserAvatarLetter(
          nameArray.length > 1
            ? nameArray[0].substring(0, 1) + nameArray[1].substring(0, 1)
            : nameArray[0].substring(0, 1)
        );
      } else setUserAvatarLetter(res.data.email.toUpperCase().substring(0, 1));
      if(res.data?.language){
        setLanguage(res.data.language.toLowerCase());
      }else{
        setLanguage("en");
      }
    });
  }, []);
  useEffect(() => {
    /*
     * get all information of an organization
     */
    getOrganizationInfo(userInfo?.user.organization_id).then((res: any) => {
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

  return (
    <nav className={`cnv-top-nav ${styles.main}`}>


      {/*<div>*/}
      {/*  <div className="cnv-org-name">*/}
      {/*    {organizationLogo ? (*/}
      {/*      <img*/}
      {/*        src={environment.fileServiceApi + "file/" + organizationLogo}*/}
      {/*      />*/}
      {/*    ) : organizationName ? (*/}
      {/*      <span>*/}
      {/*        {" "}*/}
      {/*        {!secondOrgWord ? firstOrgWord : firstOrgWord + secondOrgWord}*/}
      {/*      </span>*/}
      {/*    ) : null}*/}

      {/*    {organizationName}*/}
      {/*  </div>*/}
      {/*</div>*/}


      <div className="cnv-top-nav-right">
        <ul
          ref={menuRef}
          style={{ display: mainMenuVisible ? "block" : "none" }}
        >
          {/* <li className="cnv-tooltips">
            <Link to="#" className="cnv-whats-new cnv-link">
              <WhatsNewIcon />
              {" " + `What's new`}
            </Link>
          </li> */}
          <li className="cnv-tooltips" style={{ display: "none" }}>
            <a className="cnv-link cnv-quick-action">
              <SvgQuickActionIcon /> {" " + "Quick Action"}
            </a>
          </li>
          {/* <li className="cnv-tooltips">
            <Link to="#" className="cnv-link">
              <MenuCalendarIcon />
            </Link>
          </li> */}
          {/* <li className="cnv-tooltips">
            <Link to="#" className="cnv-link">
              <SettingsHexaIcon />
            </Link>
          </li> */}
          <li className="cnv-tooltips" style={{ display: "none" }}>
            <Link to="#" className="cnv-link">
              <SvgBellIcon />
            </Link>
          </li>

          <li>
            <div id="user-dropdown-menu"
                className={`cnv-profile-icon-wrapper ${
                  userMenuVisible ? "cnv-rotate-180" : ""
                }`}

              ref={clickRef}
              // style={{ display: windowWidth > 768 ? "block" : "none" }}
            >
              <a
                className='cnv-profile-icon cnv-link'
              >
                {!pictureUrl ? (
                  <span>{userAvatarLetter}</span>
                ) : (
                <img src={pictureUrl} />
                )}
              </a>
              <span className='user-name'>{userName}  <SubMenuDownArrow/></span>
            </div>
            <ul
              style={{ display: userMenuVisible ? "block" : "none" }}
              ref={containerRef}
              id="cnv-auth-links"
            >
              <li>
                <a
                  //
                 
                  className="cnv-link"
                  onClick={() => {
                    history.push("/profile");
                    setChatClass(false);
                    dispatch(setMatrixState(false));
                  }}   
                >
                  {t("profile")}
                </a>    
              </li>
              {/* <li>
                <a className="cnv-link">
                  Billing info
                </a>
              </li>
              <li>
                <a className="cnv-link">
                  Subscription
                </a>
              </li> */}
              <li>
                {/* <a href={logOutUrl} className="cnv-link">
                  Logout
                </a> */}
                
                <a className="cnv-link" style={{display: 'flex', alignItems: 'center', gap: '6px', color: showLoader ? '#a9aebf' : '',cursor: showLoader ? 'not-allowed' : ''}} onClick={() => isElectron() ? logoutFromDesktop() : logoutSubmitHandler()}>

                  {t("logout")}
                  {showLoader && <Loader isCircular={true} circleStyle={{ borderColor: '#365D7E transparent transparent transparent' }} />}
                </a>
              </li>
            </ul>
          </li>
        </ul>
        {/* <HamburgerIcon className="cnv-mobile-menu" /> */}
        {/*<div ref={burgerRef}>*/}
        {/*  <HamburgerIcon style={{ cursor: "pointer" }} />*/}
        {/*</div>*/}
      </div>
    </nav>
  );
}
