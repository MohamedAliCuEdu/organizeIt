import React from "react";
import PopupBanner from "./popupBanner";

function SectionPopup({ children, popupName, callBack }) {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("popup-overlay")) callBack();
  };
  return (
    <section
      className={`${popupName} section-popup popup-overlay`}
      onClick={handleOverlayClick}
    >
      <div className="popup-container">
        <PopupBanner callBack={callBack} />
        <div className="content">{children}</div>
      </div>
    </section>
  );
}

export default SectionPopup;
