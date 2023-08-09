import React, { useEffect, useState } from "react";
import Header2 from "../../../common/blocks/Header2";
import Button2 from "../../../common/atoms/Button2";
import { useNavigation } from "../../../hooks/useNavigation";
import { useRecoilValue, useRecoilState } from "recoil";
import { database, ref, onValue, off } from "../../../api/useFirebaseApi";
import { nicknameState, targetNicknameState } from "../../../recoil/atoms";
import LeftArrow from "../../../assets/icons/js/leftArrow";

const MessageBox = () => {
  const nickname = useRecoilValue(nicknameState);
  const [targetNickname, setTargetNickname] =
    useRecoilState(targetNicknameState);
  const [chatRooms, setChatRooms] = useState([]);
  const { navigateToMemberProfile, navigateToDirectMessage } = useNavigation();

  const handleBackClick = () => {
    setTargetNickname(nickname);
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

  const handleNavigateToChat = (chatId) => {
    const [sender, target] = chatId.split("_");
    const otherNickname = sender === nickname ? target : sender;
    console.log(targetNickname);

    setTargetNickname(otherNickname); // recoil 상태 설정

    navigateToDirectMessage(chatId); // 해당 페이지로 이동
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

  return (
    <div className="mx-auto h-screen max-w-screen-sm bg-slate-100 bg-opacity-50">
      <div>
        <Header2 buttons={buttonsHeader} />
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
