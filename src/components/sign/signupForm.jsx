import React, { useState } from "react";
import useSignupContext from "../../hooks/useSignupContext";
import PwdDisplayBtn from "../buttons/pwdDisplay.btn";
import MESSAGES from "../../constants/messages";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import classNames from "classnames";

function SignupForm({ children }) {
  const {
    formData,
    formErrs,
    handleFormChange,
    handleSignupSubmit,
    signupErr,
    pwdMatch,
  } = useSignupContext();
  // for control viewing input warning:
  const [userFocus, setUserFocus] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  // handle password view:
  const [pwdDisplay, setPwdDisplay] = useState(false);
  const handlePwdDisplay = () => {
    setPwdDisplay(!pwdDisplay);
  };
  // focus on username input
  let usernameRef = React.useRef();
  React.useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <form action="POST" className="signup-form" onSubmit={handleSignupSubmit}>
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
            type="username"
            name="username"
            minLength="5"
            maxLength="20"
            placeholder="abuAli22"
            value={formData.username}
            ref={usernameRef}
            onChange={handleFormChange}
            onFocus={() => {
              setUserFocus(true);
            }}
            onBlur={() => {
              setUserFocus(false);
            }}
            required
          />
          {userFocus && formErrs?.username && (
            <p className="input-warning">{MESSAGES.errors.invalidUsername}</p>
          )}
          {formErrs?.username && (
            <p className="invalid-input-msg">{formErrs?.username}</p>
          )}
        </div>
      </div>
      <div className="group-inputs">
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
              onFocus={() => {
                setPwdFocus(true);
              }}
              onBlur={() => {
                setPwdFocus(false);
              }}
              autoComplete="off"
              required
            />
            {formData.password && (
              <PwdDisplayBtn
                pwdDisplay={pwdDisplay}
                callback={handlePwdDisplay}
              />
            )}
            {pwdFocus && formErrs?.password && (
              <p className="input-warning">{MESSAGES.errors.invalidPassword}</p>
            )}
            {formErrs?.password && (
              <p className="invalid-input-msg">{formErrs?.password}</p>
            )}
          </div>
        </div>
        <div className="confirm-pwd-div input-div">
          <label htmlFor="confirm-pwd">confirm password</label>
          <div
            className={classNames("input-container", {
              "invalid-input": formErrs?.confirm_pwd,
            })}
          >
            <input
              className="text-input"
              id="confirm-pwd"
              type={pwdDisplay ? "text" : "password"}
              name="confirm_pwd"
              placeholder="********"
              minLength="8"
              maxLength="30"
              value={formData.confirm_pwd}
              onChange={handleFormChange}
              autoComplete="off"
              required
            />
            {!pwdMatch && (
              <p className="invalid-input-msg">
                {MESSAGES.errors.passwordMismatch}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="group-inputs">
        <div className="fname-div input-div">
          <label htmlFor="fname">first name</label>
          <div
            className={classNames("input-container", {
              "invalid-input": formErrs?.fname,
            })}
          >
            <input
              id="fname"
              className="text-input"
              type="text"
              name="fname"
              minLength="3"
              maxLength="50"
              placeholder="john"
              value={formData.fname}
              onChange={handleFormChange}
              required
            />
            {formErrs?.fname && (
              <p className="invalid-input-msg">{formErrs?.fname}</p>
            )}
          </div>
        </div>
        <div className="lname-div input-div">
          <label htmlFor="lname">last name</label>
          <div
            className={classNames("input-container", {
              "invalid-input": formErrs?.lname,
            })}
          >
            <input
              id="lname"
              className="text-input"
              type="text"
              name="lname"
              minLength="3"
              maxLength="50"
              value={formData.lname}
              onChange={handleFormChange}
              placeholder="doe"
              required
            />
            {formErrs?.lname && (
              <p className="invalid-input-msg">{formErrs?.lname}</p>
            )}
          </div>
        </div>
      </div>
      <div className="group-inputs">
        <div className="gender-div input-div">
          <label htmlFor="gender">gender</label>
          <div className="gender-options">
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              onChange={handleFormChange}
            />
            <label htmlFor="male">
              <FaMale />
              <span>male</span>
            </label>
            <input
              type="radio"
              name="gender"
              id="female"
              value="female"
              onChange={handleFormChange}
            />
            <label htmlFor="female">
              <FaFemale />
              <span>female</span>
            </label>
          </div>
        </div>
        <div className="birth-date-div input-div">
          <label htmlFor="birthDate">birth date</label>
          <div
            className={classNames("input-container", {
              "invalid-input": formErrs?.birthDate,
            })}
          >
            <input
              id="age"
              className="text-input"
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleFormChange}
              required
            />
            {formErrs?.birthDate && (
              <p className="invalid-input-msg">{formErrs?.birthDate}</p>
            )}
          </div>
        </div>
      </div>
      {children}
      {signupErr && <p className="form-err-msg">{signupErr}</p>}
    </form>
  );
}

export default React.memo(SignupForm);
