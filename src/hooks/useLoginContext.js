import { useContext } from "react";
import LoginContext from "../context/loginContext";

function useLoginContext() {
  return useContext(LoginContext);
}

export default useLoginContext;
