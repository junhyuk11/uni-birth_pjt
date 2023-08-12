import React from "react";
import InputEmail from "../../../common/atoms/InputEmail";
import InputPassword from "../../../common/atoms/InputLoginPassword";

const LoginForm = ({ email, setEmail, password, setPassword, onKeyDown }) => {
  return (
    <div className="mx-10 mb-10 mt-72 flex-col items-center justify-center space-y-5">
      <InputEmail
        type="email"
        value={email}
        className="w-full"
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputPassword
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default LoginForm;
