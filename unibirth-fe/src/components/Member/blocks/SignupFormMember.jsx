import React, { useCallback } from "react";
import InputPassword from "../../../common/atoms/InputPassword";
import Inputnickname from "../atoms/Inputnickname";
import InputPasswordConfirm from "../atoms/InputPasswordConfirm";
import InputEmail from "../../../common/atoms/InputEmail";
import Button1 from "../../../common/atoms/Button1";
import useMemberApi from "../../../api/useMemberApi";
import InPutZodiac from "../atoms/InputZodiac";
import { debounce } from "lodash";
import { Jodiac } from "../../../constants/zodiac";
const MemberRegistrationForm = ({
  nickname,
  setNickname,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  zodiac,
  setZodiac,
  birthdate,
  setBirthdate,
  image,
  setImage,
  content,
  setContent,
  jodiacname,
  setJodiacname,
}) => {
  const duplicateCheck = useCallback(async (type, value, emptyMessage) => {
    console.log(type, value, emptyMessage);
    if (value === "") {
      alert(emptyMessage);
      return;
    }
    const checkFunc =
      type === "Email"
        ? useMemberApi.membersPostCheckEmail
        : useMemberApi.membersPostCheckNickname;
    const response = await checkFunc(value);
    alert(
      response.status === 200
        ? `사용 가능한 ${type}입니다.`
        : `이미 사용중인 ${type}입니다.`,
    );
  }, []);

  const debouncedSetImage = useCallback(
    debounce((value) => {
      setImage(value);
      console.log(value);
      console.log({ Jodiac });
      const [year, month, day] = value.split("-");
      console.log(year);
      const birthdateAsNumber = parseInt(month + day, 10);
      if (birthdateAsNumber <= 120) {
        setImage(Jodiac[0].image);
        setContent("");
        setJodiacname(Jodiac[0].name);
      } else if (birthdateAsNumber <= 218) {
        setImage(Jodiac[1].image);
        setContent("");
        setJodiacname(Jodiac[1].name);
      } else if (birthdateAsNumber <= 320) {
        setImage(Jodiac[2].image);
        setContent("");
        setJodiacname(Jodiac[2].name);
      } else if (birthdateAsNumber <= 419) {
        setImage(Jodiac[3].image);
        setContent("");
        setJodiacname(Jodiac[3].name);
      } else if (birthdateAsNumber <= 520) {
        setImage(Jodiac[4].image);
        setContent("");
        setJodiacname(Jodiac[4].name);
      } else if (birthdateAsNumber <= 621) {
        setImage(Jodiac[5].image);
        setContent("");
        setJodiacname(Jodiac[5].name);
      } else if (birthdateAsNumber <= 722) {
        setImage(Jodiac[6].image);
        setContent("");
        setJodiacname(Jodiac[6].name);
      } else if (birthdateAsNumber <= 822) {
        setImage(Jodiac[7].image);
        setContent("");
        setJodiacname(Jodiac[7].name);
      } else if (birthdateAsNumber <= 922) {
        setImage(Jodiac[8].image);
        setContent("");
        setJodiacname(Jodiac[8].name);
      } else if (birthdateAsNumber <= 1023) {
        setImage(Jodiac[9].image);
        setContent("");
        setJodiacname(Jodiac[9].name);
      } else if (birthdateAsNumber <= 1122) {
        setImage(Jodiac[10].image);
        setContent("");
        setJodiacname(Jodiac[10].name);
      } else if (birthdateAsNumber <= 1221) {
        setImage(Jodiac[11].image);
        setContent("");
        setJodiacname(Jodiac[11].name);
      } else if (birthdateAsNumber <= 1231) {
        setImage(Jodiac[0].image);
        setContent("");
        setJodiacname(Jodiac[0].name);
      }
    }, 300),

    [],
  );

  return (
    <div className="mx-10 flex-col items-center justify-center space-y-5">
      <InPutZodiac
        onChange={(e) => {
          setBirthdate(e.target.value);
          debouncedSetImage(e.target.value);
          console.log({ zodiac });
        }}
        zodiac={zodiac}
        setZodiac={setZodiac}
        image={image}
        setImage={setImage}
        content={content}
        setContent={setContent}
        jodiacname={jodiacname}
      />
      <div className="flex">
        <Inputnickname
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <Button1
          value="확인"
          className="w-16 font-Pretendard"
          onClick={(event) => {
            event.preventDefault();
            duplicateCheck("Nickname", nickname, "닉네임을 입력해주세요.");
          }}
        />
      </div>
      <div className="flex">
        <InputEmail
          type="email"
          className="w-100"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button1
          value="확인"
          className="w-16 font-Pretendard"
          onClick={(event) => {
            event.preventDefault();
            duplicateCheck("Email", email, "이메일을 입력해주세요.");
          }}
        />
      </div>
      <div className="flex flex-row">
        <InputPassword
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputPasswordConfirm
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
    </div>
  );
};

export default MemberRegistrationForm;
