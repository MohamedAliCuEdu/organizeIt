import React, { memo } from "react";

function PageTitle({ children, title }) {
  return (
    <h2 className="page-title">
      {children} {title}
    </h2>
  );
}

export default memo(PageTitle);
