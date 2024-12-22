import React, { useState } from "react";
import PwdDisplayBtn from "../buttons/pwdDisplay.btn";
import SignConext from "../../context/loginContext";
import classNames from "classnames";

function LoginForm({ children }) {
  const { formData, formErrs, handleFormChange, handleLoginSubmit } =
    React.useContext(SignConext);

  // focus on username input
  let usernameRef = React.useRef();
  React.useEffect(() => {
    usernameRef.current.focus();
  }, []);

  // handle password view:
  const [pwdDisplay, setPwdDisplay] = useState(false);
  const handlePwdDisplay = () => {
    setPwdDisplay(!pwdDisplay);
  };

  return (
    <form method="POST" className="login-form" onSubmit={handleLoginSubmit}>
      <div className="username-div input-div">
        <label htmlFor="username">username</label>
        <div
          className={classNames("input-container", {
            "invalid-input": formErrs?.username,
          })}
        >
          <input
            id="username"
            className="text-input"
            type="text"
            name="username"
            minLength="5"
            maxLength="20"
            placeholder="abuAli22"
            value={formData.username}
            ref={usernameRef}
            onChange={handleFormChange}
            required
          />
          {formErrs?.username && formData.username.length > 0 && (
            <p className="invalid-input-msg">{formErrs?.username}</p>
          )}
        </div>
      </div>
      <div className="password-div input-div">
        <label htmlFor="password">password</label>
        <div
          className={classNames("input-container", {
            "invalid-input": formErrs?.password,
          })}
        >
          <input
            className="text-input"
            id="password"
            type={pwdDisplay ? "text" : "password"}
            name="password"
            placeholder="********"
            minLength="8"
            maxLength="30"
            value={formData.password}
            onChange={handleFormChange}
            autoComplete="off"
            required
          />
          {formData.password && (
            <PwdDisplayBtn state={pwdDisplay} callback={handlePwdDisplay} />
          )}
          {formErrs?.password && formData.password && (
            <p className="invalid-input-msg">{formErrs?.password}</p>
          )}
        </div>
      </div>
      {children}
    </form>
  );
}

export default React.memo(LoginForm);
