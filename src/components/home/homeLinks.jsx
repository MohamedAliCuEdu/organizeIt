import React from "react";
import { Link } from "react-router-dom";

function HomeLinks() {
  return (
    <div className="home-links">
      <Link to="/signup" className="md-btn dark-btn">
        sign up
      </Link>
      <Link to="/login" className="md-btn dark-btn">
        log in
      </Link>
    </div>
  );
}

export default HomeLinks;
