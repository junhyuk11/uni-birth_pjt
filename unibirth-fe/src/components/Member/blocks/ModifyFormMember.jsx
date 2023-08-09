import React from "react";
import InputPassword from "../../../common/atoms/InputPassword";
import InputPasswordConfirm from "../atoms/InputPasswordConfirm";
const MemberModifyForm = ({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}) => {
  return (
    <div className="items-cneter flex flex-col justify-center space-y-5">
      <InputPassword
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <InputPasswordConfirm
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </div>
  );
};

export default MemberModifyForm;
