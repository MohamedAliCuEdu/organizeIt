import React from "react";

function NoteDates({noteDates}) {
  return (
    <p className="note-dates">
      {noteDates?.updatedAt
        ? "last update: " + new Date(noteDates.updatedAt).toLocaleDateString()
        : "created at: " + new Date(noteDates.createdAt).toLocaleDateString()}
    </p>
  );
}

export default NoteDates;
