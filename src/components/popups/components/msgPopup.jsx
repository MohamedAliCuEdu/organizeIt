import React from "react";
import usePopupContext from "../../../hooks/usePopupContext";
import PopupBanner from "./popupBanner";
import classNames from "classnames";

function MsgPopup({ children, popupName }) {
  const { closePopup } = usePopupContext();

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("popup-overlay")) closePopup();
  };

  return (
    <aside
      className={classNames(popupName, "sm-popup popup-overlay")}
      onClick={handleOverlayClick}
    >
      <div className="popup-container">
        <PopupBanner callBack={closePopup} />
        <article className="content">{children}</article>
      </div>
    </aside>
  );
}

export default MsgPopup;
