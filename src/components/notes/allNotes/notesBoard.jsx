import React from "react";

import useAllNotesContext from "../../../hooks/useAllNotesContext";
import { GrNotes } from "react-icons/gr";
import { IoIosStats } from "react-icons/io";
import { IoArchive } from "react-icons/io5";

function NotesBoard() {
  const { allNotes, archiveNotes, allTags, isLoading, fetchDataErr } =
    useAllNotesContext();
    console.log(allTags)
  const archiveNotesCount = archiveNotes?.length;
  return (
    <div className="notes-board">
      <h4>
        <IoIosStats />
        notes Statistics
      </h4>
      {isLoading ? (
        <div className="loading-board">
          <div className="load-wraper">
            <div className="activity"></div>
          </div>
          <div className="load-wraper">
            <div className="activity"></div>
          </div>
          <div className="load-wraper">
            <div className="activity"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="general-stats">
            <ul>
              <li>
                <span className="name">
                  <div className="icon">
                    <GrNotes />
                  </div>
                  notes
                </span>
                <span className="count-btn">{allNotes?.length || 0} </span>
              </li>
              <li>
                <span className="name">
                  <div className="icon">
                    <IoArchive />
                  </div>
                  archived
                </span>
                <span className="count-btn">{archiveNotesCount || 0}</span>
              </li>
            </ul>
          </div>
          {!fetchDataErr && (
            <div className="tags-stats">
              {allTags?.length <= 0 ? (
                <p>no tags yet.</p>
              ) : (
                <ul>
                  {allTags.map((t) => {
                    let { tagName, count } = t;
                    return (
                      <li key={tagName}>
                        <span className="tag-name sm-btn white-gray-btn">{tagName}</span>
                        <span className="count-btn">{count}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default NotesBoard;
