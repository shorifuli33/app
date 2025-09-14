import React, { useEffect, useRef, useState } from "react";
import styles from "./RecordCopyShare.module.css";
import { ConvayBeta, NewConvayLogo, Record } from "../../../../assets/icons";
import RecordFileNotFound from "../../../../assets/icons/others/RecordFileNotFound.gif";
import { useHistory, useParams } from "react-router-dom";
import { getRecordedMeetingDetailsById } from "../../../common/api-services/scheduleApi";
import { getMeetingDetailsById } from "../../../common/api-services/scheduleApi";
import { environment } from "../../../config/environments/environment";
import useJwtToken from "../../../config/auth/useJwtToken";
import isElectron from "is-electron";
import JSZip from 'jszip';
import {availableRocordingsByMeetingId} from "../../../common/api-services/recordApi";
import extractDateFromISO from "../../../common/utility/formateDate";

function RecordCopyShare() {
  const { fileName, extension, size, length }: any = useParams();
  const [meetingInfo, setMeetingInfo] = useState<any>("");
  const [time, setTime] = useState<any>("");
  const videoRef = useRef<any>("");
  const [showMenuItems, setShowMenuItems] = useState(false);
  const history = useHistory();
  const authUser = useJwtToken();
  const[recordFileAuthenticated,setRecordFileAuthenticated] = useState<boolean>(false);
  const[authCheckCompleted, setAuthCheckCompleted] = useState<boolean>(false);
  
  useEffect(() => {
    document.body.classList.add("bg-white");

    return () => {
      document.body.classList.remove("bg-white");
    };
  }, []);

  useEffect(() => {
    const regex = /^[0-9a-fA-F-]+/;
    const uuid = fileName.match(regex)[0];

    try{
      availableRocordingsByMeetingId(uuid).then((resp: any) => {
        if(resp.data.data.length > 0){
          resp.data.data.map((item: any) => {
            if (item.deleted == false && item.fileName.replace(".mp4","") === fileName.replace(".mp4","")) {
              setRecordFileAuthenticated(true);
            }
          });
        }
        setAuthCheckCompleted(true);
        
      
        getRecordedMeetingDetailsById(uuid).then((resp: any) => {
          if (resp.data.status == "success") {
            setMeetingInfo(resp.data);
          }
        });
        
      });
    }
    catch{
      console.warn("error in getting meeting info");
      setAuthCheckCompleted(true);
    }
  }, []);

  async function downloadFile() {
    try {
      const meetingDate = extractDateFromISO(meetingInfo?.actualStartTime);
      const meetingTitle = meetingInfo?.meeting_title;
      const encodedTitle = encodeURIComponent(meetingTitle);
  
      const fileDownloadUrl = `${environment.fileServiceApi}file/downloadFileRecording/${fileName}.${extension}?meetingDate=${meetingDate}&meetingTitle=${encodedTitle}`;

      const download = document.createElement("a");
      download.href = fileDownloadUrl;
      document.body.appendChild(download);
      download.click();
      document.body.removeChild(download);
        
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }

  return (
    <>
      {meetingInfo && recordFileAuthenticated ? (
        <div className={`${styles.recordCopyContainer}`}>
          <div>
            <div className={`${styles.recordLogoCenter}`}>
              <Record />
            </div>
            <div className={`${styles.recordCopyLogoText}`}>
               Meeting Recording
            </div>

            <div className={`${styles.recordMeetingTitle}`}>
              {meetingInfo?.meeting_title}
            </div>
            <div className={`${styles.recordMeetingTime}`}>
              {`${new Date(meetingInfo?.meeting_time).toLocaleString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}`}
              ,{" "}
              {`${new Date(meetingInfo?.meeting_time).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })} - ${new Date(meetingInfo?.ending_time).toLocaleString(
                "en-US",
                {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                }
              )}`}
            </div>
            <div className={`${styles.recordTitle}`}>
              {fileName}.{extension}
            </div>
            <div className={`${styles.recordTimeInfo}`}>
              <div className={`${styles.recordLength}`}>
                Length: {length} minutes
              </div>

              <div className={`${styles.bar}`}>|</div>
              <div className={`${styles.recordSize}`}>{size} mb</div>
            </div>
            <div className="cnv-form-group" style={{marginTop:"15px"}}>
               <input
                  type="submit"
                  className={`signUpSubmitBtn`}
                  name="sign_up_submit"
                  value="Download"
                  onClick={() => downloadFile()}
                />
              </div>
          </div>
        </div>
      ) : (
        authCheckCompleted && !recordFileAuthenticated && (
          <div className={`${styles.recordCopyContainer}`}>
          <div>
            <div className={`${styles.recordLogoCenter}`}>
              <img src={RecordFileNotFound} alt="Record File Not Found" />
            </div>
            <div className={`${styles.recordCopyLogoTextForDeleteFile}`}>
              File Not Available
            </div>

            <div className={`${styles.recordDeleteFileFirstDiv}`} style = {{color: "#1C1C1C !important"}}>
              The file has been removed by the meeting owner and is no<br/> longer available.
            </div>
            <div className={`${styles.recordMeetingTitleForDeleteFile}`}>
              {meetingInfo?.meeting_title}
            </div>
            <div className={`${styles.recordMeetingTimeForDeleteFile}`}>
              {`${new Date(meetingInfo?.meeting_time).toLocaleString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}`}
              ,{" "}
              {`${new Date(meetingInfo?.meeting_time).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })} - ${new Date(meetingInfo?.ending_time).toLocaleString(
                "en-US",
                {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                }
              )}`}
            </div>
            
            <div className="cnv-form-group" style={{marginTop:"15px"}}>
              <input
                  type="submit"
                  className={`${styles.signUpSubmitBtnForDeleteFile}`}
                  name="sign_up_submit"
                  value="Okay"
                  onClick={() => history.push('/dashboard')}
                />
              </div>
          </div>
        </div>
        )
      )}
    </>
  );
}

export default RecordCopyShare;
