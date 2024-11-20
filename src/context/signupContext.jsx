import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import axiosApi from "../services/api";
import validateField from "../utils/validateField";
import usePopupContext from "../hooks/usePopupContext";
import MESSAGES from "../constants/messages";

const SignupContext = React.createContext();

export function SignupProvider({ children }) {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { handleErrMsg, handleSuccess } = usePopupContext();

  // if user in signup page & he is already login:
  let fromPath = location?.state?.from || "/";
  React.useEffect(() => {
    auth?.accessToken && navigate("/", { replace: true });
  }, []);

  // states:
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirm_pwd: "",
    fname: "",
    lname: "",
    birthDate: "",
    gender: "",
  });
  const [formErrs, setFormErrs] = useState({});
  const [allValid, setAllValid] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [pwdMatch, setPwdMatch] = useState(false);

  // handle inputs changes:
  const handleFormChange = (e) => {
    // 1. destructure name & value:
    let { name, value } = e.target;
    console.log(value);
    // 2. validate value:
    let error = validateField(name, value, formData);
    // 3. update states:
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrs((prev) => ({ ...prev, [name]: error }));
  };
  // validate sign up inputs values:
  useEffect(() => {
    // make sure all inputs have values & no errors:
    setPwdMatch(formData.password === formData.confirm_pwd);
  }, [formData.password, formData.confirm_pwd]);
  useEffect(() => {
    // make sure all inputs have values & no errors & pwdMatch:
    let noErrs = Object.values(formErrs).every((err) => !err);
    let noEmpty = Object.values(formData).every((val) => val);
    setAllValid(noErrs && noEmpty && pwdMatch);
  }, [formData]);
  // handle form submission:
  async function handleSignupSubmit(e) {
    e.preventDefault();
    if (allValid) {
      setIsPending(true);
      // 1. make post request:
      try {
        let { confirm_pwd, ...data } = formData;
        const res = await axiosApi.post("users", data);
        // 2. store response data in auth context:
        setAuth(res.data);
        handleSuccess(MESSAGES.success.signup)
        // 3. go to previos path or home page:
        navigate(fromPath, { replace: true });
      } catch (err) {
        console.log(err);
        !err?.response
          ? handleErrMsg("server not response!")
          : err.response.status === 409
          ? handleErrMsg("username is already exist!")
          : err.response.status === 403
          ? handleErrMsg("invalid information")
          : handleErrMsg("signup failed!");
      } finally {
        setIsPending(false);
      }
    } else {
      handleErrMsg("invalid or missing information!");
    }
  }

  return (
    <SignupContext.Provider
      value={{
        formData,
        formErrs,
        pwdMatch,
        handleFormChange,
        allValid,
        handleSignupSubmit,
        isPending,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
}

export default SignupContext;
