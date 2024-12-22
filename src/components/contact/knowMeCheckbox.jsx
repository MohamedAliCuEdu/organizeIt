import React from "react";

function KnowMeCheckbox({ author, handleAuthorInput }) {
  return (
    <div className="know-me checkbox-div">
      <input
        type="checkbox"
        name="author"
        id="author"
        checked={author}
        onChange={handleAuthorInput}
      />
      <label htmlFor="author">
        let us know who you are?
        {author ? (
          <span className="emoji"> &#128578;</span>
        ) : (
          <span className="emoji"> &#128529;</span>
        )}
      </label>
    </div>
  );
}

export default KnowMeCheckbox;
