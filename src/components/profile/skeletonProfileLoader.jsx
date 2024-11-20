import React from "react";

function SkeletonProfileLoader() {
  return (
    <div className="skeleton-profile-loader">
      <div className="skeleton-header skeleton">
        <div className="banner-skeleton"></div>
        <div className="avatar-skeleton"></div>
      </div>
      <div className="skeleton-quote">
        <div className="qoute-placeholder"></div>
      </div>
      <div className="skeleton-hobbies">
        <span className="hobby-placeholder"></span>
        <span className="hobby-placeholder"></span>
        <span className="hobby-placeholder"></span>
        <span className="hobby-placeholder"></span>
      </div>
      <div className="skeleton-personal-info">
        <div className="info-placeholder"></div>
        <div className="info-placeholder"></div>
        <div className="info-placeholder"></div>
        <div className="info-placeholder"></div>
      </div>
    </div>
  );
}

export default SkeletonProfileLoader;
