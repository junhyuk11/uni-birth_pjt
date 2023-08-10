import React, { useEffect, useState } from "react";
import Header2 from "../../../common/blocks/Header2";
import Button2 from "../../../common/atoms/Button2";
import { useNavigation } from "../../../hooks/useNavigation";
import { useRecoilValue } from "recoil";
import { database, ref, onValue, off } from "../../../api/useFirebaseApi";
import { nicknameState } from "../../../recoil/atoms";
import LeftArrow from "../../../assets/icons/js/leftArrow";

const UserAlarm = () => {
  const nickname = useRecoilValue(nicknameState);
  const [alarms, setAlarms] = useState([]);
  const { navigateToMemberProfile, navigateToDetailConstellation } =
    useNavigation();

  const handleBackClick = () => {
    navigateToMemberProfile();
  };

  const buttonsHeader = [
    {
      component: Button2,
      className: "font-TAEBAEKmilkyway",
      onClick: handleBackClick,
      icon: <LeftArrow />,
    },
  ];

  useEffect(() => {
    const invitedRef = ref(database, `invited/${nickname}`);
    const handleNewAlarm = (snapshot) => {
      const userAlarms = snapshot.val();
      if (userAlarms) {
        const formattedAlarms = Object.entries(userAlarms);
        const sortedAlarms = formattedAlarms.sort(
          (a, b) => b[1].timestamp - a[1].timestamp,
        );
        setAlarms(sortedAlarms);
      }
    };

    onValue(invitedRef, handleNewAlarm);

    return () => {
      off(invitedRef, "value", handleNewAlarm);
    };
  }, [nickname]);

  return (
    <div className="mx-auto h-screen max-w-screen-sm bg-slate-100 bg-opacity-50">
      <div>
        <Header2 buttons={buttonsHeader} />
        <ul>
          {alarms.map(([alarmId, alarmData]) => (
            <li
              key={alarmId}
              onClick={() =>
                navigateToDetailConstellation(alarmData.constellationId)
              }
              className="border-t px-4 py-4"
            >
              <div className="text-base">
                {alarmData.sender}님이 {alarmData.constellationTitle}로
                초대하였습니다.
              </div>
              {alarmData.timestamp && (
                <div className="mt-2 text-xs">
                  {new Date(alarmData.timestamp).toLocaleString()}
                </div>
              )}
            </li>
          ))}
          <li className="border-t"></li>
        </ul>
      </div>
    </div>
  );
};

export default UserAlarm;
