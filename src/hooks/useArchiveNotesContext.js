import { useContext } from "react";
import archiveNoteContext from "../context/archiveNotesContext";

function useArchiveNotesContext() {
  return useContext(archiveNoteContext);
}

export default useArchiveNotesContext;
