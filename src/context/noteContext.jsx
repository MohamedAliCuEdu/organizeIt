import React, { useState, useEffect, createContext } from "react";
import { useSearchParams } from "react-router-dom";

import REGEX from "../utils/regex";
import MESSAGES from "../constants/messages";
import useAllNotesContext from "../hooks/useAllNotesContext";
import usePopupContext from "../hooks/usePopupContext";

const NoteContext = createContext();

export function NoteProvider({ children }) {
  const { noteData } = useAllNotesContext();
  const { handleErrMsg } = usePopupContext();

  const [currentNote, setCurrentNote] = useState({});
  const [noteDates, setNoteDates] = useState({});
  const [currentTags, setCurrentTags] = useState([]);

  const [newTag, setNewTag] = useState("");

  // get noteId searchParam if exist:
  const [searchParams] = useSearchParams();
  const noteId = searchParams.get("noteId");
  useEffect(() => {
    if (noteData) {
      let { title, content, createdAt, updatedAt, tags } = noteData;
      setCurrentNote({ title, content });
      setNoteDates({ createdAt, updatedAt });
      setCurrentTags(tags || []);
    }
  }, []);

  // handle current note change:
  const handleCurrentNote = (e) => {
    let { name, value } = e.target;
    setCurrentNote((prev) => ({ ...prev, [name]: value }));
  };
  // remove tag from note's tags:
  const removeTag = (value) => {
    let filterTags = currentTags.filter((tag) => tag !== value);
    setCurrentTags(filterTags);
  };
  // handle new tag input change:
  const handleNewTag = (value) => {
    setNewTag(value);
  };
  // add new tag to currentTags:
  const addNewTag = (value) => {
    // 1. check length of tags = 5:
    if (currentTags >= 5)
      return handleErrMsg("note can't have more than 5 tags!");
    // 2. check if tag isnt exist:
    let tagExist = currentTags
      .map((tag) => tag.toLowerCase())
      .includes(value.toLowerCase());
    if (tagExist) return handleErrMsg("tag has been added before!");
    // 3. validate tag
    let validTag = REGEX.TAG.test(value);
    if (!validTag) return handleErrMsg(MESSAGES.errors.invalidTag);
    setCurrentTags((prev) => [...prev, value]);
    setNewTag("");
  };
  // select tag to currentTags:
  const handleSelectTag = (value) => {
    // 1. check length of tags = 5:
    if (currentTags >= 5)
      return handleErrMsg("note can't have more than 5 tags!");
    // 2. check if tag isnt exist:
    let tagExist = currentTags
      .map((tag) => tag.toLowerCase())
      .includes(value.toLowerCase());
    if (tagExist) return handleErrMsg("tag has been added before!");
    // 3. update currentTags state:
    setCurrentTags((prev) => [...prev, value]);
  };

  return (
    <NoteContext.Provider
      value={{
        noteId,
        currentNote,
        handleCurrentNote,
        noteDates,
        currentTags,
        newTag,
        handleNewTag,
        handleSelectTag,
        addNewTag,
        removeTag,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}

export default NoteContext;
