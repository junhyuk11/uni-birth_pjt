import React, { useState, useEffect, useRef } from "react";
import Header2 from "../../../common/blocks/Header2";
import Button2 from "../../../common/atoms/Button2";
import { useRecoilValue } from "recoil";
import { nicknameState } from "../../../recoil/atoms";
import { useNavigation } from "../../../hooks/useNavigation";
import { sendMessage, listenForMessages } from "../../../api/useFirebaseApi";
import LeftArrow from "../../../assets/icons/js/leftArrow";
import { useLocation } from "react-router-dom";

const DirectMessage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const nickname = useRecoilValue(nicknameState);
  const location = useLocation();
  const locationNickname = location.state;

  const { navigateToBack } = useNavigation();

  const backClick = () => {
    navigateToBack(); // 화면 이동을 처리하는 함수를 호출합니다.
  };
  const buttonsHeader = [
    {
      component: Button2,
      className: "font-TAEBAEKmilkyway",
      onClick: () => backClick(nickname),
      icon: <LeftArrow />,
    },
    {
      component: () => (
        <span className="ml-4 text-2xl text-white">{locationNickname}</span>
      ),
    },
  ];

  // DOM ref를 사용하여 스크롤 관리
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const addNewMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    const detachListener = listenForMessages(
      addNewMessage,
      nickname,
      locationNickname,
    );

    return () => {
      console.log(locationNickname);
      detachListener();
    };
  }, [nickname, locationNickname]);

  const handleSend = () => {
    if (newMessage.trim()) {
      sendMessage(newMessage, nickname, locationNickname);
      setNewMessage("");
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="mx-auto h-full min-h-screen max-w-screen-sm bg-slate-100 bg-opacity-50">
      <Header2 buttons={buttonsHeader} />
      <div className="px-4">
        <div className="chat-container">
          <div
            className="messages flex flex-col"
            style={{ paddingBottom: "100px" }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`
              mt-2 flex justify-between rounded-md bg-gray-800 p-2 
              ${message.sender === nickname ? "ml-auto" : ""} 
              ${message.sender === locationNickname ? "mr-auto" : ""} 
            `}
                style={{ maxWidth: "50%", wordWrap: "break-word" }}
              >
                <div
                  className="flex-grow"
                  style={{ maxWidth: "90%", wordWrap: "break-word" }}
                >
                  <p className="text-white">{message.text}</p>
                </div>
                <div className="flex flex-col items-end justify-end">
                  <span className="ml-2 text-xs text-gray-500">
                    {formatDate(message.timestamp)}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 mx-auto flex w-full max-w-screen-sm items-center border-t border-gray-200 bg-slate-200 p-4 ">
        <input
          className="mr-4 flex-grow rounded-md border p-2"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="메시지 입력..."
        />
        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
          onClick={handleSend}
        >
          전송
        </button>
      </div>
    </div>
  );
};

export default DirectMessage;
