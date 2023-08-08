import React, { useState, useEffect, useRef } from "react";
import Header2 from "../../../common/blocks/Header2";
import Button2 from "../../../common/atoms/Button2";
import { IoIosArrowBack } from "react-icons/io";
import { useRecoilValue } from "recoil";
import { nicknameState } from "../../../recoil/atoms";
import { useNavigation } from "../../../hooks/useNavigation";
import { sendMessage, listenForMessages } from "../../../api/useFirebaseApi";

const DirectMessage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const nickname = useRecoilValue(nicknameState);
  const { navigateToBack } = useNavigation();

  const buttonsHeader = [
    {
      component: Button2,
      className: "font-TAEBAEKmilkyway",
      value: "뒤로가기",
      onClick: navigateToBack,
      icon: <IoIosArrowBack />,
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

    const detachListener = listenForMessages(addNewMessage);

    return () => {
      detachListener();
    };
  }, []);

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      sendMessage(newMessage, nickname);
      setNewMessage("");
    }
  };

  return (
    <div>
      <Header2 buttons={buttonsHeader} />
      <div className="chat-container">
        <div className="messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${
                message.sender === nickname ? "outgoing" : "incoming"
              } mt-2 rounded-md bg-gray-800 p-2`} // bg-gray-800 and rounded-md added for styling
            >
              <p className="text-white">{message.text}</p>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        <div className="flex items-center border-t border-gray-200 p-4">
          <input
            className="mr-4 flex-grow rounded-md border p-2"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
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
    </div>
  );
};

export default DirectMessage;
