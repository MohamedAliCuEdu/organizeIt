import React, { useState } from "react";
import Avatar from "../avatar";
import colors from "../../assets/colors.json";
import useProfileContext from "../../hooks/useProfileContext";
import FormBtns from "../buttons/formBtns";
import SectionPopup from "../popups/components/section.popup";
import classNames from "classnames";

function AvatarEditPopup() {
  const { userData, handleAvatarPopupView, updateAvatarColorApi } =
    useProfileContext();

  // 1. states:
  const [avatarColor, setAvatarColor] = useState(
    userData.avatarColor || colors[0].hex
  );
  // handle avatar color change:
  const handleAvatarColor = (val) => {
    console.log(val);
    setAvatarColor(val);
  };
  // reset avatarColor:
  const handleReset = () => {
    setAvatarColor(colors[0].hex);
  };

  return (
    <SectionPopup
      popupName="avatar-edit-popup"
      callBack={handleAvatarPopupView}
    >
      <form
        method="POST"
        className="avatar-bg-form"
        onSubmit={(e) => updateAvatarColorApi(e, avatarColor)}
      >
        <h3 className="popup-title">select colour:</h3>
        <div className="options">
          {colors.map((color) => {
            let { colorName, hex } = color;
            return (
              <div key={color.id} className="color-option-container">
                <input
                  id={colorName}
                  type="radio"
                  name="avatarColor"
                  value={hex}
                  checked={avatarColor === hex}
                  onChange={() => handleAvatarColor(hex)}
                />
                <label htmlFor={colorName}>
                  <Avatar bg={hex} />
                  <span className="color-name">{colorName}</span>
                </label>
              </div>
            );
          })}
        </div>
        <FormBtns
          submitValue="save"
          disabled={userData?.avatarColor === avatarColor}
          backValue="reset"
          handleBackBtn={handleReset}
        />
      </form>
    </SectionPopup>
  );
}

export default AvatarEditPopup;
