import { useContext } from "react";
import ProfileContext from "../context/profileContext";

function useProfileContext() {
  return useContext(ProfileContext);
}

export default useProfileContext;
