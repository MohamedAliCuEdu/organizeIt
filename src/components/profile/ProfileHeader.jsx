import React from "react";
import Avatar from "../avatar";
import useProfileContext from "../../hooks/useProfileContext";
import useAuth from "../../hooks/useAuth";
import colors from "../../assets/colors.json";
import { PiUserCircleDashedFill } from "react-icons/pi";
import { RiImageEditFill } from "react-icons/ri";

function ProfileHeader() {
  const { auth } = useAuth();
  const { handleAvatarPopupView, handleBannerPopupView, userData } =
    useProfileContext();
  console.log("----profile - header");

  let signUpDate = new Date(userData.createdAt).toLocaleDateString();
  let lastUpdateDate = new Date(userData.updatedAt).toLocaleDateString();

  return (
    <section className="profile-header">
      <div className="header-banner">
        <img
          src={userData?.bannerUrl || "./banners/banner-01.jpg"}
          alt={userData?.bannerUrl || "banner-01"}
        />
        <Avatar bg={auth?.userInfo.avatarColor || colors[0].hex} />
        <div className="header-btns">
          <button className="edit-banner-btn" onClick={handleBannerPopupView}>
            <RiImageEditFill />
          </button>
          <button className="edit-avatar-btn" onClick={handleAvatarPopupView}>
            <PiUserCircleDashedFill />
          </button>
        </div>
      </div>
      <div className="header-info">
        <h3 className="username">Mohamed Ali</h3>
        <div className="user-dates">
          <p>
            signup date: <span>{signUpDate}</span>
          </p>
          <p>
            last updates: <span>{lastUpdateDate}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default React.memo(ProfileHeader);
