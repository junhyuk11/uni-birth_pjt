import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { nicknameState, updateTimeState } from "../../../recoil/atoms";
import { get, ref } from "firebase/database";
import { database } from "../../../api/useFirebaseApi";

const Mail = () => {
  const updateTime = useRecoilValue(updateTimeState);
  const nickname = useRecoilValue(nicknameState);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    const fetchLastUpdate = async () => {
      const nicknameRef = ref(database, `updateMessage/${nickname}`);
      const snapshot = await get(nicknameRef);
      console.log(nicknameRef);
      console.log(snapshot);
      if (snapshot.exists()) {
        setLastUpdate(snapshot.val());
      }
    };

    fetchLastUpdate();
  }, []);

  useEffect(() => {
    console.log("상태 변경 후 비교", lastUpdate, updateTime);
  }, [lastUpdate]);

  const backgroundColor = lastUpdate > updateTime ? "yellow" : "transparent";

  return (
    <div style={{ backgroundColor }}>
      <svg
        width="24"
        height="18"
        viewBox="0 0 24 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24 0H0.012L0 18H24V0ZM21.6 15.75H2.4V4.5L12 10.125L21.6 4.5V15.75ZM12 7.875L2.4 2.25H21.6L12 7.875Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

export default Mail;
