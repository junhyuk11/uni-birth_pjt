import React, { useEffect, useState } from "react";
import Header2 from "../../../common/blocks/Header2";
import Button2 from "../../../common/atoms/Button2";
import { useNavigation } from "../../../hooks/useNavigation";
import { database, ref, onValue, off } from "../../../api/useFirebaseApi";
import {
  nicknameState,
  targetNicknameState,
  updateTimeState,
} from "../../../recoil/atoms";
import LeftArrow from "../../../assets/icons/js/leftArrow";
import { useRecoilValue, useRecoilState } from "recoil";

const MessageBox = () => {
  const nickname = useRecoilValue(nicknameState);
  const [targetNickname, setTargetNickname] =
    useRecoilState(targetNicknameState);
  const [updateTime, setUpdateTime] = useRecoilState(updateTimeState);
  const [chatRooms, setChatRooms] = useState([]);
  const { navigateToDirectMessage, navigateToBack } = useNavigation();
  console.log(targetNickname);
  const buttonsHeader = [
    {
      component: Button2,
      className: "font-TAEBAEKmilkyway",
      onClick: navigateToBack,
      icon: <LeftArrow />,
    },
    {
      component: () => (
        <span className="ml-4 text-2xl text-white" onClick={() => {}}>
          메시지
        </span>
      ),
    },
  ];

  const handleNavigateToChat = (chatId) => {
    const [sender, target] = chatId.split("_");
    const otherNickname = sender === nickname ? target : sender;
    setTargetNickname(otherNickname);
    navigateToDirectMessage(); // 해당 페이지로 이동
  };

  useEffect(() => {
    const chatRef = ref(database, "chats");
    const handleNewChatRoom = (snapshot) => {
      const allChats = snapshot.val();
      const userChats = Object.entries(allChats || {}).filter(([chatId]) => {
        const [sender, target] = chatId.split("_");
        return sender === nickname || target === nickname;
      });

      // timestamp를 기준으로 내림차순 정렬
      userChats.sort(([, chatDataA], [, chatDataB]) => {
        const messagesA = Object.values(chatDataA);
        const messagesB = Object.values(chatDataB);

        const lastTimestampA = messagesA[messagesA.length - 1]?.timestamp || 0;
        const lastTimestampB = messagesB[messagesB.length - 1]?.timestamp || 0;

        return lastTimestampB - lastTimestampA;
      });

      setChatRooms(userChats);
    };

    onValue(chatRef, handleNewChatRoom);

    return () => {
      off(chatRef, "value", handleNewChatRoom);
    };
  }, [nickname]);

  useEffect(() => {
    console.log(updateTime);
    setUpdateTime(Date.now());
  }, []);

  return (
    <div className="mx-auto h-full min-h-screen max-w-screen-sm bg-slate-100 bg-opacity-50">
      <div>
        <header className="sticky top-0 z-10">
          <Header2 buttons={buttonsHeader} />
        </header>
        <ul>
          {chatRooms.map(([chatId, chatData]) => {
            const [sender, target] = chatId.split("_");
            const otherNickname = sender === nickname ? target : sender;

            const messages = Object.values(chatData);
            const lastMessage = messages[messages.length - 1];

            return (
              <li
                key={chatId}
                className="border-t px-4 py-4"
                onClick={() => handleNavigateToChat(chatId)}
              >
                <strong className="text-base">닉네임 :</strong> {otherNickname}
                {lastMessage && (
                  <div className="text-xs">
                    <strong className="text-base"></strong> {lastMessage.text}
                  </div>
                )}
              </li>
            );
          })}
          <li className="border-t"></li>
        </ul>
      </div>
    </div>
  );
};

export default MessageBox;
