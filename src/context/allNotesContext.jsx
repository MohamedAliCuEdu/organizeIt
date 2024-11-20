import React, { useState, useEffect, createContext } from "react";
import useAuth from "../hooks/useAuth";
import usePrivateAxios from "../hooks/usePrivateAxios";
import useAxiosGetData from "../hooks/useAxiosGetData";
import { useNavigate } from "react-router";
import usePopupContext from "../hooks/usePopupContext";

const allNotesContext = createContext({});

export function AllNotesProvider({ children }) {
  const { auth } = useAuth();
  const axiosPrivateApi = usePrivateAxios();
  const { handleErrMsg } = usePopupContext();

  const URL = `notes/${auth?.userInfo.userId}/`;

  const [allNotes, setAllNotes] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [noteData, setNoteData] = useState({});
  const { data, isLoading, fetchDataErr } = useAxiosGetData({
    axiosInstance: axiosPrivateApi,
    url: URL,
  });

  useEffect(() => {
    setAllNotes(data?.allNotes);
    setAllTags(data?.allTags);
  }, [data]);

  const [searchInput, setSearchInput] = useState("");
  const [saveNotePending, setSaveNotePending] = useState(false);

  const handleSearchInput = (value) => {
    setSearchInput(value);
  };
  const navigate = useNavigate();
  const openNote = (noteId) => {
    // find note:
    let noteTarget = allNotes.find((note) => note._id === noteId);
    if (noteTarget === -1) {
      handleErrMsg("note not found!");
    } else {
      setNoteData(noteTarget);
      navigate("note?noteId=" + noteId);
    }
  };

  // all notes api requests:
  // add or edit note:
  const saveNoteApi = async (noteId, data, callBack) => {
    try {
      setSaveNotePending(true);
      // 1. check if there noteId
      if (!noteId) {
        // 2. make post request api:
        const res = await axiosPrivateApi.post(URL, data);
        // 3. add new note from response in allNotes:
        setAllNotes((prev) => [...prev, res.data]);
        res.data && callBack && callBack();
      } else {
        // 2. make put request api:
        const res = await axiosPrivateApi.put(URL + noteId, data);
        // 3. add new note from response in allNotes:
        setAllNotes((prev) =>
          prev.map((note) => (note._id === noteId ? res.data : note))
        );
      }
    } catch (err) {
      console.log(err);
      !err?.response
        ? handleErrMsg("server not response!")
        : err.response.status === 403
        ? handleErrMsg("invalid data!")
        : handleErrMsg("failed to save note!");
    } finally {
      setSaveNotePending(false);
    }
  };
  // delete note:
  const deleteNoteApi = async (noteId) => {
    try {
      // 1. make delete request api:
      await axiosPrivateApi.delete(URL + noteId);
      // 2. filter notes by noteId:
      setAllNotes((prev) => prev.filter((note) => note._id !== noteId));
    } catch (err) {
      console.log(err);
      !err?.response
        ? handleErrMsg("server not response!")
        : handleErrMsg("failed to delete note!");
    }
  };
  // delete all notes:
  const deleteAllNotesApi = async () => {
    try {
      // 1. make delete request api:
      await axiosPrivateApi.delete(URL);
      // 2. set allNotes to []:
      setAllNotes([]);
    } catch (err) {
      console.log(err);
      !err?.response
        ? handleErrMsg("server not response!")
        : handleErrMsg("failed to delete all notes!");
    }
  };
  // archive note:
  const archiveNoteApi = async (noteId) => {
    try {
      // 1. make patch request api:
      await axiosPrivateApi.patch(URL + noteId + "/archive");
      // 2. update states:
      setAllNotes((prev) => prev.filter((note) => note._id !== noteId));
    } catch (err) {
      console.log(err);
      !err?.response
        ? handleErrMsg("server not response!")
        : handleErrMsg("failed to archive note!");
    }
  };

  return (
    <allNotesContext.Provider
      value={{
        allNotes,
        setAllNotes,
        allTags,
        isLoading,
        fetchDataErr,
        searchInput,
        handleSearchInput,
        openNote,
        noteData,
        saveNotePending,
        saveNoteApi,
        archiveNoteApi,
        deleteNoteApi,
        deleteAllNotesApi,
      }}
    >
      {children}
    </allNotesContext.Provider>
  );
}

export default allNotesContext;