import { useContext } from "react";
import PopupContext from "../context/popupContext";

function usePopupContext() {
  return useContext(PopupContext);
}

export default usePopupContext;
