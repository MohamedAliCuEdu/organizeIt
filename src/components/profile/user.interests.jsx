import React from "react";
import { IoMdAdd } from "react-icons/io";

function userInterests() {
  return (
    <section className="user-interests-section">
      <h2>interests:</h2>
      <div className="section-container">
        <form method="POST">
          <input
            type="text"
            name="intersets"
            id="interests"
            min="3"
            max="20"
            placeholder="add new interest..."
            required
          />
          <button type="submit" className="md-btn dark-btn">
            <IoMdAdd />
          </button>
        </form>
        <div className="interests-content">
          span
        </div>
      </div>
    </section>
  );
}

export default userInterests;
