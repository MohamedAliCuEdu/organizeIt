import React, { useState, useEffect, createContext } from "react";
import useAuth from "../hooks/useAuth";
import usePrivateAxios from "../hooks/usePrivateAxios";
import useAxiosGetData from "../hooks/useAxiosGetData";
import useAllNotesContext from "../hooks/useAllNotesContext";
import usePopupContext from "../hooks/usePopupContext";

const ArchiveNotesContext = createContext({});

export function ArchiveNotesProvider({ children }) {
  const { auth } = useAuth();
  const axiosPrivateApi = usePrivateAxios();
  const { handleErrMsg } = usePopupContext();
  const { allNotes, setAllNotes } = useAllNotesContext();

  const URL = `archive-notes/${auth?.userInfo.userId}/`;

  const [archiveNotes, setArchiveNotes] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [currentNote, setCurrentNote] = useState({});
  const [noteView, setNoteView] = useState(false);

  const { data, isLoading, fetchDataErr } = useAxiosGetData({
    axiosInstance: axiosPrivateApi,
    url: URL,
  });
  useEffect(() => {
    setArchiveNotes(data);
  }, [data]);

  const handleSearchInput = (value) => {
    setSearchInput(value);
  };
  const handleNoteView = (noteId) => {
    setNoteView(!noteView);
    if (!noteId) {
      setCurrentNote({});
    } else {
      let targetNote = archiveNotes.find((note) => note._id === noteId);
      setCurrentNote(targetNote);
    }
  };

  // notes api requests:
  // 1. un archive note:
  const unArchiveNoteApi = async (noteId) => {
    // 1. Backup the current states:
    const originalArNotes = [...archiveNotes];
    const originalNotes = [...allNotes];
    try {
      // 2. update states:
      let noteFound = archiveNotes.find((note) => note._id === noteId);
      setArchiveNotes((prev) => prev.filter((note) => note._id !== noteId));
      setAllNotes((prev) => [...prev, { ...noteFound, isArchived: false }]);
      // 3. make patch request api:
      await axiosPrivateApi.patch(URL + "unarchive/" + noteId);
    } catch (err) {
      console.log(err);
      !err?.response
        ? handleErrMsg("server not response!")
        : handleErrMsg("failed to unarchive note!");
      // Rollback state if the request fails
      setArchiveNotes([...originalArNotes]);
      setAllNotes([...originalNotes]);
    }
  };
  // 2. un archive all notes:
  const unArchiveAllNotesApi = async () => {
    // 1. Backup the current states:
    const originalNotes = [...allNotes];
    const originalArNotes = [...archiveNotes];
    try {
      // 2. update states:
      const updateNotes = archiveNotes.map((note) => note.isArchived === false);
      setArchiveNotes([]);
      setAllNotes((prev) => [...prev, ...updateNotes]);
      // 3. make patch request api:
      await axiosPrivateApi.patch(URL + "unarchive");
    } catch (err) {
      console.log(err);
      !err?.response
        ? handleErrMsg("server not response!")
        : handleErrMsg("failed to unarchive all notes!");
      // Rollback state if the request fails
      setAllNotes([...originalNotes]);
      setArchiveNotes([...originalArNotes]);
    }
  };
  // 3. delete note:
  const deleteNoteApi = async (noteId) => {
    // 1. Backup the current state:
    const originalArNotes = [...archiveNotes];
    try {
      // 2. update state:
      setArchiveNotes((prev) => prev.filter((note) => note._id !== noteId));
      // 3. make delete request api:
      await axiosPrivateApi.delete(URL + noteId);
    } catch (err) {
      console.log(err);
      !err?.response
        ? handleErrMsg("server not response!")
        : handleErrMsg("failed to delete note!");
      // Rollback state if the request fails
      setArchiveNotes([...originalArNotes]);
    }
  };
  // 4. delete all archive notes:
  const deleteAllArchiveNotesApi = async () => {
    // 1. Backup the current state:
    const originalArNotes = [...archiveNotes];
    try {
      // 2. update state:
      setArchiveNotes([]);
      // 3. make delete request api:
      await axiosPrivateApi.delete(URL);
    } catch (err) {
      console.log(err);
      !err?.response
        ? handleErrMsg("server not response!")
        : handleErrMsg("failed to delete all notes!");
      // Rollback state if the request fails
      setArchiveNotes([...originalArNotes]);
    }
  };

  return (
    <ArchiveNotesContext.Provider
      value={{
        archiveNotes,
        isLoading,
        fetchDataErr,
        searchInput,
        handleSearchInput,
        currentNote,
        noteView,
        handleNoteView,
        unArchiveNoteApi,
        unArchiveAllNotesApi,
        deleteNoteApi,
        deleteAllArchiveNotesApi,
      }}
    >
      {children}
    </ArchiveNotesContext.Provider>
  );
}

export default ArchiveNotesContext;
