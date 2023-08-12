import React, { useState, useEffect } from "react";
import Button1 from "../../../common/atoms/Button1";
import Button2 from "../../../common/atoms/Button2";
import Header1 from "../../../common/blocks/Header1";
import Footer1 from "../../../common/blocks/Footer1";
import SignupFormMember from "../blocks/SignupFormMember";
import { useNavigation } from "../../../hooks/useNavigation";
import useMemberApi from "../../../api/useMemberApi";
import LeftArrow from "../../../assets/icons/js/leftArrow";
import { useSetRecoilState } from "recoil";
import { backgroundflagState } from "../../../recoil/atoms";
import CustomAlert from "../../../common/atoms/CustomAlert";

const RegisterMember = () => {
  const backgroundflag = useSetRecoilState(backgroundflagState);
  useEffect(() => {
    backgroundflag(true);
  }, []);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [interest, setInterest] = useState(1);
  const [image, setImage] = useState(
    "https://firebasestorage.googleapis.com/v0/b/uni-birth.appspot.com/o/Zordiac%2Fearth.png?alt=media&token=0ecc42f5-7022-4197-827b-751ecb92c983",
  );
  const { navigateToBack, navigateToLoginMember } = useNavigation();

  const joinMember = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setIsAlertVisible(true);
      setAlertMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    const member = {
      nickname,
      email,
      password,
      birthdate,
      imageUrl: image,
      planetId: interest,
    };

    try {
      const response = await useMemberApi.membersPostRegister(member);
      if (response.status === 200) {
        setIsAlertVisible(true);
        setAlertMessage("회원가입이 완료되었습니다.");
      } else {
        setIsAlertVisible(true);
        setAlertMessage("회원가입에 실패하였습니다.");
      }
    } catch (e) {
      setIsAlertVisible(true);
      setAlertMessage("회원가입에 실패하였습니다.");
    }
  };

  const buttonsHeader = [
    {
      component: Button2,
      className: "font-TAEBAEKmilkyway",
      value: "",
      onClick: navigateToBack,
      icon: <LeftArrow />,
    },
  ];
  const buttonsFooter = [
    {
      component: Button1,
      className: "font-TAEBAEKmilkyway",
      value: "회원가입",
      onClick: joinMember,
    },
  ];

  return (
    <div className="mx-auto h-screen max-w-screen-sm">
      <CustomAlert
        message={alertMessage}
        isVisible={isAlertVisible}
        onClose={() => {
          setIsAlertVisible(false);
          if (alertMessage === "회원가입이 완료되었습니다.") {
            navigateToLoginMember();
          }
        }}
      />
      <div>
        <Header1 buttons={buttonsHeader} />
        <form className="justify-center">
          <SignupFormMember
            nickname={nickname}
            setNickname={setNickname}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            birthdate={birthdate}
            setBirthdate={setBirthdate}
            image={image}
            setImage={setImage}
            interest={interest}
            setInterest={setInterest}
          />
          <Footer1
            buttons={buttonsFooter}
            nickname={nickname}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            joinMember={joinMember}
          />
        </form>
      </div>
    </div>
  );
};

export default RegisterMember;
