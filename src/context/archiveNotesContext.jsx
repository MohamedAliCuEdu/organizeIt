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
  const { setAllNotes } = useAllNotesContext();

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
    try {
      // 1. make patch request api:
      await axiosPrivateApi.patch(URL + "unarchive/" + noteId);
      // 2. update archiveNotes & allNotes:
      setArchiveNotes((prev) => prev.filter((note) => note._id !== noteId));
      let noteFound = archiveNotes.find((note) => note._id === noteId);
      setAllNotes((prev) => [...prev, { ...noteFound, isArchived: false }]);
    } catch (err) {
      console.log(err);
      !err?.response
        ? handleErrMsg("server not response!")
        : handleErrMsg("failed to unarchive note!");
    }
  };
  // 2. un archive all notes:
  const unArchiveAllNotesApi = async () => {
    try {
      // 1. make patch request api:
      await axiosPrivateApi.patch(URL + "unarchive");
      // 2. set isArchived in every note to false:
      const updateNotes = archiveNotes.map((note) => note.isArchived === false);
      // 2. update archiveNotes & allNotes:
      setAllNotes((prev) => [...prev, ...updateNotes]);
      setArchiveNotes([]);
    } catch (err) {
      console.log(err);
      !err?.response
        ? handleErrMsg("server not response!")
        : handleErrMsg("failed to unarchive all notes!");
    }
  };
  // 3. delete note:
  const deleteNoteApi = async (noteId) => {
    try {
      // 1. make delete request api:
      await axiosPrivateApi.delete(URL + noteId);
      // 2. filter notes by noteId:
      setArchiveNotes((prev) => prev.filter((note) => note._id !== noteId));
    } catch (err) {
      console.log(err);
      !err?.response
        ? handleErrMsg("server not response!")
        : handleErrMsg("failed to delete note!");
    }
  };
  // 4. delete all archive notes:
  const deleteAllArchiveNotesApi = async () => {
    try {
      // 1. make delete request api:
      await axiosPrivateApi.delete(URL);
      // 2. update archiveNotes:
      setArchiveNotes([]);
    } catch (err) {
      console.log(err);
      !err?.response
        ? handleErrMsg("server not response!")
        : handleErrMsg("failed to delete all notes!");
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
