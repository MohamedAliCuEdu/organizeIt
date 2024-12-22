import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import usePopupContext from "../../hooks/usePopupContext";
import usePrivateAxios from "../../hooks/usePrivateAxios";
import validateField from "../../utils/validateField";
import MESSAGES from "../../constants/messages";
import classNames from "classnames";
import { MdDriveFileRenameOutline } from "react-icons/md";
import PwdDisplayBtn from "../buttons/pwdDisplay.btn";
import { RiLockPasswordFill } from "react-icons/ri";

function PasswordSection({ handleUserLogout }) {
  const { auth } = useAuth();
  const axiosPrivateApi = usePrivateAxios();
  const URL = `auth/change-password/${auth.userInfo.userId}`;
  const { handleErrMsg, handleSuccess } = usePopupContext();

  // 1) states:
  // form data:
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [formErrs, setFormErrs] = useState({}); // form inputs error:
  const [allValid, setAllValid] = useState(false); // check all inputs valid:
  const [pwdDisplay, setPwdDisplay] = useState(false); // display password:
  const [pwdMatch, setPwdMatch] = useState(true); // check if pwd === confirm pwd:
  const [isPending, setIsPending] = useState(false); // pending submit btn:
  const [newPwdFocus, setNewPwdFocus] = useState(false); // new pwd input focus state:
  React.useEffect(() => {
    // make sure inputs have no errors, all inputs not empty:
    let noEmpty = Object.values(formData).every((e) => e);
    let noErrs = Object.values(formErrs).every((e) => !e);
    setAllValid(noEmpty && noErrs);
  }, [formData, formErrs]);

  // validate match password:
  React.useEffect(() => {
    setPwdMatch(formData?.newPassword === formData?.confirmPassword);
  }, [formData.newPassword, formData.confirmPassword]);

  // 1. handle formData change:
  const handleFormData = (e) => {
    // update formData:
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // validate input:
    let error = validateField(name, value);
    // set errors:
    setFormErrs((prev) => ({ ...prev, [name]: error }));
  };
  // 2. handle display passwords:
  const handlePwdDisplay = async (e) => {
    setPwdDisplay(!pwdDisplay);
  };

  // 3. update username api:
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (allValid) {
      try {
        setIsPending(true);
        // 1. make api request:
        await axiosPrivateApi.patch(URL, formData);
        // 2. success popup:
        handleSuccess("password updated successfully.");
        // 3. logout:
        handleUserLogout();
        handleSuccess(
          "Your password have been updated. Logging out for security..."
        );
      } catch (err) {
        console.log(err);
        !err.response
          ? handleErrMsg("server not response!")
          : err.response.status === 401
          ? handleErrMsg("invalid password!")
          : err.response.status === 400
          ? handleErrMsg(err.response.data?.errMsg || "invalid data!")
          : handleErrMsg("failed to change password, try again later.");
      } finally {
        setIsPending(false);
      }
    }
  };

  return (
    <section className="username-section">
      <h3 className="section-title">
        <RiLockPasswordFill />
        change passowrd
      </h3>
      <form action="POST" onSubmit={handleSubmit}>
        <div className="old-password-div input-div">
          <label htmlFor="password-pwd-section">password</label>
          <div
            className={classNames("input-container", {
              "invalid-input": formErrs?.password,
            })}
          >
            <input
              className="text-input"
              id="password-pwd-section"
              type={pwdDisplay ? "text" : "password"}
              name="password"
              placeholder="********"
              minLength="8"
              maxLength="30"
              value={formData.password}
              onChange={handleFormData}
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
        <div className="new-password-div input-div">
          <label htmlFor="newPassword">new password</label>
          <div
            className={classNames("input-container", {
              "invalid-input": formErrs?.newPassword,
            })}
          >
            <input
              className="text-input"
              id="newPassword"
              type={pwdDisplay ? "text" : "password"}
              name="newPassword"
              placeholder="********"
              minLength="8"
              maxLength="30"
              value={formData.newPassword}
              onChange={handleFormData}
              onFocus={() => setNewPwdFocus(true)}
              onBlur={() => setNewPwdFocus(false)}
              autoComplete="off"
              required
            />
            {newPwdFocus && formErrs?.newPassword && (
              <p className="input-warning">{MESSAGES.errors.invalidPassword}</p>
            )}
            {formData.newPassword && (
              <PwdDisplayBtn state={pwdDisplay} callback={handlePwdDisplay} />
            )}
          </div>
        </div>
        <div className="confirm-password-div input-div">
          <label htmlFor="confirmPassword">confirm password</label>
          <div
            className={classNames("input-container", {
              "invalid-input": !pwdMatch,
            })}
          >
            <input
              className="text-input"
              id="confirmPassword"
              type={pwdDisplay ? "text" : "password"}
              name="confirmPassword"
              placeholder="********"
              minLength="8"
              maxLength="30"
              value={formData.confirmPassword}
              onChange={handleFormData}
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
        <input
          type="submit"
          value="save"
          className="md-btn blue-btn"
          disabled={isPending || !allValid}
        />
      </form>
    </section>
  );
}

export default PasswordSection;
