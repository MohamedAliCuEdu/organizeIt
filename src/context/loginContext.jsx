import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import axiosApi from "../services/api";
import validateField from "../utils/validateField";
import usePopupContext from "../hooks/usePopupContext";
import MESSAGES from "../constants/messages";

const LoginContext = React.createContext();

export function LoginProvider({ children }) {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { handleErrMsg, handleSuccess } = usePopupContext();

  // if user in login page & he is already login:
  let fromPath = location?.state?.from || "/";
  React.useEffect(() => {
    auth?.accessToken && navigate("/", { replace: true });
  }, []);

  // states:
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrs, setFormErrs] = useState({ username: "", password: "" });
  const [allValid, setAllValid] = useState(false);
  const [isPending, setIsPending] = useState(false);

  // handle formData changes:
  const handleFormChange = (e) => {
    // 1. destructure name & value:
    let { name, value } = e.target;
    // 2. validate value:
    let error = validateField(name, value);
    // 4. update states:
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrs((prev) => ({ ...prev, [name]: error }));
  };
  // validate login inputs values:
  React.useEffect(() => {
    // make sure all inputs have values & no errors:
    let noErrs = Object.values(formErrs).every((err) => !err);
    let noEmpty = Object.values(formData).every((val) => val);
    setAllValid(noEmpty && noErrs);
  }, [formData]);
  // handle form submission:
  async function handleLoginSubmit(e) {
    e.preventDefault();
    if (allValid) {
      setIsPending(true);
      handleErrMsg("");
      // 1. make post request:
      try {
        const res = await axiosApi.post("auth", formData);
        // 2. store response data in auth context:
        setAuth(res.data);
        // 3. view success msg:
        handleSuccess(MESSAGES.success.login)
        // 4. go to previos path or home page:
        navigate(fromPath, { replace: true });
      } catch (err) {
        console.log(err);
        !err?.response
          ? handleErrMsg("server not response!")
          : err.response.status === 401 || err.response.status === 403
          ? handleErrMsg("username or password is incorrect!")
          : handleErrMsg("login failed!");
      } finally {
        setIsPending(false);
      }
    } else {
      handleErrMsg("username or password is missing or incorrect!");
    }
  }

  return (
    <LoginContext.Provider
      value={{
        formData,
        formErrs,
        allValid,
        isPending,
        handleFormChange,
        handleLoginSubmit,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export default LoginContext;
