import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { MdLogout } from "react-icons/md";
import Avatar from "../../components/avatar";

import useAuth from "../../hooks/useAuth";
import { axiosPrivateApi } from "../../services/api";
import colors from "../../assets/colors.json";
import usePopupContext from "../../hooks/usePopupContext";
import MESSAGES from "../../constants/messages";

function UserLinks() {
  console.log("--- user");
  const { auth, setAuth } = useAuth();
  const { handleErrMsg, handleConfirmView } = usePopupContext();
  const navigate = useNavigate();

  async function handleUserLogout() {
    try {
      await axiosPrivateApi.get("http://localhost:4000/auth/logout");
      setAuth(null);
    } catch (err) {
      console.log(err);
      handleErrMsg("failed to logout!");
    }
    navigate("/", { replace: true });
  }

  return (
    <div className="user-links">
      <Link to="/profile" title="profile">
        <Avatar bg={auth?.userInfo.avatarColor || colors[0].hex} />
      </Link>
      <button
        className="icon-btn"
        onClick={() =>
          handleConfirmView(MESSAGES.confirm.logout, handleUserLogout)
        }
        title="log out"
      >
        <MdLogout />
      </button>
    </div>
  );
}

export default UserLinks;
