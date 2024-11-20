import { useContext } from "react";
import SignupContext from "../context/signupContext";

function useSignupContext() {
  return useContext(SignupContext);
}

export default useSignupContext;
