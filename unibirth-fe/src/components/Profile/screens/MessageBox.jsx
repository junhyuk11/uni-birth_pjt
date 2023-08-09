import React, { useEffect, useState } from "react";
import Header2 from "../../../common/blocks/Header2";
import Button2 from "../../../common/atoms/Button2";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigation } from "../../../hooks/useNavigation";
import { useRecoilValue, useRecoilState } from "recoil";
import { database, ref, onValue, off } from "../../../api/useFirebaseApi";
import { nicknameState, targetNicknameState } from "../../../recoil/atoms";

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
      value: "뒤로가기",
      onClick: handleBackClick,
      icon: <IoIosArrowBack />,
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
      setChatRooms(userChats);
    };

    onValue(chatRef, handleNewChatRoom);

    return () => {
      off(chatRef, "value", handleNewChatRoom);
    };
  }, [nickname]);

  return (
    <div className="text-xs text-white">
      <Header2 buttons={buttonsHeader} />
      <ul>
        {chatRooms.map(([chatId, chatData]) => {
          const [sender, target] = chatId.split("_");
          const otherNickname = sender === nickname ? target : sender;

          const messages = Object.values(chatData);
          const lastMessage = messages[messages.length - 1];

          return (
            <li key={chatId} className="mb-2">
              <strong className="text-base">닉네임 :</strong> {otherNickname}
              <button
                onClick={() => handleNavigateToChat(chatId)}
                className="ml-2 rounded bg-gray-500 px-2 py-1 text-xs"
              >
                채팅방 이동
              </button>
              {lastMessage && (
                <div className="text-xs">
                  <strong className="text-base"></strong> {lastMessage.text}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MessageBox;
