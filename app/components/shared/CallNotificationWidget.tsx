import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { ignoreCall } from '../../redux/slices/webSocketSlice';
import styles from './CallNotificationWidget.module.css';
import { CallNotification, CallStatus } from '../../types/meeting.types';
import { sanitizeUserId } from '../../common/utility/sanitizeUserId';

export const CallNotificationWidget: React.FC = () => {
  const dispatch = useDispatch();
  const activeCalls = useSelector((state: RootState) => state.activeCalls.activeCalls);

  // Use for Local Testing 
  //  const activeCalls:CallNotification[] = 
  //  [{
  //                     roomId: "room-003",
  //                     meetingStartTime: 1716721200000,
  //                     status: CallStatus.ONGOING,
  //                     matrixServerName:"",
  //                     meetingEndTime: 1
  //                 }]
  
  if (activeCalls.length === 0) return null;

  const handleJoinCall = async (call: CallNotification) => {
    console.log(process.env.REACT_APP_NOTIFICATION_URL);
    const response = await fetch(`${process.env.REACT_APP_NOTIFICATION_URL}/api/chat-meeting/room/${sanitizeUserId(call.roomId)}`);
    const data = await response.json();
    console.log(data);
    window.open(data.meetingUrl, '_blank');
    dispatch(ignoreCall(call));
  };

  const handleIgnoreCall = (call: CallNotification) => {
    dispatch(ignoreCall(call));
  };

  return (
    <div className={styles.floatingWidget}>
      {activeCalls.map((call) => (
        <div key={call.roomId} className={styles.callNotification}>
          {/* <img src="images/avatar.svg" alt="" className={styles.callIcon}/> */}
          <div className={styles.callInfo}>
            <div>
              {/* <h4>Daily Stand-UP</h4> */}
              <div className={styles.callType}>
                <img src="images/video_camera.svg" alt=""/>
                {/* <p>Group call</p> */}
              </div>
            </div>
            <div>
              {/* <span>From Sasote Sarker Rumpa</span> */}
            </div>
          </div>
          <div className={styles.callActions}>
            <button 
              className={styles.joinButton} 
              onClick={() => handleJoinCall(call)}
            >
              Join Call
            </button>
            <button 
              className={styles.ignoreButton}
              onClick={() => handleIgnoreCall(call)}
            >
              Ignore Call
            </button>
          </div>
          <div className={styles.callCloseIcon}>
            <img onClick={() => handleIgnoreCall(call)} src="images/close.svg" alt=""  />
          </div>
        </div>
      ))}
    </div>
  );
}; 
