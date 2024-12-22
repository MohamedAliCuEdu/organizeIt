import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import usePopupContext from "../../hooks/usePopupContext";
import usePrivateAxios from "../../hooks/usePrivateAxios";
import validateField from "../../utils/validateField";
import MESSAGES from "../../constants/messages";
import PwdDisplayBtn from "../buttons/pwdDisplay.btn";
import classNames from "classnames";
import { MdDriveFileRenameOutline } from "react-icons/md";

function UsernameSection({ handleUserLogout }) {
  const { auth } = useAuth();
  const axiosPrivateApi = usePrivateAxios();
  const URL = `auth/change-username/${auth.userInfo.userId}`;
  const { handleErrMsg, handleSuccess } = usePopupContext();

  // 1) states:
  // form data:
  const [formData, setFormData] = useState({
    username: auth.userInfo.username || "",
    password: "",
  });
  const [formErrs, setFormErrs] = useState({}); // form inputs error:
  const [allValid, setAllValid] = useState(false); // check all inputs valid:
  const [userFocus, setUserFocus] = useState(false); // user input focus state:
  const [pwdDisplay, setPwdDisplay] = useState(false); // display password:
  const [isPending, setIsPending] = useState(false); // pending submit btn:
  
  React.useEffect(() => {
    // make sure inputs have no errors, all inputs not empty:
    let noEmpty = Object.values(formData).every((e) => e);
    let noErrs = Object.values(formErrs).every((e) => !e);
    setAllValid(
      noEmpty && noErrs && auth.userInfo.username !== formData.username
    );
  }, [formData, formErrs]);

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
        // 2. success popup:f
        handleSuccess(
          "Your username have been updated. Logging out for security..."
        );
        // 3. logout:
        handleUserLogout();
      } catch (err) {
        console.log(err);
        !err.response
          ? handleErrMsg("server not response!")
          : err.response.status === 409
          ? handleErrMsg(`username '${username}' has already used!`)
          : err.response.status === 400
          ? handleErrMsg(MESSAGES.errors.invalidUsername)
          : err.response.status === 401
          ? handleErrMsg("wrong password!")
          : handleErrMsg("failed to change username, try again later.");
      } finally {
        setIsPending(false);
      }
    }
  };

  return (
    <section className="username-section">
      <h3 className="section-title">
        <MdDriveFileRenameOutline />
        change username
      </h3>
      <form action="POST" onSubmit={handleSubmit}>
        <div className="username-div input-div">
          <label htmlFor="username">new username</label>
          <div
            className={classNames("input-container", {
              "invalid-input": formErrs.username,
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
              onChange={handleFormData}
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
          </div>
        </div>
        <div className="password-div input-div">
          <label htmlFor="password-user-section">password</label>
          <div
            className={classNames("input-container", {
              "invalid-input": formErrs?.password,
            })}
          >
            <input
              className="text-input"
              id="password-user-section"
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
        <input
          type="submit"
          value="save"
          className="md-btn blue-btn"
          disabled={
            isPending ||
            !allValid ||
            auth.userInfo.username === formData.username
          }
        />
      </form>
    </section>
  );
}

export default UsernameSection;
