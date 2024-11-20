import { useContext } from "react";
import NoteContext from "../context/noteContext";

function useNoteContext() {
  return useContext(NoteContext);
}

export default useNoteContext;
