import { useContext } from "react";
import allNotesContext from "../context/allNotesContext";

function useAllNotesContext() {
  return useContext(allNotesContext);
}

export default useAllNotesContext;
